<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <section class="my-10">
    <div class="text-xl font-medium">
      {{ page.projects.title }}
    </div>
    <!-- <div class="text-muted">
      {{ page.projects.description }}
    </div> -->

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <UPageCard
        v-for="project in page.projects.items"
        :key="project.title"
        variant="naked"
        :ui="{ container: 'gap-0' }"
      >
        <div class="text-lg font-medium">
          {{ project.title }}
        </div>
        <div class="text-muted mt-2">
          {{ project.description }}
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <UButton
            v-for="link in project.links"
            :key="`${project.title}-${link.label}`"
            v-bind="{ size: 'sm', ...link }"
          />
        </div>
      </UPageCard>
    </div>
  </section>
</template>
