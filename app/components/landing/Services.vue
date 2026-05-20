<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <LandingSection
    v-if="page.services"
    id="services"
    :title="page.services.title"
    :description="page.services.description"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <LandingCard
        v-for="service in page.services.items"
        :key="service.to"
        :to="service.to"
        :title="service.title"
        :description="service.description"
        :icon="service.icon"
      />
    </div>
  </LandingSection>
</template>
