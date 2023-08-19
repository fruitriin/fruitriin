<script>

export default {
    data(){
        return {
            isShowHeader: false,
            histories: [
                {
                    name: "株式会社スタディスト",
                    projects: [
                        {
                            isShow: false,
                        },
                        {
                            isShow: false,
                        },
                        {
                            isShow: false,
                        }
                    ]
                }
                    
                
            ]
        }
    },
    mounted(){

        let lastKnownScrollPosition = this.$refs.container.scrollTop;
        this.$refs.container.addEventListener("scroll", (event) => {
            console.log(this.$refs.container)
            if(lastKnownScrollPosition < this.$refs.container.scrollTop){
                this.isShowHeader = false
            }else {
                this.isShowHeader = true
            }
            lastKnownScrollPosition = this.$refs.container.scrollTop;
            
        }, false);
    },    
}

</script>


<template>
    <div class="container" ref="container">
        <transition>
            <div v-if="isShowHeader" id="header-nav" style="position: fixed; top: 0;">
                <header>
                    <h1>
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
        <div style="  scroll-snap-align: start; height: 100vh;">
            <div id="top-image">
                <img src="/static/RiinsWorkspace_logo.png">
            </div>
        </div>

        <main>
            <div id="content" >
                <h2 id="Profile" style="scroll-snap-align: start;">Profile</h2>
                <section>
                    <div class="maintext">
                        <h3>果物リン(Fruitriin)</h3>
                        <div>
                            <p>Vueがとても好きな人</p>
                            <p>
                                <a href="https://twitter.com/FruitRiin" target="_blank">
                                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 35.7622C6.92886 36.8286 20.8914 44.8773 30.8199 38.674C40.7483 32.4707 40.2006 21.7833 40.2006 16.886C41.1 15.0018 43 14.0439 43 8.9438C41.1337 10.6678 39.2787 11.2544 37.435 10.7036C35.6287 7.94957 33.1435 6.73147 29.9794 7.04934C25.2333 7.52614 23.4969 12.1825 24.0079 18.2067C16.6899 21.9074 10.9515 15.524 7.99418 10.7036C7.00607 14.4999 6.0533 19.0576 7.99418 24.0995C9.2881 27.4607 12.3985 30.3024 17.3254 32.6246C12.3323 35.3308 8.22382 36.3766 5 35.7622Z" fill="#70C4EB" stroke="#70C4EB" stroke-width="4" stroke-linejoin="round"/></svg>
                                </a>
                                <a href="https://github.com/fruitriin/" target="_blank">
                                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#70C4EB"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.1833 45.4716C18.9898 45.2219 18.9898 42.9973 19.1833 38.798C17.1114 38.8696 15.8024 38.7258 15.2563 38.3667C14.437 37.828 13.6169 36.1667 12.8891 34.9959C12.1614 33.8251 10.5463 33.64 9.89405 33.3783C9.24182 33.1165 9.07809 32.0496 11.6913 32.8565C14.3044 33.6634 14.4319 35.8607 15.2563 36.3745C16.0806 36.8883 18.0515 36.6635 18.9448 36.2519C19.8382 35.8403 19.7724 34.3078 19.9317 33.7007C20.1331 33.134 19.4233 33.0083 19.4077 33.0037C18.5355 33.0037 13.9539 32.0073 12.6955 27.5706C11.437 23.134 13.0581 20.2341 13.9229 18.9875C14.4995 18.1564 14.4485 16.3852 13.7699 13.6737C16.2335 13.3589 18.1347 14.1343 19.4734 16.0001C19.4747 16.0108 21.2285 14.9572 24.0003 14.9572C26.772 14.9572 27.7553 15.8154 28.5142 16.0001C29.2731 16.1848 29.88 12.7341 34.5668 13.6737C33.5883 15.5969 32.7689 18.0001 33.3943 18.9875C34.0198 19.9749 36.4745 23.1147 34.9666 27.5706C33.9614 30.5413 31.9853 32.3523 29.0384 33.0037C28.7005 33.1115 28.5315 33.2855 28.5315 33.5255C28.5315 33.8856 28.9884 33.9249 29.6465 35.6117C30.0853 36.7362 30.117 39.948 29.7416 45.247C28.7906 45.4891 28.0508 45.6516 27.5221 45.7347C26.5847 45.882 25.5669 45.9646 24.5669 45.9965C23.5669 46.0284 23.2196 46.0248 21.837 45.8961C20.9154 45.8103 20.0308 45.6688 19.1833 45.4716Z" fill="#70C4EB"/></svg>
                                </a>
                            </p>

                            <h4><span style="font-size: 1.5rem;">🚶 仕事への取り組み方</span></h4>
                            <ul>
                                <li>楽しく仕事ができることが一番</li>
                                <li>Vueで程よくインタラクティブなフロントエンドを書いていくのが好き</li>
                                <li>開発体験を良くするのも結構好き</li>
                            </ul>
                            <h5><span style="font-size: 1.25rem;">🙅 Reactお断り</span></h5>
                            <ul>
                                <li>Vueが好きなんです</li>
                                <li>Reactもやればできるんだろうけどあえてやろうというモチベーションは今の所ありません</li>
                            </ul>
                            <h5><span style="font-size: 1.25rem;">🤔 仕事における楽しいってなんだ？</span></h5>
                            <ul>
                                <li>ある程度以上複雑なプログラムのロジックを自分で考えたり書いている最中や、うまく動いた瞬間</li>
                                <li>感謝の言葉やいい意味での驚きの言葉を直接もらったとき（社内・エンドユーザー問わず）</li>
                                <li>（スケジュールに追われてる場合）チームで最大の成果を出すにはどうするか？を考えるのもちょっと好き</li>
                            </ul>
                            <h4><span style="font-size: 1.5rem;">💪 強み</span></h4>
                            <ul>
                                <li>集中し始めると長く続く</li>
                                <li>（非エンジニアにもわかるような）見栄えがする派手なプログラムを書くのが好き</li>
                                <li>立場の異なる人とディスカッションでいい感じにするのが割と得意？</li>
                                <li>人前に出て話すのが得意</li>
                                <ul>
                                    <li>相手によって話す内容を変えていき納得してもらうのも得意</li>
                                </ul>
                                <li>好きなものを推していくのが好き</li>
                                <li>面倒見良く他の人に教えるのが上手らしい</li>
                                <li>よく登壇している</li>
                                <li>1 -> 10 につよそう</li>
                                <li>スプリントレビューのようなデモに強い</li>
                                <li>気持ちのいいUXを作りたい、そのためなら自分から動く</li>
                            </ul>
                            <h4><span style="font-size: 1.5rem;">💔 弱み</span></h4>
                            <ul>
                                <li>調子（体調・精神）が安定しないことがある</li>
                                <ul>
                                    <li>およそ3ヶ月周期で具合が悪い時期がくるような気がする？</li>
                                </ul>
                                <li>ライブラリのような下支えするプログラムを自分で書きたいというモチベーションや必要性に気づくことがあまりない</li>
                                <li>手動テストのような作業が苦手</li>
                                <ul>
                                    <li>本当に向いてない</li>
                                    <li>デグレ起きがち</li>
                                </ul>
                                <li>8時間勤務が長いと感じることが多い</li>
                                <ul>
                                    <li>朝弱い</li>
                                    <li>朝整理したタスクが終わってしまう</li>
                                    <li>明日でいいことは明日やる精神</li>
                                </ul>
                                <li>実は売上そのものにはあまり興味がない</li>
                                <ul>
                                    <li>なんかごめんなさい</li>
                                </ul>
                                <li>0 -> 1 で作るものは決まっててあとは難しい挑戦要素はなにもないとかだと退屈。マークアップエンジニアじゃないよ。</li>
                            </ul>
                        </div>
                    </div>
                    <div style="object-fit: contain;">
                        <img src="/static/riin_avatar.png">
                    </div>
                </section>

                <h2 id="Works" style="scroll-snap-align: start;">Works</h2>
                <section >
                    <div class="maintext">
                        <h3>Taskbar.fm</h3>
                        <div>
                            <p>Macにタスクバーをつけます（Windowsのような！）</p>
                        </div>
                    </div>
                    <div style="object-fit: contain;">
                        <img src="/static/Taskbar_fm_README.png">
                    </div>
                </section>
                <sction >
                    <div class="maintext">
                        <h3>MissRirica</h3>
                        <div>
                            <p>iOS向けMisskeyクライアント！</p>
                            <p>Misskey のためのネイティブアプリ "MissRirica"。アクセストークンを用意してログインしてください。</p>
                            <h4>特徴</h4>
                            <ul>
                            <li>公式Misskeyとほぼ同様のインターフェース</li>
                            <li>Push通知</li>
                            </ul>
                            <a href="https://apps.apple.com/jp/app/missririca/id1659214999"> AppStore </a>
                        </div>
                    </div>
                        <img src="static/MissRirica_icon.jpg">
                </sction>
                <section>
                    <div class="maintext">
                    <h3 style="scroll-snap-align: start;">業務外活動</h3>

                    <h4>🏠 Misskeyサーバー運営</h4>
                    <h5>ゲームすきー</h5>
                    <p>アクティブユーザー数：</p>
                    <h5>みすてむず　いず　みすきーしすてむず</h5>
                    <p>アクティブユーザー数：</p>


                    <h4>⚙️ フリーソフト</h4>
                    <p><a href="https://github.com/fruitriin/tweet-lightning">TweetLightning - シュッと投稿できるTwitterクライアント</a> - Win, Mac (Electron, Vue)</p>

                    <h4>📖 雑誌掲載</h4>
                    <p><a href="https://gihyo.jp/magazine/SD/archive/2020/202009">ステップアップ式 Vue.js講座</a> - Software Design 2020年9月号</p>

                    <h4>🎥 登壇</h4>
                    <ul>
                        <li><a href="https://speakerdeck.com/fruitriin/aetephpernisusumeruvue-dot-jsru-men">あえてPHPerにすすめるVue.js入門</a> (30min)<br />
                            　<a href="https://2018.kphpug.jp/">PHPカンファレンス関西2018</a></li> 
                        <li> Vue.js ハンズオン (90min)<br />
                           　<a href="https://nakameguro-php.connpass.com/event/88145/">Vue.js ハンズオン! nakameguro.php #03 - connpass</a></li>
                        <li><a href="https://speakerdeck.com/fruitriin/knowledge-of-presentation-to-shield-from-hand-axes">LT・登壇でマサカリに備えるたった一つの心得</a><br />
                            　<a href="https://phperkaigi.jp/2019/">PHPerKaigi2019</a></li>
                        <li><a href="https://speakerdeck.com/fruitriin/invitation-at-ionic-vue">Vueでネイティブアプリを作る-Ionic_Vueの紹介</a><br />
                            　<a href="https://ginzajs.connpass.com/event/132446/">Ginza.js#2 - connpass</a></li>
                        <li> その他、LT複数</li>
                    </ul>
                    <h3 style="scroll-snap-align: start;">Speaker Deck</h3>
                    <iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/fruitriin" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>
                    </div>
                </section>

                <h2 id="History" class="history" style="scroll-snap-align: start;">History</h2>
                <section>
                    <div>
                    <h3>実務経歴</h3>
                    <h4>🏢 株式会社スタディスト (2020/02〜2021/11)</h4>
                    <div>
                        <div @click="histories[0].projects[0].isShow = !histories[0].projects[0].isShow" style="cursor: pointer;">
                            <h5 >toB SaaS ビジュアルマニュアルプラットフォーム開発(2021/10〜2022/10)</h5>
                            <p style="text-decoration: underline;">サービスの信頼性向上ということで、細かな改善を積み重ねるチームに配属</p>
                        </div>
                        <transition>
                            <ul v-if="histories[0].projects[0].isShow">
                                <li>UIUXの改善に焦点を当てたチームでの活動</li>
                                <li>ドラッグアンドドロップAPIを使用した複雑な機能改善</li>
                                <li>Composition APIのVue2系への導入をチーム開発で実施</li>
                                <li>フロントエンド開発のコンセプト実装としてcanvasを使用</li>
                            </ul>
                        </transition>
                        
                        <div @click="histories[0].projects[1].isShow = !histories[0].projects[1].isShow" style="cursor: pointer;">
                            <h5>toB SaaS 販売促進プラットフォーム開発 (2020/07〜2021/10)</h5>
                            <p style="text-decoration: underline;">バックエンドRailsとフロントエンドVueでWebアプリケーションを開発</p>
                        </div>
                        <transition>
                            <ul v-if="histories[0].projects[1].isShow">
                                <li>バックエンドのRailsとフロントエンドのVueでWebアプリケーションを開発</li>
                                <li>開発エンジニアチームの中でフロントエンドに特化した役割を担当</li>
                                <li>Railsの実装経験とともに優先順位付けのスキルを学ぶ</li>
                                <li>Capacitorを使用したネイティブアプリの作成を牽引</li>
                            </ul>
                        </transition>
                        <div @click="histories[0].projects[2].isShow = !histories[0].projects[2].isShow" style="cursor: pointer;">
                            <h5>toB SaaS ビジュアルマニュアルプラットフォーム開発 (2020/02〜2020/06)</h5>
                        </div>
                        <transition>
                            <ul v-if="histories[0].projects[2].isShow">
                                <li>バックエンドRailsとフロントエンドVueでWebアプリケーションを開発</li>
                                <li>UX改善を中心にフロントエンドの改良を行う</li>
                                <li>RubyとRailsのキャッチアップとバックエンドの回収に取り組む</li>
                            </ul>
                        </transition>
                    </div>
                    
                    <h4>🏢 株式会社ゆめみ (2019/02〜2019/12)</h4>
                    <div>
                        <ul>
                            <li>フルSPAニュースサイト構築</li>
                            <li>Vue.js(Nuxt.js)を使用してAPIからのレスポンスに基づくニュースサイトを構築</li>
                            <li>リーダーとしてクライアントとの交渉やプロジェクト管理を担当</li>
                            <li>チームメンバーの成長を支援するためにレビューやペアプロを行う</li>
                        </ul>
                    </div>

                    <h4>🏢 株式会社ORATTA (2017/09〜2018/12)</h4>
                    <div>
                        <h5>ソーシャルゲーム(ネイティブ) サーバーサイド開発/運用</h5>
                        <ul>
                            <li>PHP（自社製フレームワーク）によるサーバーサイドAPI実装</li>
                            <li>ソーシャルゲームの運用や不具合対応、社内ツールの機能追加</li>
                        </ul>
                        <h5>ソーシャルゲーム（ブラウザ）開発/設計/運用/保守</h5>
                        <ul>
                            <li>PHP（自社製フレームワーク）を使用したサーバーサイド実装</li>
                            <li>HTML/CSS/JavaScriptも含むフロントエンドの実装</li>
                            <li>施策のリリースに伴う設計や開発、サーバー監視やデータ補正など</li>
                        </ul>
                    </div>

                    <h4>🏢 2015/06〜2017/08 株式会社ITPM（SES) </h4>
                    <div>
                        <h5>ECサイト機能追加/改修(2016/06〜2017/08)</h5>
                        <p>Webアプリケーションエンジニアとして</p>
                        <ul>
                            <li>ポータルサイト(Zend Frameworkベース）の機能追加</li>
                            <li>HTMLでできたモックと要件をもとに実装</li>
                            <li>SP版検索画面リニューアルの実装担当、高機能化・高速化を実施</li>
                        </ul>
                        <h5>ECサイトの機能追加・改修(2015/12〜2016/05)</h5>
                        <p>実装、総合試験を受託しており、それら一連の業務を担当。</p>
                        <ul>
                            <li>PCのBTOショップの機能追加・改修</li>
                            <li>受け取った基本設計・画面イメージを元に、処理設計などを行う</li>
                            <li>作成した処理設計書を元に実装</li>
                            <li>テストケースの作成、実施</li>
                        </ul>
                        <h5>会社案内サイト作成(2015/06〜2015/11)</h5>
                        <ul>
                            <li>受託業務にて、会社案内ホームページのリニューアルのコーディングを担当</li>
                        </ul>
                    </div>
                    </div>
                </section>
                
                <h2 id="Skill" style="scroll-snap-align: start;">Skill</h2>
                <section>
                    <div class="maintext">
                        <h3>言語</h3>
                        <ul class="skilllist">
                            <li>JavaScript</li>
                            <li>Vue.js</li>
                            <li>TypeScript</li>
                            <li>Ruby</li>
                            <li>PHP</li>
                            <li>日本語</li>
                            <li>英語</li>
                        </ul>
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
    line-height: 1.75rem;
    background: #FCFEFF;
    color: #707070;

    overflow: auto;
    scroll-snap-type: y proximity;
    height: 100vh;

}

/* リンク色 */
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
    font-size: 2rem;
    text-decoration: underline;
    text-decoration-thickness: 0.4em;
    text-decoration-color: rgba(112, 196, 235, .5);
    text-underline-offset: -0.1em;
    text-decoration-skip-ink: none;
    padding: 5rem 0 1rem 0;
}
h3{
    position: relative;
    font-size: 1.5em;
    margin: 1rem 0 1rem 0;
    padding: 1rem;
    background-color: rgba(112, 196, 235, .2);
    border-radius: 5px;
}
h3:after {
  position: absolute;
  content: '';
  top: 100%;
  left: 30px;
  border: 15px solid transparent;
  border-top: 15px solid rgba(112, 196, 235, .2);
  width: 0;
  height: 0;
}
h4{
    font-size: 1.25rem;
    margin: 2rem 0 0.5rem 0;
}
h5{
    margin-top: 1.5rem;
    font-size: 1rem;
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
    align-items: flex-end;
    z-index: 5;
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
    height: 70px;
}
nav li{
    list-style: none;
    height: 70px;
    padding: 1rem 1.5rem;
	transition: 0.2s all ease-in-out;
}
/* ホバー時の色アクション */
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
    /* flex-wrap: wrap; */
    justify-content: space-between;
}
.maintext{ 
    /* max-width: 650px; */
    flex: 1;
    padding: 0 3rem 0 0;
}
main img{
    width: 300px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, .1);
    object-fit: contain;
}

main ul, ol {
    border-top: dashed #28A7E1 1px;/*上のボーダー*/
    border-bottom: dashed #28A7E1 1px;/*下のボーダー*/
    padding: 0.5em 2em 0.5em 2em;
    margin-bottom: 1.5rem;
  }
  
main ul li, ol li {
  line-height: 1.5;
  padding: 0.25em 0;
}

/* フッター */
footer{
    background-color: #70C4EB;
    color: #FCFEFF;
    text-align: center;
}

.history .hide {
    display: none;
}
</style>