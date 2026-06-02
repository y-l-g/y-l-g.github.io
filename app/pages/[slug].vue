<script setup lang="ts">
import type { AccordionItem, BreadcrumbItem } from "@nuxt/ui";
import {
  breadcrumbJsonLd,
  defaultSeoImage,
  defaultSeoImageHeight,
  defaultSeoImageWidth,
  jsonLdScript,
  languageFromLocale,
  personId,
  withSiteUrl,
} from "~/utils/seo";

const route = useRoute();
const { locale, t } = useI18n();
const { global } = useAppConfig();

definePageMeta({
  validate: (route) => {
    const slug = route.params.slug;

    return typeof slug === "string" && !slug.includes(".");
  },
});

const contentPath = computed(() =>
  getLocalizedContentPath(`/services/${route.params.slug}`, locale.value),
);

const { data: page } = await useAsyncData(`service-${route.path}`, () =>
  queryCollection("services").path(contentPath.value).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

const title = computed(() => page.value?.seo?.title || page.value?.title);
const description = computed(
  () => page.value?.seo?.description || page.value?.description,
);
const canonicalUrl = computed(() =>
  withSiteUrl(page.value?.seo?.canonical || route.path),
);
const image = computed(() =>
  page.value?.seo?.image ? withSiteUrl(page.value.seo.image) : defaultSeoImage,
);
const homePath = computed(() => getLocalizedContentPath("/", locale.value));
const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: t("nav.home"), to: homePath.value },
  { label: page.value?.title || "" },
]);
const faqItems = computed<AccordionItem[]>(() =>
  (page.value?.faq || []).map((item) => ({
    label: item.label,
    content: item.content,
  })),
);

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: canonicalUrl,
  ogImage: image,
  ogImageWidth: defaultSeoImageWidth,
  ogImageHeight: defaultSeoImageHeight,
  twitterImage: image,
  robots: computed(() => (page.value?.seo?.noindex ? "noindex,nofollow" : "index,follow")),
});

useHead(() => ({
  script: [
    jsonLdScript(
      breadcrumbJsonLd([
        { name: t("nav.home"), path: homePath.value },
        { name: page.value?.title || "", path: route.path },
      ]),
    ),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl.value}#service`,
      name: page.value?.title,
      description: description.value,
      url: canonicalUrl.value,
      serviceType: page.value?.title,
      areaServed: {
        "@type": "Country",
        name: locale.value === DEFAULT_LOCALE ? "France" : "France",
      },
      provider: { "@id": personId },
      inLanguage: languageFromLocale(locale.value),
    }),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${canonicalUrl.value}#faq`,
      mainEntity: (page.value?.faq || []).map((item) => ({
        "@type": "Question",
        name: item.label,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.content,
        },
      })),
    }),
  ],
}));
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <div class="pt-24">
        <UBreadcrumb :items="breadcrumbItems" />
      </div>

      <UPageHero
        :headline="page.headline"
        :title="page.title"
        :description="page.description"
        :links="[
          {
            label: page.cta.primaryLabel,
            to: global.meetingLink,
            target: '_blank',
            icon: 'i-lucide-calendar',
          },
          {
            label: page.cta.secondaryLabel || t('nav.blog'),
            to: '/blog',
            color: 'neutral',
            variant: 'subtle',
            icon: 'i-lucide-book-open',
          },
        ]"
        :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
      />

      <UPageSection
        :title="page.audience"
        :description="page.outcomes.join(' ')"
        orientation="horizontal"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      >
        <div class="grid gap-3">
          <UPageCard
            v-for="outcome in page.outcomes"
            :key="outcome"
            variant="naked"
            icon="i-lucide-check-circle"
            :title="outcome"
          />
        </div>
      </UPageSection>

      <UPageSection
        :title="locale === DEFAULT_LOCALE ? 'Ce que je prends en charge' : 'What I handle'"
        orientation="vertical"
        :features="page.services"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      />

      <UPageSection
        :title="locale === DEFAULT_LOCALE ? 'Méthode de travail' : 'Working process'"
        orientation="vertical"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      >
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <UPageCard
            v-for="(step, index) in page.process"
            :key="step.title"
            variant="soft"
            spotlight
            spotlight-color="primary"
            :title="`${index + 1}. ${step.title}`"
            :description="step.description"
            :ui="{
              root: 'overflow-hidden before:inset-0 before:opacity-[0.14]',
              spotlight: 'hidden',
            }"
          />
        </div>
      </UPageSection>

      <UPageSection
        :title="locale === DEFAULT_LOCALE ? 'Questions fréquentes' : 'Frequently asked questions'"
        orientation="horizontal"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      >
        <UAccordion :items="faqItems" />
      </UPageSection>

      <UPageCTA
        :title="page.cta.title"
        :description="page.cta.description"
        :links="[
          {
            label: page.cta.primaryLabel,
            to: global.meetingLink,
            target: '_blank',
            icon: 'i-lucide-calendar',
          },
        ]"
        class="mb-16"
      />
    </UPage>
  </UContainer>
</template>
