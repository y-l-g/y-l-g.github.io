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
  <section class="my-14">
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-medium">
        {{ page.faq.title }}
      </h2>
      <p class="text-muted max-w-2xl">
        {{ page.faq.description }}
      </p>
    </div>

    <UAccordion :items="items" class="mt-4" />
  </section>
</template>
