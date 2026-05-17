<script setup>
import * as uiLocales from "@nuxt/ui/locale";
import { defaultSeoImage, siteName } from "~/utils/seo";

const colorMode = useColorMode();
const { locale } = useI18n();
const localeHead = useLocaleHead({ seo: true });

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white",
);
const uiLocale = computed(() =>
  locale.value === "fr" ? uiLocales.fr : uiLocales.en,
);

useHead(() => ({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color.value },
    ...localeHead.value.meta,
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }, ...localeHead.value.link],
  htmlAttrs: localeHead.value.htmlAttrs,
}));

useSeoMeta({
  titleTemplate: "%s | Youenn Le Gouedec",
  ogSiteName: siteName,
  ogImage: defaultSeoImage,
  twitterImage: defaultSeoImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp :locale="uiLocale">
    <AppHeader />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <AppFooter />
  </UApp>
</template>
