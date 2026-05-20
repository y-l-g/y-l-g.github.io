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
  <LandingSection
    id="blog"
    :title="page.blog.title"
    :description="page.blog.description"
  >
    <div class="grid gap-4 lg:grid-cols-3">
      <LandingCard
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
      >
        <div class="space-y-3">
          <div class="text-sm font-medium text-primary">
            {{ formatDate(post.date, dateLocale) }}
          </div>
          <h3 class="text-base font-semibold text-highlighted text-pretty">
            {{ post.title }}
          </h3>
          <p class="text-sm leading-6 text-muted text-pretty">
            {{ post.description }}
          </p>
        </div>
      </LandingCard>
    </div>
  </LandingSection>
</template>
