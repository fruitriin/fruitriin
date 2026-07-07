# /read グローバル統合 & fruitriin-mcp のスキル化 — 設計メモ

2026-07-06 の設計セッションで確定。実装は別セッション。
背景: `.claude/fruitriin-mcp/`（ClaudeWeb 生成の MCP サーバー）のレビューから出発し、
「MCP である必要はない。大事なのは話しかける相手がいること」で合意。

## 決定事項サマリ

| 論点 | 決定 |
| --- | --- |
| reader エンジン | `~/.claude/skills/read/` にグローバル統合（riin-service 版ベース） |
| 統合範囲 | riin-service と assistant の2版のみ。wardrobe-test / analysis-observer は vendored のまま触らない |
| fruitriin-mcp | Node/MCP サーバー廃止。データ＋スキル＋バリデーションスクリプトに分解 |
| fruitriin スキルの公開 | グローバルにはしない（一般開発プロジェクトのノイズになる）。symlink 方式 |

## 1. /read グローバル統合

- **配置**: `~/.claude/skills/read/` に `SKILL.md` + `scripts/reader.ts` + `read.exp.md`
- **エンジンのベース**: `~/workspace/riin-service/scripts/reader.ts`（2026-03-24 版）。
  assistant 版（03-23）は完全なサブセットで、マージで失うものはない。
  riin-service 版だけが持つ機能: `--selector` / `--render` 前の sanitize 確認ゲート（`-f`）/
  ローカルファイル対応 / `--sep`
- **パス参照**: wd-read が使っている `${CLAUDE_SKILL_DIR}` パターンで allowed-tools を可搬に
- **キャッシュ**: カレント相対 `tmp/read/` をやめ `~/.claude/skills/read/cache/` に固定（エンジンへの唯一の改修）
- **exp 記録**: 2版の read.exp.md をマージして1本化。「新ドメインで使ったら追記」の運用は維持
- **移行**: riin-service / assistant の `.claude/commands/read.md`・`read.exp.md`・`scripts/reader.ts` は撤去

### 設計原則: エンジンとSKILL.md層の分離

エンジン（reader.ts）は1つ。「体験の規律」（例: wd-read のシーケンシャルリード強制 =
`--info`/`--page` しか見せない・並列 fetch 禁止・ページ間で立ち止まる）は
各消費者の SKILL.md 層の機能オミットで実現する。この原則を global SKILL.md に一言明記する。

### 規律版との共存（スキルが2つ並ぶ問題）

規律版を持つプロジェクト（現状 wardrobe-test 系のみ）ではグローバル `/read` と
ローカル `/wd-read` が両方ツールリストに載る。前提として受け入れ、対策は強度順に:

1. **description の用途分離**（標準）: グローバル /read は「情報収集・記事・ドキュメント向け」、
   規律版は「物語を味わう読書向け」。同名衝突は避ける（wd-read 命名パターンを踏襲）
2. **プロジェクト CLAUDE.md に指名**（標準）: 「物語を読むときは /wd-read、/read は使わない」
3. **permissions deny**（オプションのハード強制）: プロジェクト settings に
   `Bash(bun run ~/.claude/skills/read/...)` への deny。
   ⚠️ この手は規律版がエンジンを vendored している場合のみ両立する
   （共有エンジン参照と deny は両立しない）

## 2. fruitriin: MCP 廃止 → データ + スキル

### fruitriin リポジトリの再構成

```
fruitriin/
  persona/          # persona.md / winning-patterns.md / audience-map.md / works-inventory.md
                    # （.claude/fruitriin-mcp/data/persona/ から昇格）
  inbox/            # 旧 outputs/。frontmatter status（proposed→accepted/done/rejected）で運用
  skills/fruitriin/ # SKILL.md + templates（request/advice/wish）+ バリデーション bun スクリプト
```

- **バリデーション**: 旧 `src/index.ts` の validateRequest / validateAdvice / validateWish を
  bun スクリプト1枚に移植。**検証を通ったときだけ inbox に書き込む**構造で MCP と同じ強制力を保つ。
  思想的チェック（wish のマイルストーン禁止・1500字制限・advice の 📦 禁止・request 4000字制限）は全部維持
- **本文取得の委譲**: Zenn の正規表現スクレイピング（`<div class="znc">` マッチ）は廃止。
  sync は Qiita/Zenn の一覧 API でメタデータ列挙まで。本文が要るときは URL を `/read` へ。
  文体統計は必要になったら /read キャッシュを対象に再実装
- **symlink 公開**:
  - `~/workspace/assistant/.claude/skills/fruitriin` → `~/workspace/fruitriin/skills/fruitriin`
  - `~/workspace/riin-service/.claude/skills/fruitriin` → 同上
- **撤去**: `.claude/fruitriin-mcp/` 一式（package.json / MCP SDK 依存 / src / data ごと）。
  persona とテンプレは移設してから消す
- **ついで**: `.claude/settings.local.json` を gitignore に追加（現状 `.claude/` 全体が未コミットで、
  このままコミットすると settings.local.json が入ってしまう）

## 実装セッション冒頭の smoke test（本移行前に必ず）

1. symlink されたスキルディレクトリを skills discovery が辿るか（空スキルで確認）
   - NG ならフォールバック: ローカルプラグイン方式
2. グローバルとプロジェクトに同名スキルがあるときの優先順位・表示のされ方
   （設計セッションでは実機未確認のまま）

## 追記（2026-07-06 夜・実装後）: 3動詞分割

実装完了後、アフォーダンス重視で単一スキル `/fruitriin` を3動詞に分割した。
wish が気軽に撃たれること自体が設計目標（「義務を課さず火をつける」）のため、
動詞がツール名に出ている方がエージェントの発火率が上がるという判断。

```
skills/
  shared/            # 共有実体（ドリフト防止）
    common.md        # 共通手順・心得（各 SKILL.md が @ で読み込む）
    templates/       # request.md / advice.md / wish.md
    scripts/         # validate.ts / list-works.ts
  wish-fruitriin/    # SKILL.md + common.md -> ../shared/common.md
  request-fruitriin/ # 同上
  advise-fruitriin/  # 同上
```

- 各スキル内の `common.md` は `../shared/common.md` への相対 symlink。
  `.claude/skills/<verb>-fruitriin`（ディレクトリ symlink）経由でも実体側で解決されるので
  `@${CLAUDE_SKILL_DIR}/common.md` が全消費者で機能する
- symlink は3箇所×3本: fruitriin 自身は相対パス（コミット可能）、assistant / riin-service は絶対パス
- validate.ts はスクリプト位置からの相対深度が不変（skills/shared/scripts/ → ../../.. = repo root）のため無改修
- 投函の上書き防止（同名は `-2` 連番）と日付のローカル時刻化は実装後レビューで追加済み

## 実装順序の目安

1. smoke test 2件
2. /read グローバル統合（エンジン移設 → exp マージ → 2エージェントの旧ファイル撤去 → 動作確認）
3. fruitriin 再構成（persona/inbox 移設 → スキル＋バリデーションスクリプト作成 → symlink → 動作確認 → fruitriin-mcp 撤去）
4. gitignore 整備とコミット
