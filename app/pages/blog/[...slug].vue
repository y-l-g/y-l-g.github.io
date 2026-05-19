<script setup lang="ts">
import {
  breadcrumbJsonLd,
  defaultSeoImage,
  defaultSeoImageHeight,
  defaultSeoImageWidth,
  jsonLdScript,
  languageFromLocale,
  personId,
  siteName,
  withSiteUrl,
} from "~/utils/seo";

const route = useRoute();
const { locale, t } = useI18n();
const dateLocale = computed(() => getDateLocale(locale.value));

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first(),
);
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings("blog", route.path, {
    fields: ["description"],
  }).where("path", "LIKE", getLocalizedBlogPattern(locale.value)),
);

const title = computed(() => page.value?.seo?.title || page.value?.title);
const description = computed(
  () => page.value?.seo?.description || page.value?.description,
);
const canonicalUrl = computed(() => withSiteUrl(route.path));
const image = computed(() =>
  page.value?.image ? withSiteUrl(page.value.image) : defaultSeoImage,
);

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
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
        { name: t("nav.home"), path: getLocalizedContentPath("/", locale.value) },
        { name: t("nav.blog"), path: getLocalizedContentPath("/blog", locale.value) },
        { name: page.value?.title || "", path: route.path },
      ]),
    ),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${canonicalUrl.value}#article`,
      headline: page.value?.title,
      description: description.value,
      image: image.value,
      datePublished: page.value?.date,
      dateModified: page.value?.dateModified || page.value?.date,
      author: {
        "@id": personId,
        name: page.value?.author?.name || siteName,
        url: withSiteUrl("/"),
      },
      publisher: {
        "@id": personId,
        name: siteName,
        url: withSiteUrl("/"),
      },
      inLanguage: languageFromLocale(locale.value),
      mainEntityOfPage: canonicalUrl.value,
    }),
  ],
}));

const articleLink = computed(() => canonicalUrl.value);
</script>

<template>
  <UContainer class="max-w-[70rem]">
    <UPage
      v-if="page"
      class="relative min-h-screen mt-20"
      :ui="{
        center: 'lg:col-span-7',
        right: 'lg:col-span-3 order-first lg:order-last',
        root: 'flex flex-col lg:grid lg:grid-cols-10 lg:gap-20',
      }"
    >
      <ULink to="/blog" class="text-sm flex items-center gap-1 mt-2">
        <UIcon name="lucide:chevron-left" />
        {{ t("blog.back") }}
      </ULink>
      <div class="flex flex-col gap-3 mt-8">
        <div class="flex text-xs text-muted gap-2">
          <span v-if="page.date">
            {{ formatDate(page.date, dateLocale) }}
          </span>
          <span v-if="page.date && page.minRead"> - </span>
          <span v-if="page.minRead">
            {{ page.minRead }} {{ t("blog.minRead") }}
          </span>
        </div>

        <h1 class="text-4xl font-medium max-w-3xl mx-auto mt-4">
          {{ page.title }}
        </h1>
        <p class="text-muted max-w-2xl">
          {{ page.description }}
        </p>
      </div>
      <UPageBody>
        <ContentRenderer v-if="page.body" :value="page" />

        <div class="flex items-center justify-end gap-2 text-sm text-muted">
          <UButton
            size="sm"
            variant="link"
            color="neutral"
            :label="t('blog.copyLink')"
            @click="copyToClipboard(articleLink, t('blog.copied'))"
          />
        </div>
        <UContentSurround :surround />
      </UPageBody>
      <template v-if="page?.body?.toc?.links?.length" #right>
        <UContentToc :title="t('toc.title')" :links="page.body?.toc?.links" />
      </template>
    </UPage>
  </UContainer>
</template>
