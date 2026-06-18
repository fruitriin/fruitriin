<script lang="ts">
export default defineComponent({
  props: {
    items: { type: Array as () => { t: string; sub?: string[] }[], required: true }
  }
});
</script>

<template>
  <ul class="tree">
    <li class="tree__item" v-for="(it, ii) in items" :key="ii">
      <span class="tree__t">{{ it.t }}</span>
      <ul class="tree tree--sub" v-if="it.sub">
        <li class="tree__item tree__item--sub" v-for="(s, si) in it.sub" :key="si"><span class="tree__t">{{ s }}</span></li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.tree {
  display: flex; flex-direction: column; gap: .5rem;
  border-left: 3px solid var(--cyan-pale);
  margin-left: .45rem; padding-left: 1.1rem;
}
.tree__item { position: relative; padding-left: 1.35rem; font-size: .96rem; color: var(--body); }
.tree__item::before {
  content: ""; position: absolute; left: .2rem; top: .62em;
  width: 7px; height: 7px; border-radius: 50%; background: var(--cyan-soft);
}
.tree--sub {
  border-left: 2px solid #E3F0F6; margin: .5rem 0 .25rem; padding-left: 1rem; gap: .35rem;
}
.tree__item--sub { font-size: .875rem; color: var(--muted); padding-left: .95rem; }
.tree__item--sub::before {
  width: 9px; height: 2px; border-radius: 2px; background: #C9B7AE; top: .72em; left: 0;
}
ul { list-style: none; margin: 0; padding: 0; }
</style>
