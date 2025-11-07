<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();

const { data: posts } = await useAsyncData("index-blogs", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all(),
);
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true,
  });
}
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <div class="my-10">
    <div class="text-xl font-medium">
      {{ page.blog.title }}
    </div>
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
  </div>
</template>
