<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <LandingSection
    :title="page.about.title"
    :description="page.about.description"
    layout="split"
  >
    <div
      v-if="page.about.items?.length"
      class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
    >
      <LandingCard
        v-for="item in page.about.items"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
      />
    </div>
  </LandingSection>
</template>
