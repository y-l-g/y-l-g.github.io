<script setup lang="ts">
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
});
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHero :title="page.title" :description="page.description" />
      <div class="space-y-4" v-for="(post, index) in posts">
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
