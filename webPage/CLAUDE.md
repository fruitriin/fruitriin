# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

果物リン (FruitRiin) のポートフォリオサイト「Riin's Workspace」。
公開URL: https://www.riinswork.space/（GitHub Pages、CNAME: `src/public/CNAME`）

## 開発コマンド

パッケージマネージャは **bun**。このディレクトリで実行する。

```bash
bun install        # 依存インストール
bun run dev        # 開発サーバー起動 (port 8093)
bun run build      # 静的サイト生成 (nuxt generate)
bun run preview    # 生成済みサイトのプレビュー
```

## アーキテクチャ

- **フレームワーク**: Nuxt 4（静的サイト生成モード）
- **srcDir**: `src/`（`nuxt.config.ts` で指定）
- **publicDir**: `src/public/`（画像・CNAME等の静的アセット）
- **出力先**: `dist/`（gitignore対象）
- **devServer port**: 8093（`nuxt.config.ts` で指定）

### ページ構成

- `src/pages/index.vue` — メインのポートフォリオページ（後述）
- `src/pages/luluReminder/privacy.vue` — アプリのプライバシーポリシー
- `src/pages/missRirica/` — アプリの利用規約・プライバシーポリシー

### スタイリング

CSSはSFC内の `<style scoped>` で完結。CSS変数（`--cyan`, `--coral` 等）を `:root` で定義し、サイト全体のカラーテーマを管理。

## index.vue の構造

単一SFCにプロフィール、強み、Works、職歴（History）、スキルの全セクションを含む。コンテンツは `data()` にJSオブジェクトとして集約されており、外部データソースは使わない。

### コンテンツ編集

`data()` 内のオブジェクトを編集すればコンテンツが更新される。テンプレート側の構造変更は不要なケースが多い。画像は `/static/` パスで参照（`assetBase` 変数経由）。

### History の media 構造

各社の `history[]` エントリは `roles`（在職情報）に加えて `media` 配列を持つ。media の各要素は `{ type, items }` で、type は `"talks"` / `"articles"` / `"magazine"` のいずれか。`mediaTypes` オブジェクトでラベル・絵文字・単位を一元管理している。

フィルターパネル（`filters`）で History セクション内の在職詳細・登壇・記事・雑誌の表示/非表示を一括制御できる。個別ブロックの開閉は `closedBlocks` で管理。

### 取扱説明書

取扱説明書は index.vue からリンクされる別ページ（`/manual`）。現在ページ未作成。

### コンポーネント設計

A Philosophy of Software Design (John Ousterhout) の設計原則に従う。
特に information hiding / deep module を重視し、コンポーネントにはドメインデータをそのまま prop して、表示ロジック（マッピング・分岐・エラー処理）はコンポーネント内部で完結させる。

## Vue BestPractice
### computed > watch

どちらでも実装できるときは computed を採用する

### compotision API での immediate watch need flush: post

watch に immediate option を使う場合は、 flush: post と併せて利用する
flush: pre がデフォルトだが、これは意図した挙動と異なる（Vue2のデフォルトは flush: post だった）

## typeof Klass > type > interface
type Klass や type SomeProp = type Klass.someProp を使える場合はそれを優先する
それ以外は基本的に type を使う
interface を利用するのは、交差型を多用してパフォーマンスに悪影響が出るレベルになったら検討する
