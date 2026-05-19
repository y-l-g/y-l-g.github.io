<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <section v-if="page.services" id="services" class="my-14 scroll-mt-24">
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-medium">
        {{ page.services.title }}
      </h2>
      <p class="text-muted max-w-2xl">
        {{ page.services.description }}
      </p>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <UPageCard
        v-for="service in page.services.items"
        :key="service.to"
        :to="service.to"
        :title="service.title"
        :description="service.description"
        :icon="service.icon"
        variant="subtle"
      />
    </div>
  </section>
</template>
