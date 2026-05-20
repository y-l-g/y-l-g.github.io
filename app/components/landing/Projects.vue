<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <LandingSection
    id="projects"
    :title="page.projects.title"
    :description="page.projects.description"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <LandingProjectCard
        v-for="project in page.projects.items"
        :key="project.title"
        :title="project.title"
        :description="project.description"
        :stack="project.stack"
        :links="project.links"
      />
    </div>
  </LandingSection>
</template>
