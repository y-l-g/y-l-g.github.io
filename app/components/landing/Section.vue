<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string;
    headline?: string;
    title?: string;
    description?: string;
    layout?: "stacked" | "split";
    align?: "start" | "center";
  }>(),
  {
    id: undefined,
    headline: undefined,
    title: undefined,
    description: undefined,
    layout: "stacked",
    align: "start",
  },
);

const hasHeader = computed(
  () =>
    Boolean(props.headline) ||
    Boolean(props.title) ||
    Boolean(props.description),
);
</script>

<template>
  <section
    :id="id"
    class="scroll-mt-24 border-t border-muted py-16 sm:py-20 lg:py-24"
  >
    <div
      :class="[
        layout === 'split'
          ? 'grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start'
          : 'space-y-10 sm:space-y-12',
      ]"
    >
      <LandingSectionHeader
        v-if="hasHeader"
        :headline="headline"
        :title="title"
        :description="description"
        :align="layout === 'split' ? 'start' : align"
      />

      <div>
        <slot />
      </div>
    </div>
  </section>
</template>
