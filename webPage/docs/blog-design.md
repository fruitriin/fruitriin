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

**主軸は「日付」、補助に「タグ」**。日記主体（エッセイ→note・技術→Qiita に振り分け）の
ブログのため、category 軸は廃止し **tags + 日付に一本化**（経緯は §11）。
記事 URL にカテゴリは含めない（permalink はタイムスタンプ固定）。

| パス | 内容 | レンダリング |
| --- | --- | --- |
| `/blog` | 最新記事（7件/ページ、日付降順） | ISR |
| `/blog/page/[n]` | 全体 n ページ目 | ISR |
| `/blog/[...slug]` | 記事個別（slug = タイムスタンプ permalink） | ISR |
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
title: 記事タイトル
date: 2026-06-20        # 主軸。一覧の降順ソート・年/月アーカイブの集計キー
tags: [日記, 週次振り返り]  # 横断・複数。旧 Blogger ラベル相当（series もタグで表現）
draft: false            # true の記事はビルドで除外
description: 一覧やOGPに使う要約（任意）
---

本文（Markdown）
```

### 管理軸（category 廃止・tags + 日付に一本化）

- **日付**: `date` frontmatter。**主軸**。一覧の降順ソート、年/月アーカイブの集計キー
- **タグ**: `tags` frontmatter（複数）。`/blog/tags`・`/blog/tags/[tag]` の集計キー。
  旧 Blogger のラベル（日記 / 週次振り返り / KPT / 読書感想 …）をそのまま移行できる
- **slug**: デイリーノートのファイル名（タイムスタンプ）から自動生成。`/blog/<timestamp>` 固定
- ~~カテゴリ~~: 廃止。URL 分割が不要になり、絞り込みは tags で十分なため（§11 参照）

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
│   │       ├── ViewCounter.vue      # 閲覧カウンター（KV連携）
│   │       ├── Comments.vue         # giscus 埋め込み
│   │       ├── RelatedPosts.vue     # 関連記事（同 tags）
│   │       ├── PostNav.vue          # 前後ナビ
│   │       └── OnThisDay.vue        # N年前の今日
│   ├── server/
│   │   ├── api/
│   │   │   ├── search.get.ts        # 全文検索（MiniSearch）
│   │   │   └── views/[slug].ts      # 閲覧数 取得/加算（Vercel KV）
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
| 閲覧カウンター | 記事ごとの閲覧数。runtime に Function が KV を加算 | **Vercel KV / Upstash Redis**（要セットアップ） |
| コメント（giscus） | GitHub Discussions をコメント欄に埋め込み | **Discussions 有効な公開リポ1つ**（`fruitriin/fruitriin` or 専用リポ） |
| N年前の今日（On This Day） | 同じ月日の過去記事を表示。日付主軸の日記と好相性 | なし（`date` で集計） |
| 関連記事 | 同 tags の記事を末尾に提示 | なし（`queryCollection` の tags 一致） |
| 前後ナビ | 前/次の記事リンク | なし（`queryCollectionItemSurroundings`） |
| リンクカード | 本文中の外部 URL を OGP 付きカードに展開 | remark プラグイン |
| canonical | 転載時の正規 URL 指定（note/Qiita 振り分け方針の重複対策） | frontmatter に `canonical` フィールド追加 |
| /now・/uses | IndieWeb 定番の近況/道具ページ。人物像を立てる静的ページ | なし（静的ページ） |
| view transition | 一覧⇄記事の控えめなトランジション | なし（下記の演出方針） |

**閲覧カウンターの実装方針**
- カウントは **Vercel KV / Upstash** に保存。`server/api/views/[slug].(get|post).ts` で取得/加算
- ローカル prebuilt デプロイでも、加算は runtime の Function が KV を叩くため問題なく動作
- 人気記事ランキング枠にも転用可能

**コメント（giscus）の前提**
- コメントの実体は **GitHub Discussions**。スパム耐性・サーバ DB 不要
- 「Discussions を有効化した公開リポジトリ」が 1 つ必要。プロフィールリポ流用 or 専用リポ

**canonical**
- frontmatter に `canonical?: string` を追加。指定があれば記事 head の
  `<link rel="canonical">` をそのURLに向ける（Qiita/note へ転載した記事の重複回避）

**view transition の演出方針（クドくしない）**
- 一覧⇄記事はクロスフェード 150–200ms 程度の最小限
- 共有要素トランジションは「一覧サムネ → 記事ヘッダ画像」の 1 箇所だけに絞る
- `prefers-reduced-motion` を尊重し、低減設定時は無効化

> ※「リンクバー」はリンクカードとして採用。読書進捗バー（スクロール位置バー）を指す場合は別途追加。

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
- タイムスタンプ slug の粒度（日付のみ `2026-06-20` / 時刻付き `2026-06-20-1530` / 階層 `2026/06/20`）
- 1日複数記事の扱い（連番 or 時刻付与）
- Obsidian 固有記法（wikilink/callout）を変換層で吸収するか / 素 md に寄せるか
- 閲覧カウンターのストレージ（Vercel KV / Upstash Redis のどちらか）
- giscus 用リポジトリ（`fruitriin/fruitriin` 流用 or コメント専用リポ）
- 「リンクバー」= リンクカード採用済み。読書進捗バーも足すか

### 確定済み（このセッション）

- 記事の置き場所: `webPage/content/` を vault 実体にして gitignore（主軸）。別リポはフォールバック
- ビルド/デプロイ: ローカルで `vercel build && vercel deploy --prebuilt`
- バックアップ: Obsidian Sync + ローカルのみで許容
- 記事 URL: タイムスタンプ slug の固定 permalink（カテゴリは URL に含めない）
- **管理軸: category 廃止 → tags + 日付に一本化**（主軸は日付、補助に tags）
- ページネーション: 一覧/タグ/年別アーカイブは 7件/ページ（`/page/[n]`）。記事の分割配信はしない
- SEO: OGP のみ（`nuxt-og-image` + `useSeoMeta`）。sitemap/schema-org は見送り。旧URL移行なし
- 全文検索: Vercel Function 方式（クライアント完結は約 700 記事には不向きで不採用）
- 拡張小ネタ採用: 閲覧カウンター / giscus コメント / N年前の今日 / 関連記事 / 前後ナビ /
  リンクカード / canonical / now・uses ページ / 控えめな view transition
