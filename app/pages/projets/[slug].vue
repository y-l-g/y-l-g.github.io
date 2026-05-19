<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
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
const contentPath = computed(() =>
  getLocalizedContentPath(`/projects/${route.params.slug}`, locale.value),
);

const { data: page } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection("projects").path(contentPath.value).first(),
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
const canonicalUrl = computed(() =>
  withSiteUrl(page.value?.seo?.canonical || route.path),
);
const image = computed(() =>
  page.value?.seo?.image ? withSiteUrl(page.value.seo.image) : defaultSeoImage,
);
const homePath = computed(() => getLocalizedContentPath("/", locale.value));
const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: t("nav.home"), to: homePath.value },
  { label: locale.value === DEFAULT_LOCALE ? "Projets" : "Projects", to: homePath.value },
  { label: page.value?.title || "" },
]);

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "article",
  ogUrl: canonicalUrl,
  ogImage: image,
  ogImageWidth: defaultSeoImageWidth,
  ogImageHeight: defaultSeoImageHeight,
  twitterImage: image,
});

useHead(() => ({
  script: [
    jsonLdScript(
      breadcrumbJsonLd([
        { name: t("nav.home"), path: homePath.value },
        { name: locale.value === DEFAULT_LOCALE ? "Projets" : "Projects", path: homePath.value },
        { name: page.value?.title || "", path: route.path },
      ]),
    ),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${canonicalUrl.value}#project`,
      name: page.value?.title,
      description: description.value,
      url: canonicalUrl.value,
      creator: { "@id": personId },
      inLanguage: languageFromLocale(locale.value),
      keywords: page.value?.stack,
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
        :links="page.links"
        :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
      />

      <UPageSection
        :title="locale === DEFAULT_LOCALE ? 'Rôle et contexte' : 'Role and context'"
        :description="page.role"
        orientation="horizontal"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      >
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="item in page.stack"
            :key="item"
            color="neutral"
            variant="soft"
          >
            {{ item }}
          </UBadge>
        </div>
      </UPageSection>

      <UPageSection
        :title="locale === DEFAULT_LOCALE ? 'Résultats' : 'Outcomes'"
        orientation="vertical"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      >
        <div class="grid gap-4 sm:grid-cols-3">
          <UPageCard
            v-for="outcome in page.outcomes"
            :key="outcome"
            variant="subtle"
            icon="i-lucide-check-circle"
            :title="outcome"
          />
        </div>
      </UPageSection>

      <UPageSection
        :title="locale === DEFAULT_LOCALE ? 'Ce que le projet montre' : 'What the project shows'"
        orientation="vertical"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      >
        <div class="grid gap-5">
          <UPageCard
            v-for="item in page.body"
            :key="item.title"
            variant="naked"
            :title="item.title"
            :description="item.description"
          />
        </div>
      </UPageSection>

      <UPageSection
        :title="locale === DEFAULT_LOCALE ? 'Services associés' : 'Related services'"
        orientation="vertical"
        :ui="{ container: 'py-10 sm:py-14 lg:py-16' }"
      >
        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="service in page.relatedServices"
            :key="service.to"
            :label="service.label"
            :to="service.to"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </UPageSection>
    </UPage>
  </UContainer>
</template>
