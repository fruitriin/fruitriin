<script lang="ts">
// Riin's Workspace — 2026 refresh
// コンテンツは data() に集約。画像は /static 配下を参照。
// History は「在職」をベースに、各時期の登壇 / ブログ / 雑誌をぶら下げる。
export default defineComponent({
  data() {
    return {
      isShowHeader: false,
      showFilter: false,
      assetBase: "/static",
      name: "果物リン (Fruitriin)",
      tagline: "複雑さを見つけたら減らさずにいられない、エンジニア寄りの何でも屋",
      careerMessage: "楽しく仕事できることが一番、感謝されることが二番",
      links: {
        twitter: "https://twitter.com/FruitRiin",
        github: "https://github.com/fruitriin/",
        speakerdeck: "https://speakerdeck.com/fruitriin",
        sponsors: "https://github.com/sponsors/fruitriin"
      },
      strengths: {
        heading: "強み",
        groups: [
          { emoji: "🧩", label: "構造的思考 — “複雑さを減らす”", items: [
            { t: "コード設計、会議設計、チーム設計 — どのレイヤーでも「複雑さを減らす」を一貫して適用する" },
            { t: "問題を人のせいにせず、構造の問題として捉えて再現可能な解決策を出す" },
            { t: "自分用に編み出した補償戦略をチームの仕組みに転用するのが得意", sub: ["例: 個人のタスク管理術 → チームのスクラム運用改善へ展開"] }
          ] },
          { emoji: "📋", label: "情報整理 — リアルタイムでも、設計としても", items: [
            { t: "リアルタイム整理: 議事録もホワイトボードも同じ能力の場所違い。会話を止めずに構造化する", sub: [
              "ホワイトボードは用途で書き分ける（発散 / 収束 / タスクアサイン / タイムライン / 逆算 / グラフ）",
              "実績: インシデント対応で2時間・ホワイトボード6枚に情報を構造化 → チームが即座に動けた"
            ] },
            { t: "情報設計: 近接・整列・反復・コントラストを議事録にもドキュメントにも適用する", sub: ["リアルタイムでも自然に使うが、落ち着いた後にもう一段階強く構造化し直す"] },
            { t: "会議は臨む前から設計する派（議題・時間配分・議事録のフォーマットまで）" },
            { t: "プレゼンが上手い（SpeakerDeck 39デッキ）", sub: ["LTの評判:「面白い」「聞きやすい」「面白いのにとても参考になる」", "30〜40枚のLT資料を3時間半で仕上げる"] }
          ] },
          { emoji: "🚀", label: "キャッチアップ力", items: [
            { t: "1〜2ヶ月で既存メンバー並のタスクをこなせるようになる", sub: ["入社3日で最初のPRを出すペース感"] },
            { t: "座学よりOJT派。タスクに取りかかりながら理解を組み上げる", sub: ["7割までは一人で進められる。残り3割は他人が必要", "断片から仮説を立てて構造的に理解を埋めていく"] }
          ] },
          { emoji: "🤝", label: "チームワーク力 — 天然ではなく、設計して獲得した力", items: [
            { t: '1on1で "謎に整理される" と言われる対話力。相手の思考を構造化して返す' },
            { t: "ミーティングでチームの理解が追いつかない瞬間を察して、認識を揃える一言を挟む" },
            { t: "スクラムが回っていなければ、自分の解釈を布教したりツールを作る", sub: ["会話そのものを設計してしまう（デイリースクラム、レトロスペクティブなど）"] },
            { t: "素の対人能力は高くない。配慮は計算しないとできないし、社会性には自覚的なコストがかかる" },
            { t: "だから構造的思考を対人にも適用して、実用レベルに引き上げた" }
          ] },
          { emoji: "🔧", label: "エンジニアリング・ツール開発", items: [
            { t: "Claude / AI活用の啓蒙。使い方だけでなく「良い使い方」の設計まで踏み込む" },
            { t: "リポジトリのAI向け整備、社内ツール開発。頼まれなくても自然体でやる" },
            { t: "分析タスクではデータを集める設計から入る。必要ならツールごと作る" },
            { t: "グラフィックレコーディングが得意" }
          ] },
          { emoji: "🌐", label: "コミュニティ運営力", items: [
            { t: "自分がほしいと思ったコミュニティがそこになければ作る" },
            { t: "趣味のオンラインSNSコミュニティをDAU 400人・MAU 900人規模で複数運営" },
            { t: "LT勉強会の運営経験もあり" }
          ] }
        ]
      },
      works: {
        oss: [
          { title: "MISTEMS", desc: "Misskey の fork。ほしい機能を詰め込んだ改造Misskey", url: "https://github.com/mistems/mistems" },
          { title: "AutomatonDevDriveFramework (ADDF)", desc: "Claude Code 向けのエージェンティック開発フレームワーク", url: "https://github.com/fruitriin/AutomatonDevDriveFramework" },
          { title: "MagiaMagica", desc: "コードベースを魔法陣に変換するレンダラ ✨", url: "https://github.com/fruitriin/MagiaMagica" },
          { title: "embodied-claude-wardrobe", desc: "Claude Codeに身体と魂を与えるワードローブ", url: "https://github.com/fruitriin/embodied-claude-wardrobe" }
        ],
        feature: { title: "Taskbar.fm", desc: "Macにタスクバーをつけます（Windowsのような！）", img: "Taskbar_fm_README.png" },
        talks: [
          { title: "記憶を高速で思い出す全文検索パフォーマンス・チューニング テクニック", meta: ["2026/05", "AIキャラクター開発ディープな話 #1"], note: "最近はLLMを人らしく会話できるようにすることにハマっていて、同テーマで3本登壇しました。" },
          { title: "Claude Codeと2つの巻き戻し戦略", meta: ["2026/02", "社内LT"], note: "社内LTの場があればほぼ毎月喋ってしまうタイプ。Claude Codeを社内に浸透させたくて、3ヶ月連続で関連トピックを登壇しました。" },
          { title: "SOFT SKILLSに学ぶプログラマーの自己ブランディングとその効果", meta: ["2020/04", "Webエンジニア勉強会inVR 第1回", "1.5k views"], note: "今のエンジニアリング活動力の原点。コロナ禍で発表の場が消えた時期に、VR勉強会を自分で主催して登壇しました。" },
          { title: "LT・登壇でマサカリに備えるたった一つの心得", meta: ["2019/03", "PHPerKaigi 2019", "6.8k views"], note: "PHPerKaigi 2019 LT枠のオオトリ。とにかくウケました。" },
          { title: "あえてPHPerにすすめるVue.js入門", meta: ["2018/07", "PHP Conference 関西 2018", "1.8k views"], note: "PHPのカンファレンスであえてVue.jsを勧めるセッション。フロントエンドが黒船として来航した2018年当時、とても盛り上がりました。" }
        ],
        magazine: [
          { url: "https://gihyo.jp/magazine/SD/archive/2020/202009", cover: "https://gihyo.jp/assets/images/cover/2020/thumb/TH800_642009.jpg", title: "特集「ステップアップ式Vue.js講座」 約44ページ", meta: ["Software Design 2020年9月号 特集"], photo: "vuejs-feature-page.jpg" },
          { url: "https://gihyo.jp/magazine/SD/archive/2020/202012", cover: "https://gihyo.jp/assets/images/cover/2020/thumb/TH800_642012.jpg", title: "連載「VR勉強会のススメ」（全3回）", meta: ["Software Design", "2020年12月号〜2021年2月号"], note: "第1回: VR勉強会ってどんなもの？ / 第2回: あなたにもできるVR勉強会での登壇 / 第3回: おもしろいからやってみようVR勉強会の開催" }
        ],
        products: [
          { title: "TweetLightning — シュッと投稿できるTwitterクライアント", meta: ["Win / Mac", "Electron, Vue"] }
        ]
      },
      // History: 在職をベースに、各時期の登壇 / ブログ / 雑誌を media に持たせる
      history: [
        { company: "フリーランス", roles: [
          { period: "2026/06 〜 現在", title: "フルタイムOSS開発者", lead: "GitHub Sponsorsで活動中。MISTEMS、ADDF、MagiaMagica等を開発・メンテナンス。", items: [] }
        ] },
        { company: "株式会社クラフトマンソフトウェア", roles: [
          { period: "2025/12 〜 2026/05", title: "カスタムAndroid OS ビルドワークフロー最適化（受託開発）", lead: "ハードウェアメーカーのソフトウェア部門が開発するカスタムAndroid OSを対象に、Kubernetes / Argo Workflows を基盤とするCI/CDパイプラインの改善・運用を担当。チーム8名。", items: [
            "既存CI/CD基盤を引き継ぎ、プロジェクト要件に合わせた継続的な対応・改善を実施",
            "ワークフロー全体のリファクタリングを主導し、保守性・可読性向上の土台を構築",
            "インフラコスト削減に向けた構成見直しを実施",
            "GitHub Enterpriseのサブスクリプション失効リスク発覚時、2時間でホワイトボード6枚分に影響範囲・対応優先度・関係者を整理。インシデント収束に貢献",
            "プロジェクトドキュメントをLLMが参照しやすい構造に整備し、暗黙知のドキュメント化を推進",
            "LLMを活用した開発支援ツールを自作・導入。チーム内勉強会を企画・実施",
            "社内LT会（月次）にて在籍6ヶ月間で4回登壇し、生成AI活用の知見を社内全体へ発信",
            "スクラム運用の改善を提案・実施。デイリースクラムの運用ルール見直し、タイムキープ支援ツールの導入"
          ] }
        ], media: [
          { type: "talks", items: [
            { title: "記憶を高速で思い出す全文検索パフォーマンス・チューニング テクニック", url: "https://speakerdeck.com/fruitriin/how-to-make-your-ai-recall-quickly", views: "65 views" },
            { title: "AIに与える人間らしさを（略）したら600ページの同人誌になった", url: "https://speakerdeck.com/fruitriin/i-kept-thinking-about-making-ai-more-human-more-more-more-dot-dot-dot-wait-when-did-this-become-a-600-page-doujinshi", views: "110 views" },
            { title: "入社半年で作った“社内でも使える”ツール集", url: "https://speakerdeck.com/fruitriin/everything-i-built-on-the-side-in-half-a-year", views: "86 views" },
            { title: "embodied記憶の依代 聖杯問答", url: "https://speakerdeck.com/fruitriin/vessel-of-memory-the-grail-dialogue", views: "170 views" },
            { title: "ClaudeCodeと遠くへいくためのパーミッションルール", url: "https://speakerdeck.com/fruitriin/stop-checking-start-trusting-claude-code-permission-rules", views: "63 views" },
            { title: "Claude Codeと2つの巻き戻し戦略", url: "https://speakerdeck.com/fruitriin/two-rewind-strategies-with-claude-code", views: "240 views" },
            { title: "Claude Codeと物忘れ", url: "https://speakerdeck.com/fruitriin/invitation-talk-about-context-why-claude-code-forget", views: "86 views" }
          ] },
          { type: "articles", items: [
            { title: "Claude Codeとの会話を全部振り返りたかった——ccconvを作った本当の理由", url: "https://zenn.dev/fruitriin/articles/0dac6a3a8333e8", views: "Zenn" }
          ] }
        ] },
        { company: "個人活動 / 休養期", roles: [
          { period: "2024/03 〜 2025/12", title: "OSS開発・技術記事執筆", lead: "ファンファーレ退職後、休養しつつMISTEMS（Misskey fork）の開発やClaude Code関連のツール開発に注力。", items: [] }
        ], media: [
          { type: "articles", items: [
            { title: "claude codeのセッションログを振り返るツール ccconv(ccこんぶ)を作りました", url: "https://zenn.dev/fruitriin/articles/ee90b2143abc23", views: "Zenn" },
            { title: "Capacitor で作ったアプリを実機デバッグでホットリロードしたい", url: "https://qiita.com/fruitriin/items/d2dbb5ce2e2600b036b7", views: "Qiita" },
            { title: "Misskey（ローカルお試し環境・連合なし）を構築する", url: "https://qiita.com/fruitriin/items/04672855f0d69892ed72", views: "Qiita" },
            { title: "Misskeyをワンライナーでアプデしたいし変更点を確認したい", url: "https://qiita.com/fruitriin/items/4ecea80b920a40500ac3", views: "Qiita" }
          ] }
        ] },
        { company: "ファンファーレ株式会社", roles: [
          { period: "2022/11 〜 2024/03", title: "toB SaaS 産業廃棄物配車表作成サービス開発", lead: "産廃業者の配車担当者向けSaaS。車両特性・ドライバー・処理業者の各種キャパシティから最適巡回経路を自動生成するサービスのフロントエンドを担当。FE3名/BE2〜3名/PdM1名/MLエンジニア2名。", items: [
            "配車・予約管理画面（一覧・編集）の新規開発。積荷形状等の固定値パラメータの変数化により適用ユースケースを拡大",
            "前任者が構築したJavaライクなオニオンアーキテクチャを踏査し課題を特定。改善の青写真を立案・チームへ提案・合意形成のうえ実施",
            "interface削除を中心としたリファクタリングを機能開発と並行して推進し、約2万行を削除（約1〜2ヶ月）",
            "Claude Sonnet 3.5 / Cursorの導入を主導。当時のLLMの制約を考慮した関数単位のタスク分割・コメントによるコンテキスト補完のプロンプト設計手法を確立・共有",
            "社内ミーティングのリアルタイム議事録を実施。Google Docs / Confluenceで話題をツリー構造で整理しながら記録し、チームから高い評価を獲得",
            "体調を崩し、退職"
          ] }
        ], media: [
          { type: "articles", items: [
            { title: "Vue.jsでCompositionAPIを使わなくていい理由と、それでも理解しなければならない理由", url: "https://qiita.com/fruitriin/items/78d06d722cead8b3c686", views: "Qiita" }
          ] }
        ] },
        { company: "株式会社スタディスト", roles: [
          { period: "2021/10 〜", title: "toB SaaS ビジュアルマニュアルプラットフォーム開発", lead: "サービスの信頼性向上のため、細かな改善を積み重ねるチームに配属。", items: [
            "UIUX周りの改善を中心に小さな改善を積み重ねた",
            "ドラッグアンドドロップAPIを使ったやや複雑で大きな機能改善を実施",
            "その際、Vue2系にComposition APIをチーム開発で導入",
            "チーム改変で3ヶ月単位の大きな機能開発へシフト。フロントエンドのコンセプト実装など中核を担う（canvasを使った複雑なもの）",
            "メンバーの技術レベル向上のため黙読会を開催し、疑問にその場で答える／議論する場を運営",
            "チーム開発のプロセスについて積極的に疑問提起・改善提案",
            "改善チームの解散後は、個人活動として他のディレクターやデザイナーを巻き込んで動き出した"
          ] },
          { period: "2020/07 〜 2021/10", title: "toB SaaS 販売促進プラットフォーム開発", lead: "バックエンドのRails、フロントエンドのVueでWebアプリを開発。立ち上げ途中から参加（開発3〜4人）。", items: [
            "フロントエンドに強い人としてアサインされ、能力を発揮。2020/11 にローンチ",
            "Storybookを利用した画像回帰テストなど、開発環境の改善に継続的に取り組む",
            "Railsについても十分書ける感触を掴む。売上を最上位に置く優先順位付けを学ぶ",
            "リーダーのPdM化に伴い、徐々に開発を牽引する役割を期待される",
            "Capacitorでガワネイティブアプリ作成を牽引（事前調査〜初回作成）。後のPush通知機能の下地に"
          ] },
          { period: "2020/02 〜 2020/06", title: "toB SaaS ビジュアルマニュアルプラットフォーム開発", lead: "RailsとVueでマニュアルを作成・活用するWebアプリを開発。安定期にフロント強い人としてジョイン。", items: [
            "フロントエンドのちょっとした工夫で体験が良くなる修正を中心にUX改善",
            "Ruby / Railsは業務初だったが、UX改善に必要なバックエンド改修も含めキャッチアップ"
          ] }
        ], media: [
          { type: "talks", items: [
            { title: "Electron+Vue+Swift=真のデスクトップアプリ", url: "https://speakerdeck.com/fruitriin/how-to-create-really-desktop-app-using-electron", views: "130 views" },
            { title: "ある日オレオレフレームワークを作りたくなったぞ", url: "https://speakerdeck.com/fruitriin/want-to-create-oreore-framework", views: "180 views" },
            { title: "fishとfzfはじめて 豊かになりました", url: "https://speakerdeck.com/fruitriin/fish-and-fzf-is-good", views: "980 views" },
            { title: "Chrome Devtools使いこなしたい", url: "https://speakerdeck.com/fruitriin/i-want-to-master-devtool", views: "1.6k views" },
            { title: "Event Stage — 真面目に作ったけど全くウケなくてクソだったアプリ", url: "https://speakerdeck.com/fruitriin/i-made-new-service-but-they-say-shit", views: "200 views" },
            { title: "読み上げチャット＋映像配信サービス作ってるけど…", url: "https://speakerdeck.com/fruitriin/i-develop-text-to-speach-chat-and-broadcast-savice-but-dot-dot-dot", views: "170 views" },
            { title: "とある自社開発の苦楽の軌跡", url: "https://speakerdeck.com/fruitriin/trajectory-of-a-certain-in-house-development-effort", views: "270 views" },
            { title: "動画再生速度を変更するコンポーネントを作ろうとして諦めた話", url: "https://speakerdeck.com/fruitriin/talk-about-give-up-to-create-video-with-playback-rate-controller", views: "990 views" },
            { title: "Soft Skillsから伝えたい新人時代の個人開発技術選定", url: "https://speakerdeck.com/fruitriin/selecting-stack-for-personal-development-as-a-from-soft-skills", views: "380 views" },
            { title: "SFCで挑戦するFunctional Component", url: "https://speakerdeck.com/fruitriin/functional-component-challenge-at-sfc", views: "1.6k views" },
            { title: "[社内LT] 元窓使いで林檎教信者ですが窓使いに転生します", url: "https://speakerdeck.com/fruitriin/im-an-ex-windowman-a-follower-of-the-apple-cult-but-im-turning-into-a-windowman", views: "410 views" },
            { title: "読書から始めるポモドーロ・テクニック", url: "https://speakerdeck.com/fruitriin/the-pomodoro-technique-starting-with-reading", views: "1.8k views" },
            { title: "[社内LT] おいでよNuxtの森", url: "https://speakerdeck.com/fruitriin/wellcome-to-nuxt", views: "850 views" },
            { title: "SOFT SKILLSに学ぶプログラマーの自己ブランディングとその効果", url: "https://speakerdeck.com/fruitriin/learn-from-soft-skills-about-self-branding-and-it-good-effects", views: "1.5k views" }
          ] },
          { type: "articles", items: [
            { title: "【Vue】子コンポーネントから親コンポーネントに関数をemitするっていうアイデアを思いついた", url: "https://zenn.dev/fruitriin/articles/7ae46c6893dc80", views: "Zenn" },
            { title: "[HTML/CSS高速コーディング] ギリギリまでコードを書かないChrome DevToolsのリアルタイムレイアウト編集テクニック", url: "https://qiita.com/fruitriin/items/1e01f57ecb750f3612d0", views: "Qiita" },
            { title: "1日でWebRTCを使った素朴なビデオチャットを作ってみた時にひっかき集めたリンク集", url: "https://qiita.com/fruitriin/items/cf829166a4c629fa5c01", views: "Qiita" },
            { title: "IFTTTで（特にTwitterを）エゴサする工夫", url: "https://qiita.com/fruitriin/items/9206bb1849b9051e0ec2", views: "Qiita" },
            { title: "Ionic/Vue でiOSアプリケーションを作る", url: "https://qiita.com/fruitriin/items/8fe0865fc4ea548e5952", views: "Qiita" }
          ] },
          { type: "magazine", items: [
            { title: "特集「ステップアップ式Vue.js講座」 約44ページ", url: "https://gihyo.jp/magazine/SD/archive/2020/202009", views: "Software Design 2020年9月号" },
            { title: "連載「VR勉強会のススメ」（全3回）", url: "https://gihyo.jp/magazine/SD/archive/2020/202012", views: "Software Design 2020年12月号〜2021年2月号" }
          ] }
        ] },
        { company: "株式会社ゆめみ", roles: [
          { period: "2019/02 〜 2019/12", title: "フルSPAニュースサイト構築", lead: "APIのレスポンスをもとにニュースを表示するサイトを Vue.js (Nuxt.js) で構築。", items: [
            "2019/04 からリーダーを任され、クライアント交渉とプロジェクト進行管理を兼任",
            "経験の浅いメンバーが多い中、レビューやペアプロを通して実力アップに貢献",
            "受託特有のコミュニケーションロスを減らそうと尽力",
            "フロント実装が後半に集中しがちな課題に対し、タスクを分解し全員で解決する雰囲気作りを推進"
          ] }
        ], media: [
          { type: "talks", items: [
            { title: "Vue.jsを漸進的にVue.tsへ変えていく", url: "https://speakerdeck.com/fruitriin/vue-dot-js-project-progressive-convert-to-typescript", views: "2.4k views" },
            { title: "VueでTypeScriptを始める 3つのStyle", url: "https://speakerdeck.com/fruitriin/3-style-to-start-vue-with-typescript", views: "1.5k views" },
            { title: "“今” IonicVueでTodoアプリを作ってみる", url: "https://speakerdeck.com/fruitriin/now-create-todo-app-using-ionic-vue", views: "900 views" },
            { title: "Vue.Nuxt 小ネタ集", url: "https://speakerdeck.com/fruitriin/vue-and-nuxt-tips", views: "540 views" },
            { title: "Atomic Designと刺さらない現場", url: "https://speakerdeck.com/fruitriin/atomic-design-and-it-fit-to-project-or-not", views: "2k views" },
            { title: "図解！iOSとFCMで始めるCapacitorのPush通知", url: "https://speakerdeck.com/fruitriin/illustration-capacitor-push-notifications-start-from-ios-and-firebase-cloud-messaging", views: "1.5k views" },
            { title: "Vueでネイティブアプリを作る — Ionic Vueの紹介", url: "https://speakerdeck.com/fruitriin/invitation-at-ionic-vue", views: "2k views" },
            { title: "Ionic/VueでCapacitorってぶっちゃけどうなの？", url: "https://speakerdeck.com/fruitriin/how-about-ionic-vue-with-capatitor", views: "1.7k views" },
            { title: "Nuxt(SPA)でもOGPしたい", url: "https://speakerdeck.com/fruitriin/want-to-render-ogp-with-nuxt-spa-mode", views: "3.5k views" },
            { title: "LT・登壇でマサカリに備えるたった一つの心得", url: "https://speakerdeck.com/fruitriin/knowledge-of-presentation-to-shield-from-hand-axes", views: "6.8k views" },
            { title: "あえてPHPerに勧めるVue.js（PHP勉強会）", url: "https://speakerdeck.com/fruitriin/invitation-to-start-vue-dot-js-dare-to-phper", views: "1.1k views" }
          ] }
        ] },
        { company: "株式会社ORATTA", roles: [
          { period: "2018/08 〜 2018/12", title: "ソーシャルゲーム（ネイティブ）サーバーサイド開発 / 運用", lead: "社内の人手不足に伴い、もう一つのプロジェクトも兼任。", items: [
            "PHP（自社製フレームワーク）によるサーバーサイドAPI実装",
            "バグ修正・要望チケットの対応、社内ツールの機能追加・改良",
            "公式ホームページの事前登録ページの作成"
          ] },
          { period: "2017/09 〜 2018/10", title: "ソーシャルゲーム（ブラウザ）開発 / 設計 / 運用 / 保守", lead: "サーバーアプリケーションエンジニアとして、リリースから2年半のプロジェクトを引き継ぎ担当。", items: [
            "PHP（自社製フレームワーク）によるサーバーサイド実装。ブラウザタイトルのためHTML/CSS/JSも一部",
            "既存機能の改良・バグ修正、新規施策の設計・開発",
            "施策リリース時のサーバー監視、不具合・オペミス時のデータ補正",
            "エラーログ監視ツール Rollbar を導入し、横展開用ドキュメントを作成",
            "半期に1回の社内MVP投票で、テック部門の準MVPを受賞 🏆"
          ] }
        ], media: [
          { type: "talks", items: [
            { title: "Vue.js超入門（ライブ）", url: "https://speakerdeck.com/fruitriin/vue-dot-js-introduction-live-coding", views: "500 views" },
            { title: "VueCLI3がうまちわるい", url: "https://speakerdeck.com/fruitriin/vuecli3gaumatiwarui", views: "550 views" },
            { title: "[社内LT] 林檎教に入信した元窓使いの憂鬱", url: "https://speakerdeck.com/fruitriin/the-melancholy-of-a-former-window-user-who-joined-the-apple-cult", views: "470 views" },
            { title: "LTでマサカリに備える盾としての心得", url: "https://speakerdeck.com/fruitriin/ltdemasakarinibei-erudun-tositefalsexin-de", views: "470 views" },
            { title: "あえてPHPerにすすめるVue.js入門", url: "https://speakerdeck.com/fruitriin/aetephpernisusumeruvue-dot-jsru-men", views: "1.8k views" },
            { title: "Vueはいいぞ！ハンズオン風味", url: "https://speakerdeck.com/fruitriin/vuehaiizo-hanzuonfeng-wei", views: "230 views" },
            { title: "HerokuでPHPとNodejsの併用", url: "https://speakerdeck.com/fruitriin/herokudephptonodejsfalsebing-yong", views: "450 views" }
          ] },
          { type: "articles", items: [
            { title: "窓使いがMacに入信したけど発狂したのでやっぱりWindowsっぽく操作したい", url: "https://qiita.com/fruitriin/items/fc7a61028c38130d0b44", views: "Qiita" }
          ] }
        ] },
        { company: "株式会社ITPM（SES）", roles: [
          { period: "2016/06 〜 2017/08", title: "ECサイト機能追加 / 改修", lead: "ポータルサイト（Zend Frameworkベース）の機能追加。場面に応じてサーバーサイド〜フロントまで担当。", items: [
            "HTMLモックと要件をもとに実装",
            "SP版検索画面リニューアルの実装を担当し、高機能化・高速化を実施"
          ] },
          { period: "2015/12 〜 2016/05", title: "ECサイトの機能追加・改修", lead: "PCのBTOショップの機能追加・改修について、詳細設計・実装・総合試験の一連を受託。", items: [
            "受け取った基本設計・画面イメージを元に処理設計を行い実装",
            "テストケースの作成・実施"
          ] },
          { period: "2015/06 〜 2015/11", title: "会社案内サイト作成", lead: "受託業務にて、会社案内ホームページのリニューアルのコーディングを担当。", items: [] }
        ] }
      ],
      skills: {
        programming: ["JavaScript", "Vue.js", "TypeScript", "Nuxt.js", "Electron", "Ruby", "PHP", "Rust"],
        ai: ["Claude / Claude Code", "AI活用の啓蒙・設計", "プロンプトエンジニアリング", "LLMアプリ開発", "Agentic Coding", "ハーネス設計"],
        soft: ["グラフィックレコーディング", "プレゼンテーション / 登壇", "リアルタイム情報整理", "社内ツール開発", "チーム認識合わせ", "1on1 / 悩み相談", "スクラム運用・改善"],
        language: ["日本語", "英語"]
      },
      // 開いている職務詳細（"ci-ri"）。直近2社の在職は最初から開く
      openRoles: { "1-0": true, "3-0": true } as Record<string, boolean>,
      // 折りたたまれた media ブロック（"ci-type" → true で閉）
      closedBlocks: {} as Record<string, boolean>,
      // フィルター状態
      filters: { jobs: true, talks: true, articles: true, magazine: true } as Record<string, boolean>
    };
  },
  methods: {
    asset(name: string) { return this.assetBase + "/" + name; },

    // --- 職務詳細アコーディオン ---
    roleKey(ci: number, ri: number) { return ci + "-" + ri; },
    isRoleOpen(ci: number, ri: number) { return !!this.openRoles[this.roleKey(ci, ri)]; },
    toggleRole(ci: number, ri: number) {
      const k = this.roleKey(ci, ri);
      this.openRoles = Object.assign({}, this.openRoles, { [k]: !this.openRoles[k] });
    },

    // --- media ブロック個別開閉 ---
    blockKey(ci: number, type: string) { return ci + "-" + type; },
    isBlockOpen(ci: number, type: string) { return !this.closedBlocks[this.blockKey(ci, type)]; },
    toggleBlock(ci: number, type: string) {
      const k = this.blockKey(ci, type);
      this.closedBlocks = Object.assign({}, this.closedBlocks, { [k]: !this.closedBlocks[k] });
    },

    // --- フィルター（一括折りたたみ / 展開） ---
    toggleFilter(key: string) {
      const val = !this.filters[key];
      this.filters = Object.assign({}, this.filters, { [key]: val });
      if (key === "jobs") {
        const next: Record<string, boolean> = {};
        this.history.forEach((co, ci) => co.roles.forEach((r, ri) => {
          if (r.items && r.items.length) next[this.roleKey(ci, ri)] = val;
        }));
        this.openRoles = next;
      } else {
        const next = Object.assign({}, this.closedBlocks);
        this.history.forEach((co, ci) => {
          (co.media || []).forEach((b) => {
            if (b.type === key) next[this.blockKey(ci, b.type)] = !val;
          });
        });
        this.closedBlocks = next;
      }
    }
  },
  mounted() {
    const c = this.$refs.container as HTMLElement | undefined;
    if (!c) return;
    let last = c.scrollTop;
    c.addEventListener("scroll", () => {
      const cur = c.scrollTop;
      this.isShowHeader = cur > 240 && cur < last;
      last = cur;
      // History 見出し〜Skill 見出しの間でフィルターパネル表示
      const h = this.$refs.historyEl as HTMLElement | undefined;
      const s = this.$refs.skillEl as HTMLElement | undefined;
      if (h) {
        const hRect = h.getBoundingClientRect();
        const sRect = s ? s.getBoundingClientRect() : { top: 99999 };
        this.showFilter = hRect.top < window.innerHeight * 0.8 && sRect.top > 100;
      }
    }, { passive: true });
  }
});
</script>

<template>
  <!-- HTML テンプレートが認識に不便なくらい（Opusで500行〜1000行)を越えるようなら分割 -->
  <div class="container" ref="container">
    <transition>
      <div v-if="isShowHeader" id="header-nav">
        <header>
          <a href="#top"><img :src="asset('RiinsWorkspace_logo.svg')" alt="Riin's Workspace"></a>
        </header>
        <nav>
          <ul>
            <li><a href="#top">HOME</a></li>
            <li><NuxtLink to="/">README</NuxtLink></li>
            <li><a href="#" class="dead-link" @click.prevent>CONTACT</a></li>
          </ul>
        </nav>
      </div>
    </transition>

    <div id="top" class="hero">
      <img class="hero__logo" :src="asset('RiinsWorkspace_logo.png')" alt="Riin's Workspace">
    </div>

    <main>
      <div id="content">

        <!-- ===== Profile ===== -->
        <h2 id="Profile" class="sec">Profile</h2>
        <section class="profile-head">
          <div class="identity">
            <h3 class="name">{{ name }}</h3>
            <p class="tagline">{{ tagline }}</p>
            <p class="career">{{ careerMessage }}</p>
            <nav class="links">
              <a :href="links.twitter" target="_blank" rel="noopener" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 35.7622C6.92886 36.8286 20.8914 44.8773 30.8199 38.674C40.7483 32.4707 40.2006 21.7833 40.2006 16.886C41.1 15.0018 43 14.0439 43 8.9438C41.1337 10.6678 39.2787 11.2544 37.435 10.7036C35.6287 7.94957 33.1435 6.73147 29.9794 7.04934C25.2333 7.52614 23.4969 12.1825 24.0079 18.2067C16.6899 21.9074 10.9515 15.524 7.99418 10.7036C7.00607 14.4999 6.0533 19.0576 7.99418 24.0995C9.2881 27.4607 12.3985 30.3024 17.3254 32.6246C12.3323 35.3308 8.22382 36.3766 5 35.7622Z" fill="#70C4EB" stroke="#70C4EB" stroke-width="4" stroke-linejoin="round"/></svg>
              </a>
              <a :href="links.github" target="_blank" rel="noopener" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#70C4EB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.1833 45.4716C18.9898 45.2219 18.9898 42.9973 19.1833 38.798C17.1114 38.8696 15.8024 38.7258 15.2563 38.3667C14.437 37.828 13.6169 36.1667 12.8891 34.9959C12.1614 33.8251 10.5463 33.64 9.89405 33.3783C9.24182 33.1165 9.07809 32.0496 11.6913 32.8565C14.3044 33.6634 14.4319 35.8607 15.2563 36.3745C16.0806 36.8883 18.0515 36.6635 18.9448 36.2519C19.8382 35.8403 19.7724 34.3078 19.9317 33.7007C20.1331 33.134 19.4233 33.0083 19.4077 33.0037C18.5355 33.0037 13.9539 32.0073 12.6955 27.5706C11.437 23.134 13.0581 20.2341 13.9229 18.9875C14.4995 18.1564 14.4485 16.3852 13.7699 13.6737C16.2335 13.3589 18.1347 14.1343 19.4734 16.0001C19.4747 16.0108 21.2285 14.9572 24.0003 14.9572C26.772 14.9572 27.7553 15.8154 28.5142 16.0001C29.2731 16.1848 29.88 12.7341 34.5668 13.6737C33.5883 15.5969 32.7689 18.0001 33.3943 18.9875C34.0198 19.9749 36.4745 23.1147 34.9666 27.5706C33.9614 30.5413 31.9853 32.3523 29.0384 33.0037C28.7005 33.1115 28.5315 33.2855 28.5315 33.5255C28.5315 33.8856 28.9884 33.9249 29.6465 35.6117C30.0853 36.7362 30.117 39.948 29.7416 45.247C28.7906 45.4891 28.0508 45.6516 27.5221 45.7347C26.5847 45.882 25.5669 45.9646 24.5669 45.9965C23.5669 46.0284 23.2196 46.0248 21.837 45.8961C20.9154 45.8103 20.0308 45.6688 19.1833 45.4716Z" fill="#70C4EB"/></svg>
              </a>
              <a class="link-text" :href="links.speakerdeck" target="_blank" rel="noopener">SpeakerDeck</a>
              <a class="link-text" :href="links.sponsors" target="_blank" rel="noopener">Sponsors</a>
            </nav>
          </div>
          <div class="avatar" :style="{ backgroundImage: 'url(' + asset('riin_avatar.png') + ')' }" role="img" :aria-label="name"></div>
        </section>

        <!-- 強み -->
        <div class="block">
          <h3 class="block__title">{{ strengths.heading }}</h3>
          <div class="group" v-for="(g, gi) in strengths.groups" :key="'s'+gi">
            <h4 class="group__label"><span class="emoji">{{ g.emoji }}</span>{{ g.label }}</h4>
            <TreeList :items="g.items" />
          </div>
        </div>

        <!-- 取扱説明書（別ページ） -->
        <div class="block">
          <NuxtLink class="block__title manual-link" to="/manual">取扱説明書 <span class="manual-link__arrow">→</span></NuxtLink>
        </div>

        <!-- ===== Works ===== -->
        <h2 id="Works" class="sec">Works</h2>
        <div class="block">
          <h3 class="block__title">OSS プロジェクト</h3>
          <ul class="cards">
            <li class="card" v-for="(o, oi) in works.oss" :key="oi">
              <a class="card__title" :href="o.url" target="_blank" rel="noopener">{{ o.title }}</a>
              <p class="card__desc">{{ o.desc }}</p>
            </li>
          </ul>
        </div>

        <section class="feature">
          <div class="maintext">
            <h3>{{ works.feature.title }}</h3>
            <p>{{ works.feature.desc }}</p>
          </div>
          <img :src="asset(works.feature.img)" :alt="works.feature.title">
        </section>

        <!-- 登壇（抜粋） -->
        <div class="block">
          <h3 class="block__title">登壇（39デッキ・抜粋）</h3>
          <ul class="entries">
            <li class="entry" v-for="(e, ei) in works.talks" :key="ei">
              <span class="entry__title">{{ e.title }}</span>
              <span class="entry__meta" v-if="e.meta && e.meta.length">
                <span class="meta" v-for="(m, mi) in e.meta" :key="mi">{{ m }}</span>
              </span>
              <p class="entry__note" v-if="e.note">{{ e.note }}</p>
            </li>
          </ul>
          <div class="entries__more-wrap">
            <a class="entries__more" :href="links.speakerdeck" target="_blank" rel="noopener">全39デッキを見る <span class="entries__more-arrow">→</span></a>
          </div>
        </div>

        <!-- 雑誌掲載 -->
        <div class="block">
          <h3 class="block__title">雑誌掲載</h3>
          <a class="magazine-card" v-for="(m, mi) in works.magazine" :key="mi" :href="m.url" target="_blank" rel="noopener">
            <img class="magazine-card__cover" :src="m.cover" :alt="m.title">
            <div class="magazine-card__body">
              <span class="magazine-card__title">{{ m.title }}</span>
              <span class="magazine-card__meta">
                <span class="meta" v-for="(mm, mmi) in m.meta" :key="mmi">{{ mm }}</span>
              </span>
              <p class="magazine-card__note" v-if="m.note">{{ m.note }}</p>
            </div>
            <img class="magazine-card__photo" v-if="m.photo" :src="asset(m.photo)" alt="">
          </a>
        </div>

        <!-- 過去のプロダクト -->
        <div class="block">
          <h3 class="block__title">過去のプロダクト</h3>
          <ul class="entries">
            <li class="entry" v-for="(p, pi) in works.products" :key="pi">
              <span class="entry__title">{{ p.title }}</span>
              <span class="entry__meta" v-if="p.meta && p.meta.length">
                <span class="meta" v-for="(m, mi) in p.meta" :key="mi">{{ m }}</span>
              </span>
            </li>
          </ul>
        </div>

        <!-- ===== History ===== -->
        <h2 id="History" class="sec" ref="historyEl">History</h2>
        <div class="timeline">
          <div class="company" v-for="(co, ci) in history" :key="'h'+ci">
            <h3 class="company__name">{{ co.company }}</h3>
            <div class="roles">
              <article class="role" v-for="(r, ri) in co.roles" :key="ri">
                <span class="role__period">{{ r.period }}</span>
                <h4 class="role__title" :class="{ clickable: r.items.length }" @click="r.items.length && toggleRole(ci, ri)">
                  <span>{{ r.title }}</span>
                  <span class="role__caret" v-if="r.items.length">{{ isRoleOpen(ci, ri) ? '−' : '+' }}</span>
                </h4>
                <p class="role__lead" v-if="r.lead">{{ r.lead }}</p>
                <transition>
                  <ul class="role__list" v-if="r.items.length && isRoleOpen(ci, ri)">
                    <li v-for="(x, xi) in r.items" :key="xi">{{ x }}</li>
                  </ul>
                </transition>
              </article>
            </div>

            <!-- この時期の登壇 / 記事 / 雑誌 -->
            <MediaBlock
              v-for="(b, bi) in (co.media || [])" :key="'b'+bi"
              :media="b"
              :open="isBlockOpen(ci, b.type)"
              @toggle="toggleBlock(ci, b.type)"
            />
          </div>
        </div>

        <!-- ===== Skill ===== -->
        <h2 id="Skill" class="sec" ref="skillEl">Skill</h2>
        <div class="skills">
          <div class="skillgroup">
            <h3 class="skillgroup__label">PROGRAMMING</h3>
            <ul class="chips"><li class="chip prog" v-for="(s, i) in skills.programming" :key="i">{{ s }}</li></ul>
          </div>
          <div class="skillgroup">
            <h3 class="skillgroup__label">AI / LLM</h3>
            <ul class="chips"><li class="chip ai" v-for="(s, i) in skills.ai" :key="i">{{ s }}</li></ul>
          </div>
          <div class="skillgroup">
            <h3 class="skillgroup__label">SOFT SKILLS</h3>
            <ul class="chips"><li class="chip soft" v-for="(s, i) in skills.soft" :key="i">{{ s }}</li></ul>
          </div>
          <div class="skillgroup">
            <h3 class="skillgroup__label">LANGUAGE</h3>
            <ul class="chips"><li class="chip lang" v-for="(s, i) in skills.language" :key="i">{{ s }}</li></ul>
          </div>
        </div>

      </div>
    </main>
    <footer>Riin's Workspace</footer>

    <!-- History フィルターパネル -->
    <transition>
      <div class="history-filter" v-show="showFilter">
        <div class="history-filter__title">FILTER</div>
        <label class="history-filter__row" :class="{ off: !filters.jobs }" @click="toggleFilter('jobs')">
          <span class="history-filter__toggle"></span><span class="history-filter__label">在職</span>
        </label>
        <label class="history-filter__row" :class="{ off: !filters.talks }" @click="toggleFilter('talks')">
          <span class="history-filter__toggle"></span><span class="history-filter__label">登壇</span>
        </label>
        <label class="history-filter__row" :class="{ off: !filters.articles }" @click="toggleFilter('articles')">
          <span class="history-filter__toggle"></span><span class="history-filter__label">ブログ</span>
        </label>
        <label class="history-filter__row" :class="{ off: !filters.magazine }" @click="toggleFilter('magazine')">
          <span class="history-filter__toggle"></span><span class="history-filter__label">雑誌</span>
        </label>
      </div>
    </transition>
  </div>
</template>

<style>
:root {
  --cyan: #28A7E1;
  --cyan-soft: #70C4EB;
  --cyan-pale: #CFEBF8;
  --cyan-bg: #E7F5FC;
  --coral: #EE7A59;
  --ink: #2E2E2E;
  --body: #555;
  --muted: #948F86;
  --card-bd: #ECE7DB;
  --paper: #FFFEF8;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { margin: 0; }
</style>

<style scoped>
.container {
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  font-size: 16px;
  line-height: 1.75;
  background: #FCFEFF;
  color: var(--body);
  overflow: auto;
  scroll-snap-type: y proximity;
  height: 100vh;
}

a { color: var(--cyan); text-decoration: none; transition: color .15s; }
a:hover { color: var(--coral); }
img { display: block; max-width: 100%; }
ul, ol { list-style: none; }

/* ===== sticky header ===== */
#header-nav {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 64px;
  background: rgba(207, 235, 248, .92);
  backdrop-filter: blur(8px);
  display: flex; justify-content: space-between; align-items: center;
  z-index: 50;
  box-shadow: 0 2px 14px rgba(40, 167, 225, .12);
}
#header-nav header { margin-left: 2.4rem; display: flex; align-items: center; }
#header-nav header img { height: 38px; width: auto; }
#header-nav nav { margin-right: 2rem; }
#header-nav nav ul { display: flex; gap: .3rem; }
#header-nav nav li {
  list-style: none; font-weight: 700; color: #fff;
  padding: .5rem 1.1rem; border-radius: 8px;
  transition: .15s all ease-in-out;
}
#header-nav nav a { color: #fff; }
#header-nav nav li:hover { background: rgba(255, 255, 255, .55); color: var(--coral); }
#header-nav nav .dead-link {
  color: rgba(255, 255, 255, .4); cursor: not-allowed;
  text-decoration: line-through; text-decoration-thickness: 1.5px;
}
#header-nav nav li:has(.dead-link):hover { background: none; }

/* ===== hero ===== */
.hero {
  height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background:
    radial-gradient(circle at 50% 38%, rgba(112, 196, 235, .12), transparent 60%),
    #FCFEFF;
}
.hero__logo { max-height: 184px; max-width: calc(100% - 2rem); width: auto; height: auto; }

/* ===== main shell ===== */
main {
  background: var(--paper);
  box-shadow: 0 0 40px rgba(0, 0, 0, .08);
  margin-top: 24px;
  padding: 2.5rem 0 0;
}
#content { max-width: 880px; margin: 0 auto; padding: 1rem 1.6rem 3rem; }

/* ===== section heading ===== */
h2.sec {
  scroll-snap-align: start;
  width: max-content; max-width: 100%;
  font-size: 2rem; font-weight: 800; color: var(--ink);
  text-decoration: underline;
  text-decoration-thickness: .4em;
  text-decoration-color: rgba(112, 196, 235, .5);
  text-underline-offset: -.08em;
  text-decoration-skip-ink: none;
  margin: 4.5rem 0 1.8rem;
}
h2.sec:first-of-type { margin-top: 1rem; }

/* ===== profile identity ===== */
.profile-head {
  display: flex; justify-content: space-between; align-items: center;
  gap: 2rem; margin-bottom: 2.5rem;
}
.identity { flex: 1; }
.identity .name { font-size: 2rem; font-weight: 800; color: var(--ink); line-height: 1.2; }
.identity .tagline {
  color: var(--coral); font-weight: 700; margin-top: .5rem; font-size: 1.05rem;
  line-height: 1.6;
}
.identity .career {
  color: var(--muted); font-size: .92rem; margin-top: .6rem;
  padding-left: .9rem; border-left: 3px solid var(--cyan-pale);
}
.identity .links { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem .9rem; margin-top: 1rem; }
.identity .links svg path { fill: var(--cyan-soft); stroke: var(--cyan-soft); transition: .15s; }
.identity .links a:hover svg path { fill: var(--coral); stroke: var(--coral); }
.identity .link-text { font-size: .85rem; font-weight: 700; }
.avatar {
  width: 150px; height: 150px; border-radius: 50%; flex: none;
  background-repeat: no-repeat;
  background-size: 175px auto;
  background-position: -30% 0%;
  box-shadow: 0 8px 24px rgba(40, 167, 225, .2);
}

/* ===== content block ===== */
.block { margin-bottom: 2.4rem; }
.block__title {
  position: relative; display: inline-block;
  font-size: 1.18rem; font-weight: 800; color: var(--ink);
  background: var(--cyan-bg); border-radius: 999px;
  padding: .3rem 1.1rem; margin-bottom: 1.1rem;
}
.manual-link { text-decoration: none; transition: .15s; }
.manual-link:hover { color: var(--coral); background: var(--cyan-pale); }
.manual-link__arrow { font-size: .85em; }

/* group (強み) */
.group { margin-bottom: 1.6rem; }
.group__label {
  display: flex; align-items: center; gap: .5rem;
  font-size: 1.12rem; font-weight: 800; color: var(--ink); margin-bottom: .6rem;
}
.group__label .emoji { font-size: 1.2rem; line-height: 1; }


/* ===== works ===== */
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }
.card {
  background: #fff; border: 1px solid var(--card-bd); border-radius: 12px;
  padding: 1rem 1.15rem; box-shadow: 0 1px 3px rgba(0, 0, 0, .04); transition: .16s;
}
.card:hover { border-color: var(--cyan-soft); box-shadow: 0 6px 18px rgba(40, 167, 225, .12); transform: translateY(-2px); }
.card__title { display: block; font-weight: 800; font-size: 1.02rem; }
.card__desc { color: var(--body); font-size: .9rem; margin-top: .25rem; }

.feature {
  display: flex; align-items: center; gap: 2rem;
  background: #fff; border: 1px solid var(--card-bd); border-radius: 14px;
  padding: 1.4rem; margin-bottom: 2.4rem; box-shadow: 0 2px 10px rgba(0, 0, 0, .05);
}
.feature .maintext { flex: 1; }
.feature .maintext h3 { font-size: 1.4rem; font-weight: 800; color: var(--ink); margin-bottom: .3rem; }
.feature img { width: 300px; border-radius: 10px; box-shadow: 0 4px 14px rgba(0, 0, 0, .1); }

.entries { display: flex; flex-direction: column; gap: .6rem; }
.entry {
  background: #fff; border: 1px solid var(--card-bd); border-radius: 10px;
  padding: .75rem 1.1rem; box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}
.entry__title { display: block; font-weight: 700; color: var(--ink); }
.entry__meta { display: flex; flex-wrap: wrap; gap: .35rem .6rem; margin-top: .3rem; }
.entry__meta .meta {
  font-size: .76rem; font-weight: 700; color: var(--cyan);
  background: var(--cyan-bg); border-radius: 6px; padding: .1em .6em;
}
.entry__note {
  margin-top: .5rem; padding-left: .8rem; border-left: 3px solid var(--cyan-pale);
  font-size: .85rem; line-height: 1.65; color: var(--muted);
}
.entries__more-wrap { text-align: right; margin-top: .7rem; }
.entries__more {
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .9rem; font-weight: 700; color: var(--cyan);
}
.entries__more-arrow { transition: transform .15s; }
.entries__more:hover { color: var(--coral); }
.entries__more:hover .entries__more-arrow { transform: translateX(3px); }

/* magazine cards */
.magazine-card {
  display: flex; gap: 1.1rem; align-items: flex-start;
  background: #fff; border: 1px solid var(--card-bd); border-radius: 12px;
  padding: 1rem 1.15rem; box-shadow: 0 1px 3px rgba(0,0,0,.04); transition: .16s;
}
.magazine-card:hover { border-color: var(--cyan-soft); box-shadow: 0 6px 18px rgba(40, 167, 225, .12); transform: translateY(-2px); }
.magazine-card + .magazine-card { margin-top: .7rem; }
.magazine-card__cover { width: 80px; flex: none; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
.magazine-card__photo {
  width: 120px; flex: none; border-radius: 4px;
  box-shadow: 2px 4px 12px rgba(0,0,0,.15);
  transform: perspective(600px) rotateY(6deg); object-fit: cover;
}
.magazine-card__body { flex: 1; min-width: 0; }
.magazine-card__title { display: block; font-weight: 700; color: var(--ink); font-size: .95rem; line-height: 1.5; }
.magazine-card__meta { display: flex; flex-wrap: wrap; gap: .35rem .6rem; margin-top: .3rem; }
.magazine-card__meta .meta {
  font-size: .76rem; font-weight: 700; color: var(--cyan);
  background: var(--cyan-bg); border-radius: 6px; padding: .1em .6em;
}
.magazine-card__note { margin-top: .4rem; font-size: .85rem; line-height: 1.65; color: var(--muted); }

/* ===== history timeline ===== */
.timeline { border-left: 3px solid var(--cyan-pale); margin-left: .5rem; padding-left: 2.1rem; }
.company { position: relative; }
.company + .company { margin-top: 2.6rem; }
.company__name {
  position: relative; font-size: 1.3rem; font-weight: 800; color: var(--ink); margin-bottom: 1rem;
}
.company__name::before {
  content: ""; position: absolute; left: -2.72rem; top: .25em;
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--paper); border: 4px solid var(--cyan-soft);
}
.company__name::after {
  content: ""; display: block; width: 2.4rem; height: 5px; border-radius: 3px;
  background: var(--coral); margin-top: .35em;
}
.roles { display: flex; flex-direction: column; gap: 1rem; }
.role {
  background: #fff; border: 1px solid var(--card-bd); border-radius: 12px;
  padding: 1rem 1.25rem; box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}
.role__period { display: inline-block; font-size: .8rem; font-weight: 800; color: var(--coral); margin-bottom: .2rem; }
.role__title {
  font-size: 1.05rem; font-weight: 800; color: var(--ink); line-height: 1.5;
  display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;
}
.role__title.clickable { cursor: pointer; }
.role__title.clickable:hover { color: var(--cyan); }
.role__caret {
  flex: none; width: 26px; height: 26px; border-radius: 50%;
  background: var(--cyan-bg); color: var(--cyan);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 700; line-height: 1;
}
.role__lead { color: var(--body); font-size: .92rem; margin-top: .45rem; }
.role__list {
  display: flex; flex-direction: column; gap: .4rem;
  margin-top: .7rem; padding-top: .7rem; border-top: 1px dashed var(--card-bd);
}
.role__list li { position: relative; padding-left: 1.3rem; font-size: .89rem; color: var(--body); }
.role__list li::before {
  content: ""; position: absolute; left: .15rem; top: .6em;
  width: 7px; height: 7px; border-radius: 50%; background: var(--cyan-soft);
}


/* ===== History filter panel ===== */
.history-filter {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  background: rgba(255, 254, 248, .95);
  backdrop-filter: blur(8px);
  border: 1px solid var(--card-bd); border-radius: 14px;
  padding: .9rem 1.1rem; z-index: 60;
  box-shadow: 0 8px 28px rgba(0, 0, 0, .14);
  display: flex; flex-direction: column; gap: .55rem;
}
.history-filter__title { font-size: .7rem; font-weight: 800; letter-spacing: .06em; color: var(--muted); margin-bottom: .1rem; }
.history-filter__row {
  display: flex; align-items: center; gap: .5rem;
  cursor: pointer; user-select: none;
  font-size: .88rem; font-weight: 700; color: var(--ink);
  transition: color .15s;
}
.history-filter__row:hover { color: var(--cyan); }
.history-filter__toggle {
  position: relative; width: 34px; height: 20px; flex: none;
  background: var(--cyan-soft); border-radius: 10px; transition: background .2s;
}
.history-filter__toggle::after {
  content: ""; position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px; border-radius: 50%; background: #fff;
  transition: transform .2s;
}
.history-filter__row.off .history-filter__toggle { background: #d4d0c8; }
.history-filter__row.off .history-filter__toggle::after { transform: translateX(14px); }
.history-filter__row.off .history-filter__label { color: var(--muted); text-decoration: line-through; }

/* ===== skills ===== */
.skills { display: flex; flex-wrap: wrap; gap: 2rem 3rem; }
.skillgroup { min-width: 180px; }
.skillgroup__label { font-size: .78rem; font-weight: 800; letter-spacing: .08em; color: var(--muted); margin-bottom: .7rem; }
.chips { display: flex; flex-wrap: wrap; gap: .55rem; }
.chip {
  font-weight: 700; color: var(--ink); background: #fff;
  border: 1px solid var(--cyan-pale); border-left: 6px solid var(--cyan-soft);
  border-radius: 0 999px 999px 0; padding: .38rem 1rem; font-size: .92rem;
}
.chip.prog { border-left-color: var(--cyan-soft); }
.chip.ai { border-color: #E8D5F0; border-left-color: #9B59B6; }
.chip.soft { border-color: #D5F0DE; border-left-color: #27AE60; }
.chip.lang { border-color: #F7DACF; border-left-color: var(--coral); }

/* ===== footer ===== */
footer {
  background: var(--cyan-soft); color: var(--paper);
  text-align: center; padding: 1rem; margin-top: 2rem; font-weight: 700;
}

/* transitions */
.v-enter-active, .v-leave-active { transition: opacity .35s ease; }
.v-enter-from, .v-leave-to { opacity: 0; }

/* responsive */
@media (max-width: 720px) {
  .profile-head { flex-direction: column-reverse; align-items: flex-start; }
  .cards { grid-template-columns: 1fr; }
  .feature { flex-direction: column; }
  .feature img { width: 100%; }
  #header-nav header { margin-left: 1.2rem; }
  #header-nav nav { margin-right: .8rem; }
  #header-nav nav li { padding: .5rem .7rem; }
}
@media (max-width: 480px) {
  .history-filter { bottom: 1rem; right: .75rem; padding: .6rem .8rem; }
  .history-filter__row { font-size: .8rem; }
}
</style>
