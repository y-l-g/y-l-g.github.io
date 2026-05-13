<script setup lang="ts">
import { defaultSeoImage, jsonLdScript, siteName, withSiteUrl } from "~/utils/seo";

const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
  ogType: "profile",
  ogUrl: withSiteUrl("/"),
  ogImage: defaultSeoImage,
  twitterImage: defaultSeoImage,
});

useHead({
  link: [{ rel: "canonical", href: withSiteUrl("/") }],
  script: [
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteName,
      url: withSiteUrl("/"),
      image: defaultSeoImage,
      jobTitle: "Freelance Laravel and Vue developer",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Brittany",
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
      url: withSiteUrl("/"),
      inLanguage: "en",
    }),
  ],
});
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
