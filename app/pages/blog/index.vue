<script setup lang="ts">
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

const { locale, t } = useI18n();
const route = useRoute();
const pagePath = computed(() => getLocalizedContentPath("/blog", locale.value));
const blogPattern = computed(() => getLocalizedBlogPattern(locale.value));
const dateLocale = computed(() => getDateLocale(locale.value));

const { data: page } = await useAsyncData(
  `blog-page-${route.path}`,
  () => queryCollection("pages").path(pagePath.value).first(),
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
const { data: posts } = await useAsyncData(
  `blogs-${route.path}`,
  () =>
    queryCollection("blog")
      .where("path", "LIKE", blogPattern.value)
      .order("date", "DESC")
      .all(),
  {
    watch: [locale],
  },
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true,
  });
}

const title = computed(() => page.value?.seo?.title || page.value?.title);
const description = computed(
  () => page.value?.seo?.description || page.value?.description,
);
const canonicalUrl = computed(() => withSiteUrl(pagePath.value));

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: "website",
  ogUrl: canonicalUrl,
  ogImage: defaultSeoImage,
  ogImageWidth: defaultSeoImageWidth,
  ogImageHeight: defaultSeoImageHeight,
  twitterImage: defaultSeoImage,
});

useHead(() => ({
  script: [
    jsonLdScript(
      breadcrumbJsonLd([
        { name: t("nav.home"), path: getLocalizedContentPath("/", locale.value) },
        { name: page.value?.title || "", path: pagePath.value },
      ]),
    ),
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${canonicalUrl.value}#blog`,
      name: title.value,
      description: description.value,
      url: canonicalUrl.value,
      inLanguage: languageFromLocale(locale.value),
      author: { "@id": personId },
      blogPost: (posts.value || []).map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: withSiteUrl(post.path),
        datePublished: post.date,
      })),
    }),
  ],
}));
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHero
        :title="page.title"
        :description="page.description"
        :ui="{
          container: 'pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-18',
        }"
      >
        <template #headline>
          <UBadge color="neutral" variant="soft" size="lg" class="gap-1.5">
            <UIcon name="i-lucide-book-open" class="size-4" />
            {{ t("nav.blog") }}
          </UBadge>
        </template>
      </UPageHero>

      <section class="border-t border-muted py-12 sm:py-16 lg:py-20">
        <div class="grid gap-4 sm:grid-cols-2">
          <LandingCard
            v-for="post in posts"
            :key="post.path"
            :to="post.path"
            :eyebrow="formatDate(post.date, dateLocale)"
            :title="post.title"
            :description="post.description"
          >
            <template #footer>
              <div class="inline-flex items-center gap-1 text-sm font-medium text-primary">
                <span>{{ locale === DEFAULT_LOCALE ? "Lire la note" : "Read note" }}</span>
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </div>
            </template>
          </LandingCard>
        </div>
      </section>
    </UPage>
  </UContainer>
</template>
