import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css", "./app/assets/css/markdown.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/i18n",
  ],
  i18n: {
    strategy: "prefix",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "fr",
        name: "Français",
        file: "fr.json",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    clientBundle: {
      icons: ["uil:moon", "uil:sun"],
    },
  },
});
