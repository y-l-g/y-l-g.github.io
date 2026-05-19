<script setup lang="ts">
import {
  defaultSeoImage,
  defaultSeoImageHeight,
  defaultSeoImageWidth,
  jsonLdScript,
  languageFromLocale,
  personId,
  personJsonLd,
  siteName,
  withSiteUrl,
  websiteId,
} from "~/utils/seo";

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

const title = computed(() => page.value?.seo?.title || page.value?.title);
const description = computed(
  () => page.value?.seo?.description || page.value?.description,
);
const canonicalUrl = computed(() => withSiteUrl(pagePath.value));
const faqQuestions = computed(
  () => page.value?.faq.categories.flatMap((category) => category.questions) || [],
);

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: "profile",
  ogUrl: canonicalUrl,
  ogImage: defaultSeoImage,
  ogImageWidth: defaultSeoImageWidth,
  ogImageHeight: defaultSeoImageHeight,
  twitterImage: defaultSeoImage,
});

useHead(() => ({
  script: [
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${canonicalUrl.value}#profile`,
      url: canonicalUrl.value,
      name: title.value,
      description: description.value,
      inLanguage: languageFromLocale(locale.value),
      mainEntity: personJsonLd(),
    }),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      url: withSiteUrl("/"),
      inLanguage: languageFromLocale(locale.value),
      publisher: { "@id": personId },
    }),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${canonicalUrl.value}#faq`,
      mainEntity: faqQuestions.value.map((question) => ({
        "@type": "Question",
        name: question.label,
        acceptedAnswer: {
          "@type": "Answer",
          text: question.content,
        },
      })),
    }),
  ],
}));
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <LandingHero :page />
      <LandingAbout :page />
      <LandingServices :page />
      <LandingProjects :page />
      <LandingFaq :page />
      <LandingBlog :page />
    </UPage>
  </UContainer>
</template>
