<script setup lang="ts">
type ProjectLink = {
  label: string;
  icon?: string;
  to?: string;
  color?: "primary" | "neutral" | "success" | "warning" | "error" | "info";
  variant?: "solid" | "outline" | "subtle" | "soft" | "ghost" | "link";
  target?: "_blank" | "_self";
};

defineProps<{
  title: string;
  description: string;
  stack?: string[];
  links: ProjectLink[];
}>();
</script>

<template>
  <UPageCard
    variant="soft"
    spotlight
    spotlight-color="primary"
    class="h-full"
    :ui="{
      root: 'overflow-hidden before:inset-0 before:opacity-[0.14]',
      spotlight: 'hidden',
      container: 'flex h-full flex-col gap-5 p-5 sm:p-6',
    }"
  >
    <div class="space-y-3">
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
      >
        <h3 class="text-lg font-semibold text-highlighted text-pretty">
          {{ title }}
        </h3>

        <div v-if="stack?.length" class="flex flex-wrap gap-1.5 sm:justify-end">
          <UBadge
            v-for="item in stack"
            :key="`${title}-${item}`"
            color="neutral"
            variant="soft"
            size="sm"
          >
            {{ item }}
          </UBadge>
        </div>
      </div>

      <p class="text-sm leading-6 text-muted text-pretty">
        {{ description }}
      </p>
    </div>

    <div class="mt-auto flex flex-wrap gap-2 pt-1">
      <UButton
        v-for="link in links"
        :key="`${title}-${link.label}`"
        v-bind="{ size: 'sm', ...link }"
      />
    </div>
  </UPageCard>
</template>
