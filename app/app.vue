<script setup>
import { defaultSeoImage, siteName } from "~/utils/seo";

const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#020618" : "white",
);
useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "%s | Youenn Le Gouedec",
  ogSiteName: siteName,
  ogImage: defaultSeoImage,
  twitterImage: defaultSeoImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp>
    <AppHeader />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <AppFooter />
  </UApp>
</template>
