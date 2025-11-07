<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <div class="text-xl font-medium">
    {{ page.about.title }}
  </div>
  <div class="text-muted">{{ page.about.description }}</div>
</template>
