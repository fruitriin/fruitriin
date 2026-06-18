<script lang="ts">
const MEDIA_TYPES = {
  talks:    { emoji: "🎤", label: "登壇", unit: "本" },
  articles: { emoji: "📝", label: "記事", unit: "本" },
  magazine: { emoji: "📖", label: "雑誌", unit: "件" },
} as const;

type MediaType = keyof typeof MEDIA_TYPES;

export default defineComponent({
  props: {
    media: { type: Object as () => { type: string; items: { title: string; url: string; views?: string }[] }, required: true },
    open: { type: Boolean, default: true }
  },
  emits: ['toggle'],
  computed: {
    meta() { return MEDIA_TYPES[this.media.type as MediaType]; }
  }
});
</script>

<template>
  <div class="media-block" :class="'media-block--' + media.type">
    <div class="media-block__label" @click="$emit('toggle')">
      <span>{{ meta.emoji }} この時期の{{ meta.label }}（{{ media.items.length }}{{ meta.unit }}）</span>
      <span class="media-block__caret">{{ open ? '−' : '+' }}</span>
    </div>
    <transition>
      <div class="media-block__list" v-show="open">
        <div class="media-block__item" v-for="(it, ii) in media.items" :key="ii">
          <a :href="it.url" target="_blank" rel="noopener">{{ it.title }}</a>
          <span class="media-block__views" v-if="it.views">{{ it.views }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.media-block { margin-top: 1rem; border-radius: 10px; padding: .85rem 1.15rem; }
.media-block--talks    { background: #f0f7ff; border: 1px solid #c4ddf6; }
.media-block--articles { background: #f0faf4; border: 1px solid #bfe5cd; }
.media-block--magazine { background: #fdf5f0; border: 1px solid #f0d5c4; }
.media-block__label {
  font-size: .8rem; font-weight: 800; letter-spacing: .04em; margin-bottom: .55rem;
  display: flex; align-items: center; gap: .4rem; cursor: pointer; user-select: none;
  transition: opacity .15s;
}
.media-block__label:hover { opacity: .7; }
.media-block--talks    .media-block__label { color: #3b82c4; }
.media-block--articles .media-block__label { color: #2d8a56; }
.media-block--magazine .media-block__label { color: var(--coral); }
.media-block__caret {
  width: 20px; height: 20px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: .85rem; font-weight: 700; line-height: 1; flex: none; margin-left: auto;
}
.media-block--talks    .media-block__caret { background: #dceaf8; color: #3b82c4; }
.media-block--articles .media-block__caret { background: #d5f0de; color: #2d8a56; }
.media-block--magazine .media-block__caret { background: #fae5d8; color: var(--coral); }
.media-block__list { display: flex; flex-direction: column; gap: .32rem; }
.media-block__item { font-size: .86rem; line-height: 1.5; position: relative; padding-left: 1rem; }
.media-block__item::before {
  content: ""; position: absolute; left: 0; top: .55em;
  width: 5px; height: 5px; border-radius: 50%;
}
.media-block--talks    .media-block__item::before { background: #6aade4; }
.media-block--articles .media-block__item::before { background: #5cb880; }
.media-block--magazine .media-block__item::before { background: var(--coral); }
.media-block__item a { color: var(--ink); font-weight: 600; text-decoration: none; }
.media-block--talks    .media-block__item a:hover { color: #3b82c4; }
.media-block--articles .media-block__item a:hover { color: #2d8a56; }
.media-block--magazine .media-block__item a:hover { color: var(--coral); }
.media-block__views { font-size: .72rem; color: var(--muted); font-weight: 700; margin-left: .4rem; }

.v-enter-active, .v-leave-active { transition: opacity .35s ease; }
.v-enter-from, .v-leave-to { opacity: 0; }
</style>
