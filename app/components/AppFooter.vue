<template>
  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns
          :ui="{ root: 'xl:grid-cols-4', center: 'xl:col-span-4' }"
          :columns="useAppConfig().columns"
        />
      </UContainer>
    </template>
    <template #left>
      <p class="text-muted text-sm">
        Built with Nuxt • {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        v-for="link in useAppConfig().footer.links"
        :key="link.to"
        v-bind="link"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
