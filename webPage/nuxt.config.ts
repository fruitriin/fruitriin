// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  srcDir: "src/",
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
        {
          property: "og:title",
          content: "Riin's Workspace",
        },
        {
          property: "og:description",
          content: "Vueが好きな人",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://www.riinswork.space/",
        },
        {
          property: "og:image",
          content: "https://www.riinswork.space/static/ogpTitleLogo.png",
        },
        { property: "og:site_name", content: "Riin's Workspace" },
        { property: "og:locale", content: "ja_JP" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@FruitRiin" },
      ],
      link: [],
      style: [],
      script: [],
      noscript: [],
    },
  },

});
