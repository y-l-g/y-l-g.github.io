<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();

const { locale } = useI18n();
const dateLocale = computed(() => getDateLocale(locale.value));
const blogPattern = computed(() => getLocalizedBlogPattern(locale.value));

const { data: posts } = await useAsyncData(
  `index-blogs-${locale.value}`,
  () =>
    queryCollection("blog")
      .where("path", "LIKE", blogPattern.value)
      .order("date", "DESC")
      .limit(3)
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
</script>

<template>
  <div class="my-10">
    <div class="text-xl font-medium">
      {{ page.blog.title }}
    </div>
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
  </div>
</template>
