<script>

export default {
    data(){
        return {
            isShowHeader: false
        }
    },
    mounted(){

        let lastKnownScrollPosition = window.scrollY;
        window.addEventListener("scroll", (event) => {
            if(lastKnownScrollPosition < window.scrollY){
                this.isShowHeader = false
            }else {
                this.isShowHeader = true
            }
            lastKnownScrollPosition = window.scrollY;
            
        }, false);
    }
    
}

</script>


<template>
    <div class="container">
    <transition>
        <div v-if="isShowHeader" id="header-nav" style="position: sticky; top: 0;">
            <header>
                <h1>
                    <!-- logo image -->
                    <a href="./"><img src="/static/RiinsWorkspace_logo.svg" alt="logo"></a>
                </h1>
            </header>
            <nav>
                <ul>
                    <a href="#Profile"><li>Profile</li></a>
                    <a href="#Works"><li>Works</li></a>
                    <a href="#History"><li>History</li></a>
                    <a href="#Skill"><li>Skill</li></a>
                </ul>
            </nav>
        </div>
    </transition>
    <div style="scroll-snap-type: y proximity">

        <div id="top-image">
            <img src="/static/RiinsWorkspace_logo.png">
        </div>
    </div>

    <main>
        <div id="content">
            <h2 id="Profile">Profile</h2>
            <section>
                <div class="maintext">
                    <h3>果物リン(Fruitriin)</h3>
                    <div class="moretext">
                        <p>Vueが好きな人</p>
                        <p>
                            <a href="https://twitter.com/FruitRiin" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 35.7622C6.92886 36.8286 20.8914 44.8773 30.8199 38.674C40.7483 32.4707 40.2006 21.7833 40.2006 16.886C41.1 15.0018 43 14.0439 43 8.9438C41.1337 10.6678 39.2787 11.2544 37.435 10.7036C35.6287 7.94957 33.1435 6.73147 29.9794 7.04934C25.2333 7.52614 23.4969 12.1825 24.0079 18.2067C16.6899 21.9074 10.9515 15.524 7.99418 10.7036C7.00607 14.4999 6.0533 19.0576 7.99418 24.0995C9.2881 27.4607 12.3985 30.3024 17.3254 32.6246C12.3323 35.3308 8.22382 36.3766 5 35.7622Z" fill="#70C4EB" stroke="#70C4EB" stroke-width="4" stroke-linejoin="round"/></svg>
                            </a>
                            <a href="https://github.com/fruitriin/" target="_blank">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#70C4EB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.1833 45.4716C18.9898 45.2219 18.9898 42.9973 19.1833 38.798C17.1114 38.8696 15.8024 38.7258 15.2563 38.3667C14.437 37.828 13.6169 36.1667 12.8891 34.9959C12.1614 33.8251 10.5463 33.64 9.89405 33.3783C9.24182 33.1165 9.07809 32.0496 11.6913 32.8565C14.3044 33.6634 14.4319 35.8607 15.2563 36.3745C16.0806 36.8883 18.0515 36.6635 18.9448 36.2519C19.8382 35.8403 19.7724 34.3078 19.9317 33.7007C20.1331 33.134 19.4233 33.0083 19.4077 33.0037C18.5355 33.0037 13.9539 32.0073 12.6955 27.5706C11.437 23.134 13.0581 20.2341 13.9229 18.9875C14.4995 18.1564 14.4485 16.3852 13.7699 13.6737C16.2335 13.3589 18.1347 14.1343 19.4734 16.0001C19.4747 16.0108 21.2285 14.9572 24.0003 14.9572C26.772 14.9572 27.7553 15.8154 28.5142 16.0001C29.2731 16.1848 29.88 12.7341 34.5668 13.6737C33.5883 15.5969 32.7689 18.0001 33.3943 18.9875C34.0198 19.9749 36.4745 23.1147 34.9666 27.5706C33.9614 30.5413 31.9853 32.3523 29.0384 33.0037C28.7005 33.1115 28.5315 33.2855 28.5315 33.5255C28.5315 33.8856 28.9884 33.9249 29.6465 35.6117C30.0853 36.7362 30.117 39.948 29.7416 45.247C28.7906 45.4891 28.0508 45.6516 27.5221 45.7347C26.5847 45.882 25.5669 45.9646 24.5669 45.9965C23.5669 46.0284 23.2196 46.0248 21.837 45.8961C20.9154 45.8103 20.0308 45.6688 19.1833 45.4716Z" fill="#70C4EB"/></svg>
                            </a>
                        </p>
                        <p>
                            <pre>
                            仕事への取り組み方
楽しく仕事ができることが一番
Vueで程よくインタラクティブなフロントエンドを書いていくのが好き
開発体験を良くするのも結構好き
🙅 Reactお断り
Vueが好きなんです
Reactもやればできるんだろうけどあえてやろうというモチベーションは今の所ありません
🤔 仕事における楽しいってなんだ？
ある程度以上複雑なプログラムのロジックを自分で考えたり書いている最中や、うまく動いた瞬間
感謝の言葉やいい意味での驚きの言葉を直接もらったとき（社内・エンドユーザー問わず）
（スケジュールに追われてる場合）チームで最大の成果を出すにはどうするか？を考えるのもちょっと好き
💪 強み
集中し始めると長く続く
（非エンジニアにもわかるような）見栄えがする派手なプログラムを書くのが好き
立場の異なる人とディスカッションでいい感じにするのが割と得意？
人前に出て話すのが得意
相手によって話す内容を変えていき納得してもらうのも得意
好きなものを推していくのが好き
面倒見良く他の人に教えるのが上手らしい
よく登壇している
1 -> 10 につよそう
スプリントレビューのようなデモに強い
気持ちのいいUXを作りたい、そのためなら自分から動く
💔 弱み
調子（体調・精神）が安定しないことがある
およそ3ヶ月周期で具合が悪い時期がくるような気がする？
ライブラリのような下支えするプログラムを自分で書きたいというモチベーションや必要性に気づくことがあまりない
手動テストのような作業が苦手
本当に向いてない
デグレ起きがち
8時間勤務が長いと感じることが多い
朝弱い
朝整理したタスクが終わってしまう
明日でいいことは明日やる精神
実は売上そのものにはあまり興味がない
なんかごめんなさい
0 -> 1 で作るものは決まっててあとは難しい挑戦要素はなにもないとかだと退屈。マークアップエンジニアじゃないよ。
</pre>

                        </p>
                    </div>
                </div>
                <div style="object-fit: contain;">
                    <img src="/static/riin_avatar.png">
                </div>

            </section>

            <h2 id="Works">Works</h2>
            <section>
                <div>
                    <div class="maintext">
                        <h3>Taskbar.fm</h3>
                        <div class="moretext">
                            <p>Macにタスクバーをつけます（Windowsのような！）</p>
                        </div>
                    </div>
                <div>
                    
                    <pre>
                    ⭐ 業務外活動
⚙️ フリーソフト
TweetLightning - シュッと投稿できるTwitterクライアント
Win, Mac (Electron, Vue)
📖 雑誌掲載
ステップアップ式 Vue.js講座
Software Design 2020年9月号
🎥 登壇
あえてPHPerにすすめるVue.js入門 (30min)
PHPカンファレンス関西2018
Vue.js ハンズオン (90min)
Vue.js ハンズオン! nakameguro.php #03 - connpass
LT・登壇でマサカリに備えるたった一つの心得
PHPerKaigi2019
Vueでネイティブアプリを作る-Ionic_Vueの紹介
Ginza.js#2 - connpass
その他、LT複数</pre></div>
                </div>
                
                <div style="object-fit: contain;">
                <img src="/static/Taskbar_fm_README.png">
                </div>
            </section>

            <h2 id="History">History</h2>
            <section>
                <div class="maintext">
                    <p>
                        <pre>
                        🏢 実務経歴
株式会社スタディスト
toB SaaS ビジュアルマニュアルプラットフォーム開発(2021/10〜）
サービスの信頼性向上ということで、細かな改善を積み重ねるチームに配属
UIUX周りの改善を中心に小さな改善を積み重ねた
ドラッグアンドドロップAPIを使ったやや複雑で大きな機能改善を行った
その際に、Vue2系にComposition APIをチーム開発で取り入れた
その後、チーム改変で３ヶ月単位の大きな機能開発へシフト
この際のフロントエンド開発のコンセプト実装など中核を担う
canvasを使ったやや複雑なものだった
チームメンバーのフロントエンド技術レベル向上のために黙読会を開催
その場でフロントエンドの疑問を答えられるだけ答える（わからなければその場で議論する）を実施
チーム開発のプロセスについて積極的に疑問をぶつけたり改善を提案したりした
小さな改善を行うチームがなくなってしまったので、個人的な活動として他のディレクターやデザイナーを巻き込んで動き出した
toB SaaS 販売促進プラットフォーム開発(2020/07〜2021/10）
バックエンドのRailsとフロントエンドのVueでWebアプリケーションを開発していました。

プロジェクトの立ち上げ時期の途中から参加。開発エンジニアは3〜4人のチーム
フロントエンドに強い人という強みを活かすことを期待されてアサイン、能力を発揮
2020/11 にローンチ
開発環境の改善に継続的に取り組む。Storybookを利用した画像回帰テストなど
Railsについても十分書ける感触を掴む
開発の優先順位の付け方として売上が最上位といってもいいくらいなことを学ぶ
リーダーがPdM的な立場にシフトしていくにつれ、徐々にプロジェクトの開発を牽引していくことを期待されている
Capacitorを使ってガワネイティブアプリの作成を牽引。事前調査から初回のアプリ作成までを担当。（ローンチ周りはリーダーにおまかせ）
後にPush通知機能を提供する下地になった
toB SaaS ビジュアルマニュアルプラットフォーム開発(2020/02〜2020/06）
バックエンドRailsとフロントエンドVueでマニュアルの作成・活用するWebアプリケーションを開発していました。

サービスの安定期にフロント（Vue）強い人としてスタディストへジョイン
フロントエンドのちょっとした工夫で体験がよくなるような修正を中心にUX周りを改善
RubyとRailsを業務で使うのはスタディスト入社が初だがなんとかキャッチアップしつつUX改善にも必要なバックエンドの回収にも取り組む
株式会社ゆめみ
フルSPAニュースサイト構築(2019/02〜2019/12)
APIからのレスポンスをもとにニュースを表示するサイトを構築しました。

Vue.js(Nuxt.js)を利用
2019/04 からリーダーを任され、クライアントとの交渉やプロジェクトの進行管理を兼任
経験が浅いチームメンバーが多い中でレビューやペアプロを通して実力アップに貢献
受託という仕事形態から生じるコミュニケーションロスを減らそうと尽力
クリティカルパス的にフロントエンドの実装が後半になりがちで、作業時間が短くなりがちなのが大変だった
タスクを分解してチームメンバー全員で解決しようという雰囲気作りをした
株式会社ORATTA
ソーシャルゲーム(ネイティブ) サーバーサイド開発/運用 (2018/08〜2018/12)
社内で人手が足りない！ということでもう一つのプロジェクトも担当することになりました。

PHP（自社製フレームワーク）によるサーバーサイドAPI実装
バグ修正や要望チケットの対応
公式ホームページの事前登録ページの作成
社内ツールの機能追加・改良
ソーシャルゲーム（ブラウザ）開発/設計/運用/保守 (2017/09〜2018/10)
サーバーアプリケーションエンジニアとしてプロジェクトを１つ�担当しました。

アサイン当時、リリースから2年半のプロジェクトの引き継ぎ
PHP（自社製フレームワーク）によるサーバーサイド実装
ブラウザタイトルなので、HTML/CSS/JavaScript実装も多少
既存機能の改良、バグ修正
新規施策を受けての設計、開発
施策リリース時のサーバー監視、不具合発生時やオペミス時のデータ補正
Rollbarというエラーログ監視ツールの導入、横展開用ドキュメントの作成
半期に1回の社内MVP投票で、テック部門の準MVPをいただきました！
2015/06〜2017/08 株式会社ITPM（SES)
ECサイト機能追加/改修(2016/06〜2017/08)
Webアプリケーションエンジニアとしてポータルサイト(Zend Frameworkベース）の機能追加を行っており、
時々に応じてサーバーサイド実装からフロントエンド実装までを行っていました。

HTMLでできたモックと要件をもとに実装を行う
SP版検索画面リニューアルの実装担当、高機能化・高速化を実施
ECサイトの機能追加・改修(2015/12〜2016/05)
PCのBTOショップの機能追加・改修の詳細設計、
実装、総合試験を受託しており、それら一連の業務を担当しました。

受け取った基本設計・画面イメージを元に、処理設計などを行う
作成した処理設計書を元に実装
テストケースの作成、実施
会社案内サイト作成(2015/06〜2015/11)
受託業務にて、会社案内ホームページのリニューアルのコーディングを担当
</pre>
                    </p>
                </div>
            </section>
            
            <h2 id="Skill">Skill</h2>
            <section>
                <div class="maintext">
                    <h3>言語</h3>
                    <div class="moretext">
                        <ul>
                            <li>JavaScript</li>
                            <li>Vue.js</li>
                            <li>TypeScript</li>
                            <li>Ruby</li>
                            <li>PHP</li>
                            <li>日本語</li>
                            <li>英語</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </main>
    <footer>
        Riin's Workspace
    </footer>
</div>
</template>

<style>
body {
    margin: 0;
}
</style>



<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#about {
  margin: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
font-size: 16px;
text-align: 1.75rem;
background: #FCFEFF;
color: #707070;
}

/* リンク色あとで考える */
a{
    color: #28A7E1;
    text-decoration: none;
}
a:hover{
    color: #EE7A59;
}
/* 見出し */
h1{
    font-size: 2rem;
}
h2{
    font-size: 1.75rem;
    text-decoration: underline;
    text-decoration-thickness: 0.4em;
    text-decoration-color: rgba(112, 196, 235, .5);
    text-underline-offset: -0.1em;
    text-decoration-skip-ink: none;
    padding: 0.25em 0;
}
h3{
    font-size: 1.5rem;
}

/* へっだー */
#header-nav{
    color: #FCFEFF;
    background-color: #CFEBF8;
    width: 100%;
    height: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

header{
    margin-left: 3em;
}
header img{
    height: 70px;
}
/* menu */
nav{
    text-align: right;
    margin-right: 3em;
    font-weight: bold;
}
nav ul{
    display: flex;
}
nav li{
    list-style: none;
    padding: 1rem 1.5rem;
	transition: 0.2s all ease-in-out;
}
/* ホバー時のアクション */
nav li:hover{
    background-color: rgba(252, 254, 255, .5);
    color: #EE7A59;
}
/* ホバー時の色ここまで */
#top-image{
    display: flex;
    justify-content: center;
    height: 100vh;
}
#top-image img{
    margin: auto;
    height: 200px;
    width: auto;
}

/* メイン */
main{
     background-color: #FFFEF8;
     box-shadow: 0 0 32px rgba(0, 0, 0, .1);
     margin-top: 32px;
     padding-top: 3rem;
}
#content{
    max-width: 1024px;
    margin: 0 auto;
    padding: 1em;
}
section{
    margin: 1rem 0; 
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.maintext{ 
    max-width: 650px;
}
.moretext{
    padding: 0.5rem 0;
}
main img{
    width: 300px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, .1);
}

main ul, ol {
    padding: 0;
    position: relative;
  }
  
main ul li, ol li {
    width: 15rem;
    color: #707070;
    border-left: solid 8px #70C4EB;/*左側の線*/
    background: whitesmoke;
    margin-bottom: 5px;/*下のバーとの余白*/
    line-height: 1.5;
    border-radius: 0 15px 15px 0;/*右側の角だけ丸く*/
    padding: 0.5em;
    list-style-type: none!important;
  }

/* フッター */
footer{
    background-color: #70C4EB;
    color: #FCFEFF;
    text-align: center;
}
</style>