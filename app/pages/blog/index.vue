<script setup lang="ts">
import { defaultSeoImage, withSiteUrl } from "~/utils/seo";

const { data: page } = await useAsyncData("blog-page", () => {
  return queryCollection("pages").path("/blog").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection("blog").order("date", "DESC").all(),
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
  ogType: "website",
  ogUrl: withSiteUrl("/blog"),
  ogImage: defaultSeoImage,
  twitterImage: defaultSeoImage,
});

useHead({
  link: [{ rel: "canonical", href: withSiteUrl("/blog") }],
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
            {{ formatDate(post.date) }}
          </div>
          <div class="text-lg font-medium mt-1">{{ post.title }}</div>
          <div class="text-muted mt-2">{{ post.description }}</div>
        </UPageCard>
      </div>
    </UPage>
  </UContainer>
</template>
