---
name: fruitriin
description: "FruitRiin（リン、人間）へ非同期で執筆プロンプトを届ける。要望（request: 成果物を求める）・アドバイス（advice: 成果物を求めない助言）・読みたい！（wish: 軽い一声で火をつける）の3動詞。返事は保証されない非同期の投函。"
argument-hint: "<request|advice|wish> <テーマ>"
allowed-tools: Bash(bun run ~/workspace/fruitriin/skills/fruitriin/scripts/*), Read(~/workspace/fruitriin/**)
---

FruitRiin（リン）という人間へ、非同期で執筆プロンプトを渡すスキル。
旧 fruitriin-mcp の後継。MCP サーバーではなくデータ＋スキル＋バリデーションスクリプトで同じことをする。
これは**返事が保証されない非同期プロンプト**であり、投函先は `~/workspace/fruitriin/inbox/`。

## データの場所

| 何 | どこ |
|---|---|
| ペルソナ知識ベース | `~/workspace/fruitriin/persona/`（persona.md / winning-patterns.md / audience-map.md / works-inventory.md） |
| 投函先 | `~/workspace/fruitriin/inbox/`（frontmatter の status: proposed → accepted/done/rejected で運用） |
| テンプレート | `~/workspace/fruitriin/skills/fruitriin/templates/`（request.md / advice.md / wish.md） |

## 3動詞

### request — 要望する（成果物を求める）

成果物を求める非同期プロンプト。1核=1ファイル、全体4000字以内。
リンさんはコンテキスト展開能力が高く、解釈と出力は自分で練れる。だから構成案ではなく**メタ編集者のブリーフ**を書く。
各案は『📚エッセンス（これとこれとこれ）× 🧭読者（いまどういう状態か）× 🎯目標（読後どうなってほしいか）』の3点＋任意の📦形式。
『提言(1つ)・プロンプト集(複数案)』必須。マイルストーンは必要なときだけ。

### advice — アドバイスする（成果物を求めない）

既存記事・活動計画・発信戦略へのフィードバック等。『対象・アドバイス・根拠』を含む。
根拠には勝ちパターンや実績を引くこと。成果物要求（📦）は禁止——求めるなら request を使う。

### wish — 読みたい！とねだる

『リンさんにこういう記事書いてほしい！私が読みたい！』という軽い一声。
興味とやる気に火をつけることだけが目的。だから短く（1500字以内）、熱く、義務を課さない。
マイルストーンや成果物の指定は禁止（義務の匂いは火を消す）。
『読みたい！』『なぜ読みたいか（あなたにしか書けない理由）』＋任意の『ヒント（小さな種）』で構成。

## 手順

1. **書く前に必ず persona を読む**: `~/workspace/fruitriin/persona/persona.md` と `winning-patterns.md`。
   読者を意識するなら `audience-map.md`、在庫参照なら `works-inventory.md` も
2. 実データの記事一覧が要るときはメタデータ列挙スクリプトを使う:
   ```bash
   bun run ~/workspace/fruitriin/skills/fruitriin/scripts/list-works.ts        # qiita + zenn
   bun run ~/workspace/fruitriin/skills/fruitriin/scripts/list-works.ts zenn
   ```
   **本文が必要なときは URL を /read スキルへ渡す**（本文スクレイピングはこのスキルの仕事ではない）
3. テンプレート（`templates/<kind>.md`）準拠で本文を作り、一時ファイルに書く（Write ツール推奨）
4. バリデーションスクリプトで投函する。**検証を通ったときだけ inbox に書き込まれる**:
   ```bash
   bun run ~/workspace/fruitriin/skills/fruitriin/scripts/validate.ts <request|advice|wish> <slug> <本文ファイル>

   # 検証だけして投函しない場合
   bun run ~/workspace/fruitriin/skills/fruitriin/scripts/validate.ts <kind> <slug> --check <本文ファイル>
   ```
   slug はファイル名用（例: `taskbarfm認知向上`）。使える文字は英数・ひらがな・カタカナ・漢字・`_`・`-`
5. エラーが出たら本文を直して再実行。バリデーションの思想的チェック（wish のマイルストーン禁止・
   1500字制限・advice の 📦 禁止・request 4000字制限）は撤去交渉の対象ではない——直すのは本文の方

## 心得

- リンさんの展開能力を信じて短く書くこと。構成案や本文の下書きは渡さない
- 1核=1ファイル。欲張って複数の核を詰めない
- inbox の status 更新はリン本人が行う。投函後に勝手に status を書き換えない

入力: $ARGUMENTS
