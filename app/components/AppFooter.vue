<script setup lang="ts">
import appConfig from "~/app.config";

const columns = [
  {
    label: "Backend",
    children: [
      {
        label: "Laravel",
      },
    ],
  },
  {
    label: "Frontent",
    children: [
      {
        label: "Vue",
      },
      {
        label: "Nuxt",
      },
    ],
  },
  {
    label: "Infrastructure",
    children: [
      {
        label: "Frankenphp",
      },
      {
        label: "Docker",
      },
    ],
  },
  {
    label: "Interests",
    children: [
      {
        label: "Go",
      },
      {
        label: "Kubernetes",
      },
    ],
  },
];
</script>

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
