<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";
import type { IndexCollectionItem } from "@nuxt/content";

const props = defineProps<{
  page: IndexCollectionItem;
}>();

const items = computed<AccordionItem[]>(() =>
  props.page.faq.categories.flatMap((category) =>
    category.questions.map((question) => ({
      label: question.label,
      content: question.content,
    })),
  ),
);
</script>

<template>
  <LandingSection
    id="faq"
    :title="page.faq.title"
    :description="page.faq.description"
    layout="split"
  >
    <UAccordion :items="items" />
  </LandingSection>
</template>
