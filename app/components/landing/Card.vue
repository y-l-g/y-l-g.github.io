<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  icon?: string;
  to?: string;
  eyebrow?: string;
}>();
</script>

<template>
  <UPageCard
    :to="to"
    :title="title"
    :description="description"
    :icon="icon"
    variant="ghost"
    spotlight
    spotlight-color="primary"
    class="h-full"
    :ui="{
      root: 'overflow-hidden transition-none hover:bg-elevated/50 before:inset-0 before:opacity-[0.14]',
      spotlight: 'hidden',
      container: 'gap-4 p-5 sm:p-6',
      leading: 'mb-0 inline-flex rounded-md bg-primary/10 p-2 text-primary',
      leadingIcon: 'size-5',
      title: 'text-base font-semibold text-highlighted sm:text-lg',
      description: 'text-sm leading-6 text-muted',
    }"
  >
    <template v-if="eyebrow" #header>
      <div class="text-sm font-medium text-primary">
        {{ eyebrow }}
      </div>
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UPageCard>
</template>
