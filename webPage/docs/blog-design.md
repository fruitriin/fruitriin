# ブログ設計（/blog）

Riin's Workspace に `/blog` を追加するための設計ドキュメント。
実装着手前の設計合意用。

## 1. 前提と決定事項

ヒアリング結果に基づく確定事項。

| 項目 | 決定 | 補足 |
| --- | --- | --- |
| デプロイ先 | **Vercel 単一**（既存プロジェクト） | GitHub Pages 設定は残骸。実際は Vercel のみでビルド・配信されている |
| レンダリング | **Nuxt ハイブリッド**（`routeRules`） | ポートフォリオ等は prerender（静的）、`/blog/**` のみ ISR |
| CMS / 執筆 | **Obsidian** | Markdown + frontmatter |
| 同期トリガー | **常時起動マシンのファイル監視** | Obsidian Sync は E2E 同期のみでサーバビルドを起動できないため、橋渡しが必須 |
| 記事の置き場所 | **記事専用の別リポジトリ**（推奨） | ホスティングリポジトリ（本リポ）は記事を追跡しない |

### 設計の中心方針

> 履歴管理したいのは「ブログをホストするコード」であって、記事の版管理はデプロイの都合にすぎない。

この意図を満たすため、**ホスティングコードと記事コンテンツを別リポジトリに分離**する。
本リポジトリは記事の git 履歴を一切持たず、記事リポジトリの「履歴」は単に「最新スナップショットをデプロイに届けるための配管」として扱う。

## 2. 全体アーキテクチャ

```
┌─────────────┐   Obsidian Sync (E2E)   ┌──────────────────────┐
│  Obsidian    │ ──────────────────────▶ │  常時起動マシン         │
│  (執筆端末)   │                          │  vault を受信           │
└─────────────┘                          │  ↓ ファイル監視(watch)  │
                                          │  ↓ 変更検知で           │
                                          │  git commit & push     │
                                          └──────────┬───────────┘
                                                     │ push
                                                     ▼
                                        ┌────────────────────────┐
                                        │  記事リポジトリ           │
                                        │  (fruitriin/blog-content)│
                                        │  *.md + frontmatter      │
                                        └──────────┬─────────────┘
                                                   │ webhook / Deploy Hook
                                                   ▼
┌──────────────────┐  build時にcontentを取得  ┌────────────────────────┐
│ ホスティングリポ   │ ◀──────────────────────│  Vercel ビルド           │
│ fruitriin/fruitriin│                         │  Nuxt Content がindex化  │
│ webPage/ (Nuxtアプリ)│ ───────────────────▶ │  → ISRページ配信         │
└──────────────────┘                         └────────────────────────┘
```

### 同期 → デプロイの流れ（「sync されるたびにビルド」の実体）

1. Obsidian で記事を書く → Obsidian Sync で常時起動マシンへ届く
2. 常時起動マシン上の watcher（後述）が変更を検知
3. 記事リポジトリへ `git commit && git push`
4. 記事リポジトリへの push が **Vercel Deploy Hook** を叩く（GitHub 連携 or webhook）
5. Vercel がホスティングリポをビルド。ビルド時に記事リポの最新を取り込み、Nuxt Content がインデックス化
6. `/blog/**` は ISR で配信（後述のキャッシュ戦略）

ポイント: ユーザーが言う「ISR でビルド」は、厳密には
**「記事 push → Deploy Hook → フルリビルド」＋「配信は ISR でキャッシュ」** の二段構え。
Nuxt Content は記事をビルド時に DB（SQLite ダンプ）へインデックスするため、
新規記事の反映には再ビルドが必要で、それを Deploy Hook が担う。

## 3. 技術スタック

- **Nuxt 4**（既存）+ **@nuxt/content v3** — Markdown/frontmatter を扱う公式モジュール
  - frontmatter クエリ、MDC、タグ・日付での絞り込みが標準で可能
  - ビルド時に記事を SQLite ダンプへインデックス → サーバレス（Vercel）でも ISR 時にクエリ可能
- **Vercel preset**（Nitro が自動検出） — `routeRules` の `isr` がそのまま Vercel ISR にマップされる

### 記事コンテンツの取り込み方法（別リポ → ビルド）

2案。**A を推奨**。

- **A. Nuxt Content の repository ソース（推奨・配管が薄い）**
  `content.config.ts` のコレクションで `source.repository` に記事リポ URL を指定。
  ビルド時に Nuxt Content が記事リポを取得してインデックス。
  ホスティングリポには「リポ URL の設定」しか残らず、記事履歴・submodule ポインタを一切持たない。
  → 「ホスティングだけ履歴管理」の意図に最も忠実。

- **B. prebuild スクリプトで shallow clone（堅実なフォールバック）**
  `package.json` の `prebuild` で記事リポを `git clone --depth 1` し、
  `webPage/content/`（gitignore 対象）へ展開してから `nuxt generate`/build。
  A が環境都合で使えない場合の確実な代替。

どちらでも本リポジトリは記事を追跡しない（B では `content/` を `.gitignore`）。

## 4. ルーティング設計

| パス | 内容 | レンダリング |
| --- | --- | --- |
| `/blog` | 記事一覧（日付降順 / ページネーション） | ISR |
| `/blog/[...slug]` | 記事個別ページ | ISR |
| `/blog/tags` | タグ一覧 | ISR |
| `/blog/tags/[tag]` | タグ別記事一覧 | ISR |
| `/blog/archive/[year]` | 年別アーカイブ（任意） | ISR |
| `/blog/rss.xml` | RSS フィード（server route） | ISR |

`nuxt.config.ts` の `routeRules`（既存ページは静的のまま）:

```ts
routeRules: {
  '/':            { prerender: true },
  '/manual':      { prerender: true },
  '/luluReminder/**': { prerender: true },
  '/missRirica/**':   { prerender: true },
  '/blog':        { isr: true },
  '/blog/**':     { isr: true },
}
```

ISR の更新は基本的に Deploy Hook によるフルリビルドで賄うため、
`isr: true`（再検証なしのオンデマンド生成 + デプロイ単位で無効化）で十分。
時間ベースの自動再検証が欲しければ `isr: 3600` のように秒数指定も可能。

## 5. 記事フォーマット（Obsidian frontmatter 規約）

```markdown
---
title: 記事タイトル
date: 2026-06-20        # 日付ベース管理の基準。一覧の並び順・アーカイブに使用
tags: [vue, nuxt]       # タグベース管理
draft: false            # true の記事はビルドで除外
description: 一覧やOGPに使う要約（任意）
---

本文（Markdown）
```

### 管理軸

- **日付**: `date` frontmatter。一覧の降順ソート、`/blog/archive/[year]` の集計キー
- **タグ**: `tags` frontmatter。`/blog/tags`・`/blog/tags/[tag]` の集計キー
- **slug**: ファイル名（またはパス）から自動生成。`/blog/<slug>`

### Obsidian 固有記法への対応（要検討事項）

- `[[内部リンク]]` / 添付画像 / callout などは素の Markdown と差異がある
- 方針: **執筆を素の Markdown 寄りに統一**するのが最も低コスト。
  どうしても Obsidian 記法を使う場合は remark/MDC プラグインで変換層を足す
- 画像は記事リポ内の相対パスに置き、ビルド時に public へ展開 or Nuxt Content のアセット解決を利用

## 6. ディレクトリ構成（追加分）

```
webPage/
├── content.config.ts          # Nuxt Content コレクション定義（blog, source=記事リポ）
├── nuxt.config.ts             # @nuxt/content 追加, routeRules 追加
├── src/
│   ├── pages/
│   │   └── blog/
│   │       ├── index.vue       # 一覧
│   │       ├── [...slug].vue    # 記事個別
│   │       ├── tags/
│   │       │   ├── index.vue    # タグ一覧
│   │       │   └── [tag].vue    # タグ別
│   │       └── archive/
│   │           └── [year].vue   # 年別（任意）
│   ├── components/
│   │   └── blog/
│   │       ├── ArticleCard.vue  # 一覧カード
│   │       ├── ArticleMeta.vue  # 日付・タグ表示
│   │       └── TagBadge.vue
│   └── server/
│       └── routes/
│           └── blog/
│               └── rss.xml.ts   # RSS 生成
└── docs/
    └── blog-design.md          # 本ドキュメント
```

コンポーネントは既存方針（A Philosophy of Software Design / deep module・information hiding）に従い、
ドメインデータ（Nuxt Content のクエリ結果）をそのまま prop し、表示ロジックは内部で完結させる。

## 7. 常時起動マシンの watcher（参考実装方針）

ホスティングリポの責務外（運用側）だが、設計上の前提として記載。

- vault 内のブログ用フォルダ（例 `vault/blog/`）を `chokidar` 等で監視
- debounce（例: 最終変更から 30〜60 秒）して連続編集をまとめる
- 変更検知 → 記事リポへ `git add -A && git commit -m "sync: <timestamp>" && git push`
- push をトリガーに Vercel が再ビルド（GitHub 連携 or Deploy Hook を直接 curl）

> 補足: Obsidian Sync 自体はサーバビルドを起動できないため、この watcher が
> 「Obsidian の世界」と「Vercel の世界」をつなぐ唯一の接点になる。

## 8. GitHub Pages 残骸の後始末（任意）

- 実配信は Vercel のみ。GitHub Pages の Pages 設定が残っていれば無効化を検討
- `src/public/CNAME` / `src/public/404.html` は GitHub Pages 用。Vercel ではドメイン設定は
  ダッシュボード側で行うため、CNAME ファイルは不要（残っていても無害）。整理は任意

## 9. 実装ステップ（着手時の順序）

1. `@nuxt/content` 導入、`content.config.ts` で blog コレクション定義（記事リポ source）
2. `nuxt.config.ts` に `@nuxt/content` モジュールと `routeRules` 追加
3. `/blog` 一覧・記事個別ページ実装（日付降順、frontmatter 表示）
4. タグ一覧・タグ別ページ実装
5. RSS server route
6. 記事リポジトリ作成 + 常時起動マシンの watcher セットアップ + Vercel Deploy Hook 連携
7. （任意）年別アーカイブ、GitHub Pages 残骸整理

## 10. 採用する Nuxt 機能（合意済み）

Nuxt Content v3 の機能から、本ブログで採用するものを確定。

| 機能 | 採用 | メモ |
| --- | --- | --- |
| `queryCollection`（Markdown 対象） | ○ | `type: 'page'` の Markdown を型付きでクエリ。一覧/個別/タグ全てこれで賄う |
| 目次（TOC） | ○ | `post.body.toc` から自動生成。記事内ナビに使う |
| 読了時間 | ✕ | 不要 |
| MDC（Markdown 内 Vue コンポーネント / prose 差し替え） | ○ | callout 等の埋め込み、`ProseImg`/`ProseA`/`ProsePre` をサイトテーマに合わせ差し替え |
| Shiki シンタックスハイライト | ○ | ビルド時ハイライト。コードコピーは `ProsePre` 差し替えで追加 |
| 全文検索 | ○（**Vercel Function 方式**） | `server/api/search` で `queryCollectionSearchSections` + MiniSearch。Nitro キャッシュで初回のみ構築。クライアント完結案は不採用 |
| SEO 一式（og-image / sitemap / schema-org） | ○ | OGP 画像自動生成・sitemap・BlogPosting 構造化データ |
| 画像最適化（`@nuxt/image`） | ○ | `<NuxtImg>` + 記事内画像も `ProseImg` 経由で最適化 |
| Obsidian 記法の変換層 | ○ | remark プラグインで wikilink / callout を MDC へ変換 |
| ISR / routeRules の詳細詰め | 後日 | §4 の方針ベースで後日確定 |

### 全文検索の実装方針（Vercel Function）

```ts
// src/server/api/search.get.ts  → /api/search?q=...
import MiniSearch from 'minisearch'

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event)
  if (!q) return []
  const sections = await queryCollectionSearchSections(event, 'blog') // 見出し単位の全文
  const mini = new MiniSearch({ fields: ['title', 'content'], storeFields: ['title', 'id'] })
  mini.addAll(sections)
  return mini.search(String(q), { prefix: true, fuzzy: 0.2 }).slice(0, 20)
})
```

- インデックス構築コストは `defineCachedEventHandler` / `cachedFunction` で初回のみに抑える
- ヒット箇所は見出しアンカー（`#section`）付き URL でリンク可能

## 11. 未決定 / 確認したい点

- 記事取り込みは **A（Nuxt Content repository ソース）** で進めてよいか（フォールバック B あり）
- 記事リポジトリ名（例: `fruitriin/blog-content`）と公開/非公開
- 記事 URL を slug ベース（`/blog/my-post`）にするか日付込み（`/blog/2026/06/my-post`）にするか
- ページネーション要否（記事数の見込み）
- SEO 系で追加する依存（`nuxt-og-image` / `@nuxtjs/sitemap` / `nuxt-schema-org`）の導入可否
