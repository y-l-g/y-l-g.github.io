// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@vueuse/nuxt",
    "nuxt-og-image",
    "motion-v/nuxt",
  ],
  site: {
    url: "https://y-l.fr",
    name: "Youenn Le Gouedec",
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["vue", "bash", "yml", "yaml", "dockerfile"],
        },
        toc: {
          searchDepth: 1,
        },
      },
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      icons: [
        "lucide:calendar",
        "lucide:check-circle",
        "lucide:chevron-down",
        "lucide:chevron-left",
        "lucide:copy",
        "lucide:external-link",
        "lucide:hash",
        "lucide:moon",
        "lucide:sun",
        "simple-icons:github",
        "simple-icons:malt",
        "simple-icons:x",
      ],
    },
  },
});
