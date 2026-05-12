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
        to="https://x.com/_y_l_g_"
        target="_blank"
        icon="i-simple-icons-x"
        aria-label="YL on X"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://github.com/y-l-g"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="YL on GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
