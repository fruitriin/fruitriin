<script lang="ts">
// 取扱説明書 — Riin's Workspace の個別ページ
export default defineComponent({
  data() {
    return {
      heading: "取扱説明書",
      groups: [
        { emoji: "🟢", label: "普段の様子", items: [
          { t: "休憩中や黙っているときは準備状態。仕事の話を振って大丈夫" },
          { t: "聞いている話題に思考が乗ると、一緒に深堀りし始める癖がある", sub: ["議論が深まることも多いが、進行を重視する人には「割り込み」に映ることも"] },
          { t: "瞬間最大風速型。問題に没入して解決したら、すっと離れる" }
        ] },
        { emoji: "📐", label: "タスクの与え方", items: [
          { t: "目的のないモジュールは覚えられない → タスクをもらって初めて詳しくなれるタイプ" },
          { t: "タスクは2本持ちが安定する（メイン＋サブ）", sub: ["メイン級が2つだと完了が遅れる。サブがないとSNSに意識が取られて戻れなくなる"] }
        ] },
        { emoji: "🌊", label: "波のある働き方", items: [
          { t: "バースト型。瞬間最大風速は高いが、安定した進捗を出し続けるのは苦手", sub: ["2週間分を4日で片付ける集中力の、裏面", "1日8時間椅子に座るのはほぼ不可能。2時間集中、1時間離席のサイクルなど"] },
          { t: "興味が移ると戻ってこれない。ラストワンマイル（仕上げ・デプロイ）が特に苦手" }
        ] },
        { emoji: "🧠", label: "認知の癖", items: [
          { t: "未知のタスクは着手できるが、実施よりもレビューが難しい。認識を揃えるモブレビューが有効" },
          { t: "ワンミス・ワンアウトの作業が苦手" }
        ] },
        { emoji: "⛽", label: "推進剤は感謝と応援", items: [
          { t: "一つ一つのタスクごとに、感謝や応援を繰り返し伝えられるとどんどん元気になる", sub: ["できた部分についてはアピールするので、良い部分のファーストインプレッションを伝えてほしい", "できた部分への承認がないとだんだん落ち込む", "承認の上で併せて次の計画やブラッシュアップを伝えるとGood"] }
        ] },
        { emoji: "🌧", label: "バッドメンタルのときの傾向", items: [
          { t: "表面上は普段通りに見えてもすごく無理をしていることがある", sub: ["無理をしているときに緻密に言語化してしまう。早めに話しかけてわだかまりや認識違いを解消するのが有効", "解消できないまま対立が進むと、精緻に言語化された状況証拠で圧倒してしまうことがある"] }
        ] }
      ]
    };
  }
});
</script>

<template>
  <div class="container">
    <main>
      <div id="content">
        <NuxtLink class="back-link" to="/"><span class="arrow">←</span> Profile に戻る</NuxtLink>
        <h2 class="page-title">{{ heading }}</h2>

        <div class="block">
          <div class="group" v-for="(g, gi) in groups" :key="gi">
            <h4 class="group__label"><span class="emoji">{{ g.emoji }}</span>{{ g.label }}</h4>
            <TreeList :items="g.items" />
          </div>
        </div>
      </div>
    </main>
    <footer>Riin's Workspace</footer>
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

.block { margin-bottom: 2.4rem; }
.group { margin-bottom: 1.6rem; }
.group__label {
  display: flex; align-items: center; gap: .5rem;
  font-size: 1.12rem; font-weight: 800; color: var(--ink); margin-bottom: .6rem;
}
.group__label .emoji { font-size: 1.2rem; line-height: 1; }

footer {
  background: var(--cyan-soft); color: var(--paper);
  text-align: center; padding: 1rem; font-weight: 700;
}
</style>
