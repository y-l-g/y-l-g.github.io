<script setup lang="ts">
import { defaultSeoImage, withSiteUrl } from "~/utils/seo";

const { locale } = useI18n();
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
  twitterImage: defaultSeoImage,
});
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHero :title="page.title" :description="page.description" />
      <div v-for="post in posts" :key="post.path" class="space-y-4">
        <UPageCard
          class="my-4"
          :ui="{ container: 'gap-0' }"
          variant="naked"
          :to="post.path"
        >
          <div class="text-xs font-medium">
            {{ formatDate(post.date, dateLocale) }}
          </div>
          <div class="text-lg font-medium mt-1">{{ post.title }}</div>
          <div class="text-muted mt-2">{{ post.description }}</div>
        </UPageCard>
      </div>
    </UPage>
  </UContainer>
</template>
