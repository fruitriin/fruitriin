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
| 記事 URL | **`/blog/log/[slug]`**。slug は `slug` frontmatter、無ければタイトル由来 | 日々のログを `/log/` 名前空間に。catch-all とタグ等の named route 衝突も回避 |

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

記事 URL は **`/blog/log/[slug]`**。日々のログを `/log/` 名前空間に集約する。

**slug の決定ルール**:
1. frontmatter に `slug` があればそれを使う（上書き可）
2. 無ければ **タイトルを slugify**（小文字化・空白を `-`）。普段タイトルを
   `ActivityLog 0620` のように付けているので、考えずに一意な slug が決まる
- 日本語タイトルはそのまま使うと percent-encode される（動くが見栄えが落ちる）。
  ログ系は英数字タイトル推奨、必要時は `slug` で明示
- 衝突時は `-2` などのサフィックスを付与。公開後はタイトル変更で URL が変わらないよう、
  運用上「公開後はタイトルを変えない or `slug` を明示」

`/blog/log/[slug]`（単一セグメント）にすることで、`/blog/tags` などの named route と
catch-all の衝突も避けられる（技術的にもクリーン）。

**主軸は「日付」、補助に「タグ」**。日記主体（エッセイ→note・技術→Qiita に振り分け）の
ブログのため、category 軸は廃止し **tags + 日付に一本化**（経緯は §11）。並び順・
アーカイブ集計は frontmatter の `date`。

| パス | 内容 | レンダリング |
| --- | --- | --- |
| `/blog` | 最新記事（7件/ページ、日付降順） | ISR |
| `/blog/page/[n]` | 全体 n ページ目 | ISR |
| `/blog/log/[slug]` | 記事個別（slug = タイトル由来 or frontmatter 指定） | ISR |
| `/blog/archive` | 年/月アーカイブ index（投稿数つき） | ISR |
| `/blog/archive/[year]` | 年別一覧（ページネーション） | ISR |
| `/blog/tags` | タグ一覧（投稿数つき） | ISR |
| `/blog/tags/[tag]` | タグ別一覧（ページネーション） | ISR |
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
title: ActivityLog 0620   # slug 未指定ならこのタイトルを slugify して URL に
date: 2026-06-20          # 主軸。一覧の降順ソート・年/月アーカイブの集計キー
slug: my-custom-url       # 任意。指定すると URL を上書き（/blog/log/my-custom-url）
tags: [日記, 週次振り返り]   # 横断・複数。旧 Blogger ラベル相当（series もタグで表現）
draft: false              # true の記事はビルドで除外
description: 一覧やOGPに使う要約（任意）
canonical: https://...    # 任意。Qiita/note へ転載した記事の正規 URL
---

本文（Markdown）
```

### 管理軸（category 廃止・tags + 日付に一本化）

- **日付**: `date` frontmatter。**主軸**。一覧の降順ソート、年/月アーカイブの集計キー
- **タグ**: `tags` frontmatter（複数）。`/blog/tags`・`/blog/tags/[tag]` の集計キー。
  旧 Blogger のラベル（日記 / 週次振り返り / KPT / 読書感想 …）をそのまま移行できる
- **slug**: `slug` frontmatter があればそれ、無ければ **タイトルを slugify**。
  `/blog/log/<slug>`。普段 `ActivityLog 月日` 形式で書くので考えずに一意化される（§4）
- ~~カテゴリ~~: 廃止。URL 分割が不要になり、絞り込みは tags で十分なため（§11 参照）

### Obsidian 固有記法への対応（方針: 基本 remark）

- **基本は remark プラグインで変換層を組む**（執筆は Obsidian の自然な記法のままでよい）
- `content.markdown.remarkPlugins` に追加して対応:
  - `[[wikilink]]` → 内部リンク（`remark-wiki-link` 等）
  - callout `> [!note]` → MDC の `::callout` に変換
  - 添付画像 `![[...]]` / 相対パス画像の解決
- 画像は vault（`webPage/content/`）内の相対パスに置き、ビルド時に解決（`@nuxt/image` 連携）

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
│   │       ├── log/[slug].vue       # 記事個別（/blog/log/[slug]）
│   │       ├── archive/
│   │       │   ├── index.vue        # 年/月アーカイブ index
│   │       │   └── [year].vue       # 年別一覧
│   │       ├── tags/
│   │       │   ├── index.vue        # タグ一覧
│   │       │   └── [tag].vue        # タグ別
│   │       ├── now.vue              # 近況ページ（IndieWeb）
│   │       └── uses.vue             # 使ってる道具ページ（IndieWeb）
│   ├── components/
│   │   └── blog/
│   │       ├── ArticleCard.vue      # 一覧カード
│   │       ├── ArticleMeta.vue      # 日付・タグ表示
│   │       ├── Paginator.vue        # ページネーション UI
│   │       ├── TagBadge.vue
│   │       ├── ViewCounter.vue      # 閲覧カウンター（Upstash Redis連携）
│   │       ├── Comments.vue         # 自作コメント（honeypot＋Turnstile）
│   │       ├── RelatedPosts.vue     # 関連記事（同 tags）
│   │       ├── PostNav.vue          # 前後ナビ
│   │       └── OnThisDay.vue        # N年前の今日
│   ├── server/
│   │   ├── api/
│   │   │   ├── search.get.ts        # 全文検索（MiniSearch）
│   │   │   ├── views/[slug].ts      # 閲覧数 取得/加算（Upstash Redis）
│   │   │   └── c/[slug].ts          # コメント取得/投稿（自作・スパム対策）
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
3. `/blog` 一覧・記事個別（`/blog/log/[slug]`）実装（slug 解決 / 日付降順、frontmatter 表示）
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
| 一覧/タグ/年別アーカイブのページネーション（7件/ページ） | ○ | `queryCollection` の `.skip()/.limit()/.count()`。記事の分割配信はしない |
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

### 拡張機能（ブログ小ネタ・採用分）

| 小ネタ | 概要 | 追加で必要なもの |
| --- | --- | --- |
| 閲覧カウンター | 記事ごとの閲覧数。runtime に Function が Redis を加算 | **Upstash Redis**（Vercel Marketplace 経由・無料枠で十分） |
| コメント（自作） | Upstash + Functions で自作。非ログイン・多層スパム対策 | Upstash Redis（閲覧数と共用）＋ Cloudflare Turnstile |
| N年前の今日（On This Day） | 同じ月日の過去記事を表示。日付主軸の日記と好相性 | なし（`date` で集計） |
| 関連記事 | 同 tags の記事を末尾に提示 | なし（`queryCollection` の tags 一致） |
| 前後ナビ | 前/次の記事リンク | なし（`queryCollectionItemSurroundings`） |
| リンクカード | 本文中の外部 URL を OGP 付きカードに展開 | remark プラグイン |
| canonical | 転載時の正規 URL 指定（note/Qiita 振り分け方針の重複対策） | frontmatter に `canonical` フィールド追加 |
| /now・/uses | IndieWeb 定番の近況/道具ページ。人物像を立てる静的ページ | なし（静的ページ） |
| view transition | 一覧⇄記事の控えめなトランジション | なし（下記の演出方針） |

**閲覧カウンターの実装方針**
- ストレージは **Upstash Redis**。Vercel KV（自前）は 2024-12 に廃止され Upstash へ統合済み。
  新規は **Vercel Marketplace から Upstash Redis** を入れる
- **無料枠（256MB / 月数十万コマンド規模・クレカ不要）で十分**。個人日記ブログの
  閲覧カウント程度で超過することはまず無い ＝ 実質無料
- `server/api/views/[slug].(get|post).ts` で取得/加算。ローカル prebuilt デプロイでも
  加算は runtime の Function が Redis を叩くため問題なく動作。人気記事ランキングにも転用可

**コメント（自作・採用確定）**

第三者サービス（giscus は GitHub ログイン必須、Cusdis はメンテ停滞リスク）を避け、
**閲覧カウンターと同じ Upstash Redis + Vercel Functions で自作**する。非ログインで投稿でき、
スパムは多層フィルタで自動排除（手動モデレーションをほぼ不要にする）。

honeypot / エンドポイントリネームは「フォームとエンドポイントを自分で握る」自作だからこそ効く。

#### データモデル（Upstash Redis）

| キー | 型 | 用途 |
| --- | --- | --- |
| `comments:<slug>` | sorted set（score=createdAt） | 公開コメント。新着順/古い順で取得 |
| `comment:<id>` | hash | 各コメント本体 `{id, slug, name, body, createdAt, status}` |
| `rl:comment:<ip>` | string + TTL | レート制限カウンタ |

スレッド（返信）まではやらないフラット構成（日記には十分）。必要になれば `parentId` を追加。

#### エンドポイント

```
POST /api/c/[slug]     # 投稿（エンドポイント名は定番を避けてリネーム）
GET  /api/c/[slug]     # 公開コメント取得（status=approved のみ）
DELETE /api/c/[slug]/[id]   # 管理用削除（要シークレット。env のトークン照合）
```

#### 投稿時のスパム対策チェーン（POST 内で順に評価、1つでも該当→破棄）

1. **honeypot**: 不可視ダミー入力が埋まっていたら破棄（素朴なボット除去）
2. **time-trap**: フォーム描画〜送信が速すぎ（例 < 2 秒）なら破棄
3. **Cloudflare Turnstile**: クライアントのトークンをサーバで検証（reCAPTCHA より
   無料・プライバシー配慮・ほぼ不可視のため採用）
4. **レート制限**: Upstash の `@upstash/ratelimit` で IP/セッション単位（例 1分3件）。超過は 429
5. **内容ヒューリスティック（任意）**: リンク数上限・NG ワード・同一文連投検知
6. **サニタイズ**: 本文はプレーンテキスト表示（or Markdown 限定＋サニタイザ）で **XSS 対策必須**

→ 1〜4 を通過したものは **即時公開（status=approved）** をデフォルトにできる。
   不安なら `status=pending` で承認制に切替可（フラグ1つ）。

#### 通知（任意）
新着コメント時に自分宛てメール or webhook を1本飛ばす（Function 内から）。

#### コンポーネント
`Comments.vue`：名前＋本文＋**不可視 honeypot 入力**＋**Turnstile ウィジェット**。
記事個別ページでのみマウント。取得は `GET /api/c/[slug]`、投稿は `POST`。

#### 保存先の選択
- 主軸: **Upstash Redis**（閲覧カウンターと共用・日記には十分）
- スレッド/全文検索/集計を将来重視するなら Postgres(Neon) へ移行可

**canonical**
- frontmatter に `canonical?: string` を追加。指定があれば記事 head の
  `<link rel="canonical">` をそのURLに向ける（Qiita/note へ転載した記事の重複回避）

**view transition の演出方針（クドくしない）**
- 一覧⇄記事はクロスフェード 150–200ms 程度の最小限
- 共有要素トランジションは「一覧サムネ → 記事ヘッダ画像」の 1 箇所だけに絞る
- `prefers-reduced-motion` を尊重し、低減設定時は無効化

> ※「リンクバー」= **リンクカード**で確定。**読書進捗バー**（スクロール位置バー）は
> 試験採用 — 実装してみて演出が良ければ正式採用、クドければ不採用。

## 11. 旧ブログ（Blogger）と移行方針

- 旧ブログは **Blogger**（`old-blog.riinswork.space`）。ラベルクラウド実物:
  日記(215) / 週次振り返り(21) / KPT(19) / 読書感想(17) / Vue(14) / Qiita(12) / 登壇系 / 技術系 / 1件もの多数
- **Blogger の制約 = フラットなラベルのみ**（階層カテゴリ・カテゴリ別 URL を持てない）。
  そのため日記もVueもKPTも同じラベル平面に混在していた
- 今後の振り分け: **エッセイ/読書感想 → note、技術記事 → Qiita**。
  → セルフホストのブログは **ほぼ「日記＋定期振り返り」** になり、主軸は完全に日付
- この profile から **category 軸は不要 → tags + 日付に一本化**（URL 分割の動機が消え、
  絞り込みは tags で十分。旧 Blogger ラベルもそのまま tags に移せる）
- **記事の移行・リダイレクトはしない**。旧ブログは長期間アクセス不能で Google に
  インデックスされていない＝**SEO 的に白紙スタート**。旧 URL 互換を考慮しない

## 12. 未決定 / 次回検討

- ISR / routeRules の詳細詰め（再検証 TTL の要否、オンデマンド revalidate を併用するか）→ 後日
- slugify の日本語処理（percent-encode 許容 / ローマ字化 / `slug` 明示を促す）
- slug 衝突時のサフィックス規則（`-2` 等）
- 読書進捗バーを正式採用するか（試験実装して判断）
- コメントを即時公開（status=approved デフォルト）にするか承認制（pending）にするか
- 内容ヒューリスティック（リンク数上限/NGワード）を初期から入れるか後付けか
- コメント本文の表記をプレーンテキストにするか Markdown 限定にするか

### 確定済み（このセッション）

- 記事の置き場所: `webPage/content/` を vault 実体にして gitignore（主軸）。別リポはフォールバック
- ビルド/デプロイ: ローカルで `vercel build && vercel deploy --prebuilt`
- バックアップ: Obsidian Sync + ローカルのみで許容
- 記事 URL: `/blog/log/[slug]`。slug は `slug` frontmatter or タイトル由来（カテゴリは URL に含めない）
- Obsidian 記法: 基本 remark プラグインで変換（wikilink/callout/添付画像）
- **管理軸: category 廃止 → tags + 日付に一本化**（主軸は日付、補助に tags）
- ページネーション: 一覧/タグ/年別アーカイブは 7件/ページ（`/page/[n]`）。記事の分割配信はしない
- SEO: OGP のみ（`nuxt-og-image` + `useSeoMeta`）。sitemap/schema-org は見送り。旧URL移行なし
- 全文検索: Vercel Function 方式（クライアント完結は約 700 記事には不向きで不採用）
- 拡張小ネタ採用: 閲覧カウンター（Upstash Redis・無料枠で実質無料）/ N年前の今日 /
  関連記事 / 前後ナビ / リンクカード / canonical / now・uses ページ / 控えめな view transition
- **コメント: 自作（Upstash Redis + Vercel Functions）**。非ログイン、多層スパム対策
  （honeypot + time-trap + Cloudflare Turnstile + Upstash レート制限）。第三者サービス不使用
- 読書進捗バーは試験採用（実装して判断）
