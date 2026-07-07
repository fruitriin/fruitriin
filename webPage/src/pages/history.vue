<script lang="ts">
// History — Riin's Workspace の個別ページ
// 在職をベースに、各時期の登壇 / ブログ / 雑誌を media にぶら下げる。トップページにはダイジェストのみ置く。
export default defineComponent({
  data() {
    return {
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
      // 開いている職務詳細（"ci-ri"）。直近2社の在職は最初から開く
      openRoles: { "1-0": true, "3-0": true } as Record<string, boolean>,
      // 折りたたまれた media ブロック（"ci-type" → true で閉）
      closedBlocks: {} as Record<string, boolean>,
      // フィルター状態
      filters: { jobs: true, talks: true, articles: true, magazine: true } as Record<string, boolean>
    };
  },
  methods: {
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
  }
});
</script>

<template>
  <div class="container">
    <main>
      <div id="content">
        <NuxtLink class="back-link" to="/"><span class="arrow">←</span> Profile に戻る</NuxtLink>
        <h2 class="page-title">History</h2>

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
      </div>
    </main>
    <footer>Riin's Workspace</footer>

    <!-- フィルターパネル -->
    <div class="history-filter">
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
  font-size: 16px; line-height: 1.75;
  background: var(--paper); color: var(--body);
  min-height: 100vh;
}
a { color: var(--cyan); text-decoration: none; transition: color .15s; }
a:hover { color: var(--coral); }
ul { list-style: none; }

main { background: var(--paper); }
#content { max-width: 880px; margin: 0 auto; padding: 3rem 1.6rem; }

.back-link {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .9rem; font-weight: 700; margin-bottom: 1.5rem;
}
.back-link .arrow { transition: transform .15s; }
.back-link:hover .arrow { transform: translateX(-3px); }
.page-title {
  font-size: 2rem; font-weight: 800; color: var(--ink);
  text-decoration: underline; text-decoration-thickness: .4em;
  text-decoration-color: rgba(112, 196, 235, .5);
  text-underline-offset: -.08em; text-decoration-skip-ink: none;
  margin-bottom: 2rem;
}

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

/* ===== filter panel ===== */
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

footer {
  background: var(--cyan-soft); color: var(--paper);
  text-align: center; padding: 1rem; font-weight: 700;
}

/* transitions */
.v-enter-active, .v-leave-active { transition: opacity .35s ease; }
.v-enter-from, .v-leave-to { opacity: 0; }

/* responsive */
@media (max-width: 480px) {
  .history-filter { bottom: 1rem; right: .75rem; padding: .6rem .8rem; }
  .history-filter__row { font-size: .8rem; }
}
</style>
