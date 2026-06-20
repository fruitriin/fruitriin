# ブログ設計（/blog）

Riin's Workspace に `/blog` を追加するための設計ドキュメント。
実装着手前の設計合意用。

## 1. 前提と決定事項

ヒアリング結果に基づく確定事項。

| 項目 | 決定 | 補足 |
| --- | --- | --- |
| デプロイ先 | **Vercel 単一**（既存プロジェクト） | GitHub Pages 設定は残骸。実際は Vercel のみでビルド・配信されている |
| レンダリング | **Nuxt ハイブリッド**（`routeRules`） | ポートフォリオ等は prerender（静的）、`/blog/**` のみ ISR |
| CMS / 執筆 | **Obsidian** | Markdown + frontmatter。日記主体・約 700 記事規模 |
| 記事の置き場所 | **`webPage/content/` を vault 実体にして gitignore**（主軸） | Obsidian Sync がフォルダへ直落ち。本リポは記事を追跡しない。別リポ案はフォールバック（§3） |
| ビルド/デプロイ | **ローカルマシンで build → `vercel deploy --prebuilt`** | content が gitignore のため Vercel 側 git ビルドからは見えない。必然的にローカルビルド |
| 同期トリガー | **常時起動マシンで Sync 検知 → ローカル build+deploy**（webPush 等で別途構築） | Obsidian Sync は E2E 同期のみでサーバビルドを起動できないため橋渡しが必須 |
| 記事 URL | **タイムスタンプ slug**（デイリーノートのファイル名由来） | UUID より人間/SEO に有意。日付ベース管理と一致 |

### 設計の中心方針

> 履歴管理したいのは「ブログをホストするコード」であって、記事の版管理はデプロイの都合にすぎない。

この意図を満たすため、**記事コンテンツを git 追跡対象から外す**。
`webPage/content/` を Obsidian vault の実体（gitignore）とし、本リポジトリは記事の git 履歴を一切持たない。
ホスティングコードのみを版管理する。

## 2. 全体アーキテクチャ（主軸: in-repo gitignore + ローカル prebuilt デプロイ）

```
┌─────────────┐   Obsidian Sync (E2E)   ┌──────────────────────────────┐
│  Obsidian    │ ──────────────────────▶ │  常時起動マシン                 │
│  (執筆端末)   │                          │  webPage/content/ に直落ち      │
└─────────────┘                          │  (= vault 実体 / gitignore)    │
                                          │  ↓ Sync 検知（watch/webPush）   │
                                          │  ↓ vercel build                 │
                                          │  ↓ (Nuxt Content が SQLite化)   │
                                          │  ↓ vercel deploy --prebuilt     │
                                          └──────────────┬───────────────┘
                                                         │ prebuilt output (.vercel/output)
                                                         ▼
                                            ┌────────────────────────┐
                                            │  Vercel                  │
                                            │  ISR/Function 配信        │
                                            │  (content DB は出力に同梱)│
                                            └────────────────────────┘

ホスティングコード (fruitriin/fruitriin の webPage/) は git で版管理。
記事 (webPage/content/) は gitignore で非追跡。
```

### 同期 → デプロイの流れ（「sync されるたびにビルド」の実体）

1. Obsidian で記事を書く → Obsidian Sync で常時起動マシンの `webPage/content/` へ直接届く
2. Sync 検知（ファイル監視 or 自前 webPush システム）で発火、debounce してまとめる
3. ローカルで `vercel build` を実行。Nuxt Content が記事を SQLite ダンプへインデックスし、
   ISR/Function 込みの `.vercel/output/` を生成
4. `vercel deploy --prebuilt` で生成済み出力を Vercel へアップロード
5. `/blog/**` は ISR で配信（content DB は出力に同梱されるため runtime クエリ可能）

ポイント: 「ISR でビルド」は厳密には
**「記事 sync → ローカル prebuilt デプロイ（フルリビルド）」＋「配信は ISR でキャッシュ」** の二段構え。
Nuxt Content は記事をビルド時に DB 化するため新規記事の反映には再ビルドが要り、それをローカル build が担う。
ISR が維持されるのは `vercel build` が ISR 設定込みの output を吐くため。

## 3. 技術スタック / 記事取り込み

- **Nuxt 4**（既存）+ **@nuxt/content v3** — Markdown/frontmatter を扱う公式モジュール
  - frontmatter クエリ、MDC、タグ・日付での絞り込みが標準で可能
  - ビルド時に記事を SQLite ダンプへインデックス → ISR/Function の runtime でもクエリ可能
- **Vercel preset**（Nitro が自動検出） — `routeRules` の `isr` がそのまま Vercel ISR にマップされる

### 記事コンテンツの取り込み方法

- **主軸: in-repo gitignore + ローカル prebuilt デプロイ**
  `content.config.ts` の source は `webPage/content/` 配下のローカル glob（`source: '**/*.md'`）。
  Obsidian Sync がこのフォルダに直接書き込む。`webPage/.gitignore` に `content/` を追加。
  ビルドはローカル（`vercel build && vercel deploy --prebuilt`）。
  - 利点: 運用が1台に閉じて単純。別リポ・submodule 不要。Obsidian 導線が最短
  - 注意: 記事のバックアップは Obsidian Sync + ローカルのみ（日記なら許容）。
    Vercel 側 git ビルドは使えない（content が無いため）

- **フォールバック: 記事専用の別リポジトリ**
  `content.config.ts` で `source.repository` に記事リポ URL を指定し Vercel 側ビルドで取り込む。
  または prebuild で `git clone --depth 1`。Vercel 側ビルドを使いたくなった場合の代替。

いずれも本リポジトリは記事を追跡しない。

## 4. ルーティング設計

記事 URL は **タイムスタンプ slug の固定 permalink**。Obsidian デイリーノートのファイル名
（`2026-06-20.md`）がそのまま slug になり、毎回 URL を考える必要がない。1日複数記事なら
時刻/連番を付与（`2026-06-20-1530`）。並び順・アーカイブ集計は frontmatter の `date`。

**カテゴリは記事 URL に含めない**（推奨案 A）。記事 permalink はタイムスタンプ固定とし、
カテゴリは一覧の絞り込み軸として別パスに置く。後でカテゴリを付け替えても記事 URL が切れない。
（含める案 B = `/blog/技術/2026-06-20` はカテゴリ変更で URL が変わるため不採用。要最終確認）

| パス | 内容 | レンダリング |
| --- | --- | --- |
| `/blog` | 全カテゴリ最新（7件/ページ、日付降順） | ISR |
| `/blog/page/[n]` | 全体 n ページ目 | ISR |
| `/blog/[...slug]` | 記事個別（slug = タイムスタンプ permalink） | ISR |
| `/blog/categories` | カテゴリ一覧 | ISR |
| `/blog/categories/[category]` | カテゴリ別 1 ページ目（7件） | ISR |
| `/blog/categories/[category]/page/[n]` | カテゴリ別 n ページ目 | ISR |
| `/blog/tags` | タグ一覧 | ISR |
| `/blog/tags/[tag]` | タグ別記事一覧（同様にページネーション可） | ISR |
| `/blog/rss.xml` | RSS フィード（server route） | ISR |

### ページネーション

- **7件/ページ**（`PAGE_SIZE` として config 定数化）。`queryCollection` の
  `.skip()/.limit()/.count()` でサーバ側ページング（約 700 記事を一度に出さない）
- **記事の分割配信はしない**（1記事は常に全文1ページ。マルチページ記事なし）
- パス形式のページング（`/page/[n]`）を採用（クエリ文字列より ISR/SEO 的に有利）

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

ISR の更新は基本的にローカル prebuilt デプロイ（フルリビルド）で賄うため、
`isr: true`（再検証なしのオンデマンド生成 + デプロイ単位で無効化）で十分。
時間ベースの自動再検証が欲しければ `isr: 3600` のように秒数指定も可能。
※ ISR/routeRules の詳細な詰めは後日（§10 参照）。

## 5. 記事フォーマット（Obsidian frontmatter 規約）

```markdown
---
title: 記事タイトル
date: 2026-06-20        # 日付ベース管理の基準。一覧の並び順・アーカイブに使用
category: 技術          # 単一・排他。省略時は "日記" にフォールバック
tags: [vue, nuxt]       # 複数・横断
draft: false            # true の記事はビルドで除外
description: 一覧やOGPに使う要約（任意）
---

本文（Markdown）
```

### 管理軸

- **日付**: `date` frontmatter。一覧の降順ソート、年別集計のキー
- **カテゴリ**: `category` frontmatter（単一）。`/blog/categories/[category]` の集計キー。
  未指定はデフォルト「日記」。`tags[0]` 流用は暗黙ルール依存で事故りやすいため不採用
- **タグ**: `tags` frontmatter（複数）。`/blog/tags`・`/blog/tags/[tag]` の集計キー
- **slug**: デイリーノートのファイル名（タイムスタンプ）から自動生成。`/blog/<timestamp>` 固定

### Obsidian 固有記法への対応（要検討事項）

- `[[内部リンク]]` / 添付画像 / callout などは素の Markdown と差異がある
- 方針: **執筆を素の Markdown 寄りに統一**するのが最も低コスト。
  どうしても Obsidian 記法を使う場合は remark/MDC プラグインで変換層を足す
- 画像は記事リポ内の相対パスに置き、ビルド時に public へ展開 or Nuxt Content のアセット解決を利用

## 6. ディレクトリ構成（追加分）

```
webPage/
├── content.config.ts          # Nuxt Content コレクション定義（blog, source=content/ ローカル）
├── content/                   # Obsidian vault 実体（gitignore）
├── nuxt.config.ts             # @nuxt/content / nuxt-og-image 追加, routeRules 追加
├── src/
│   ├── pages/
│   │   └── blog/
│   │       ├── index.vue            # 全体一覧 1ページ目
│   │       ├── page/[n].vue         # 全体 n ページ目
│   │       ├── [...slug].vue        # 記事個別（タイムスタンプ permalink）
│   │       ├── categories/
│   │       │   ├── index.vue        # カテゴリ一覧
│   │       │   ├── [category]/index.vue   # カテゴリ別 1ページ目
│   │       │   └── [category]/page/[n].vue# カテゴリ別 n ページ目
│   │       └── tags/
│   │           ├── index.vue        # タグ一覧
│   │           └── [tag].vue        # タグ別
│   ├── components/
│   │   └── blog/
│   │       ├── ArticleCard.vue      # 一覧カード
│   │       ├── ArticleMeta.vue      # 日付・カテゴリ・タグ表示
│   │       ├── Paginator.vue        # ページネーション UI
│   │       └── CategoryBadge.vue
│   ├── server/
│   │   ├── api/
│   │   │   └── search.get.ts        # 全文検索（MiniSearch）
│   │   └── routes/
│   │       └── blog/rss.xml.ts      # RSS 生成
│   └── utils/
│       └── blog.ts                  # PAGE_SIZE=7 等の定数
└── docs/
    └── blog-design.md          # 本ドキュメント
```

コンポーネントは既存方針（A Philosophy of Software Design / deep module・information hiding）に従い、
ドメインデータ（Nuxt Content のクエリ結果）をそのまま prop し、表示ロジックは内部で完結させる。

## 7. 常時起動マシンの同期トリガー（参考実装方針）

ホスティングリポの責務外（運用側）だが、設計上の前提として記載。
主軸（in-repo gitignore + ローカル prebuilt デプロイ）での役割。

- Obsidian Sync が落とす `webPage/content/` をファイル監視（`chokidar` 等）。
  自前 webPush システムで通知駆動にしてもよい
- debounce（例: 最終変更から 30〜60 秒）して連続編集をまとめる
- 変更検知 → ローカルで `vercel build && vercel deploy --prebuilt` を実行
- ※ フォールバック（別リポ案）の場合はここが「記事リポへ commit/push → Deploy Hook」になる

> 補足: Obsidian Sync 自体はサーバビルドを起動できないため、この常時起動マシンが
> 「Obsidian の世界」と「Vercel の世界」をつなぐ唯一の接点になる。

## 8. GitHub Pages 残骸の後始末（任意）

- 実配信は Vercel のみ。GitHub Pages の Pages 設定が残っていれば無効化を検討
- `src/public/CNAME` / `src/public/404.html` は GitHub Pages 用。Vercel ではドメイン設定は
  ダッシュボード側で行うため、CNAME ファイルは不要（残っていても無害）。整理は任意

## 9. 実装ステップ（着手時の順序）

1. `@nuxt/content` 導入、`content.config.ts` で blog コレクション定義（`webPage/content/` ローカル source）
   ＋ `webPage/.gitignore` に `content/` 追加
2. `nuxt.config.ts` に `@nuxt/content` モジュールと `routeRules` 追加
3. `/blog` 一覧・記事個別ページ実装（タイムスタンプ slug / 日付降順、frontmatter 表示）
4. タグ一覧・タグ別ページ実装
5. 全文検索 server route（`server/api/search`）／ RSS server route
6. 常時起動マシンのトリガー（Sync 検知 → `vercel build && vercel deploy --prebuilt`）セットアップ
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
| OGP（`nuxt-og-image` + `useSeoMeta`） | ○ | 記事ごとに OGP 画像自動生成（タイトル＋カテゴリ＋日付）。SEO はガチらない方針 |
| sitemap / schema-org | ✕（見送り） | 後でいつでも追加可。当面は OGP のみ |
| カテゴリ別ページネーション（7件/ページ） | ○ | `queryCollection` の `.skip()/.limit()/.count()`。記事の分割配信はしない |
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

## 11. 未決定 / 次回検討

- **カテゴリを記事 URL に含めるか**: 推奨は含めない案 A（permalink 不変）。最終確認したい
- ISR / routeRules の詳細詰め（再検証 TTL の要否、オンデマンド revalidate を併用するか）→ 後日
- タイムスタンプ slug の粒度（日付のみ `2026-06-20` / 時刻付き `2026-06-20-1530` / 階層 `2026/06/20`）
- 1日複数記事の扱い（連番 or 時刻付与）
- タグ別一覧もページネーションするか（カテゴリ別は確定で 7件/ページ）
- Obsidian 固有記法（wikilink/callout）を変換層で吸収するか / 素 md に寄せるか

### 確定済み（このセッション）

- 記事の置き場所: `webPage/content/` を vault 実体にして gitignore（主軸）。別リポはフォールバック
- ビルド/デプロイ: ローカルで `vercel build && vercel deploy --prebuilt`
- バックアップ: Obsidian Sync + ローカルのみで許容
- 記事 URL: タイムスタンプ slug の固定 permalink（カテゴリは URL に含めない＝推奨案 A）
- カテゴリ: `category` frontmatter（単一、未指定は「日記」）。tags は複数・横断で別軸
- ページネーション: 一覧系は 7件/ページ（`/page/[n]`）。記事の分割配信はしない
- SEO: OGP のみ（`nuxt-og-image` + `useSeoMeta`）。sitemap/schema-org は見送り
- 全文検索: Vercel Function 方式（クライアント完結は約 700 記事には不向きで不採用）
