<script setup lang="ts">
withDefaults(
  defineProps<{
    headline?: string;
    title?: string;
    description?: string;
    align?: "start" | "center";
  }>(),
  {
    headline: undefined,
    title: undefined,
    description: undefined,
    align: "start",
  },
);
</script>

<template>
  <div
    :class="[
      align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
    ]"
  >
    <p v-if="headline" class="mb-3 text-sm font-medium text-primary">
      {{ headline }}
    </p>
    <h2
      v-if="title"
      class="text-2xl font-semibold text-highlighted text-pretty sm:text-3xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      :class="[
        'mt-4 text-base leading-7 text-muted text-pretty sm:text-lg',
        align === 'center' ? 'mx-auto' : '',
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
