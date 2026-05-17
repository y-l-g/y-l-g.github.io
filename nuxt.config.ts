// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
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
  i18n: {
    baseUrl: "https://y-l.fr",
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    locales: [
      {
        code: "fr",
        name: "Français",
        language: "fr-FR",
        file: "fr.json",
      },
      {
        code: "en",
        name: "English",
        language: "en-US",
        file: "en.json",
      },
    ],
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      ignore: ["/en/sitemap.xml"],
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
        "lucide:languages",
        "lucide:moon",
        "lucide:sun",
        "simple-icons:github",
        "simple-icons:malt",
        "simple-icons:x",
      ],
    },
  },
});
