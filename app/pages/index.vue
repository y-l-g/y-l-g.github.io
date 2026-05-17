<script setup lang="ts">
import { defaultSeoImage, jsonLdScript, siteName, withSiteUrl } from "~/utils/seo";

const { locale } = useI18n();
const route = useRoute();
const pagePath = computed(() => getLocalizedContentPath("/", locale.value));

const { data: page } = await useAsyncData(
  `index-${route.path}`,
  () => queryCollection("index").path(pagePath.value).first(),
  {
    watch: [locale],
  },
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const title = computed(() => page.value?.seo.title || page.value?.title);
const description = computed(
  () => page.value?.seo.description || page.value?.description,
);
const canonicalUrl = computed(() => withSiteUrl(pagePath.value));

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: "profile",
  ogUrl: canonicalUrl,
  ogImage: defaultSeoImage,
  twitterImage: defaultSeoImage,
});

useHead(() => ({
  script: [
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteName,
      url: canonicalUrl.value,
      image: defaultSeoImage,
      jobTitle: page.value?.title,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Bretagne",
        addressCountry: "FR",
      },
      sameAs: [
        "https://github.com/y-l-g",
        "https://x.com/_y_l_g_",
        "https://www.malt.fr/profile/youennlegouedec",
      ],
      knowsAbout: ["Laravel", "Vue", "Nuxt", "SaaS", "GitOps", "k3s"],
    }),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: canonicalUrl.value,
      inLanguage: locale.value === DEFAULT_LOCALE ? "fr-FR" : "en-US",
    }),
  ],
}));
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <LandingHero :page />
      <LandingAbout :page />
      <LandingProjects :page />
      <!-- <LandingBlog :page /> -->
    </UPage>
  </UContainer>
</template>
