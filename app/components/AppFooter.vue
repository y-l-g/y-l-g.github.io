<script setup lang="ts">
const { t } = useI18n();
const year = new Date().getFullYear();
const { footer } = useAppConfig();

const getSocialLabel = (to: string) => {
  if (to.includes("github.com")) {
    return t("footer.social.github");
  }

  if (to.includes("malt.fr")) {
    return t("footer.social.malt");
  }

  return t("footer.social.x");
};

const columns = computed(() => [
  {
    label: t("footer.columns.backend"),
    children: [
      {
        label: "Laravel",
        to: "https://laravel.com/",
      },
      {
        label: "Spatie packages",
        to: "https://spatie.be/",
      },
      {
        label: "Postgres",
        to: "https://www.postgresql.org/",
      },
    ],
  },
  {
    label: t("footer.columns.frontend"),
    children: [
      {
        label: "Vue",
        to: "https://vuejs.org/",
      },
      {
        label: "Nuxt",
        to: "https://nuxt.com/",
      },
      {
        label: "Inertia.js",
        to: "https://inertiajs.com/",
      },
    ],
  },
  {
    label: t("footer.columns.infrastructure"),
    children: [
      {
        label: "FrankenPHP",
        to: "https://frankenphp.dev/",
      },
      {
        label: "K3s",
        to: "https://k3s.io/",
      },
      {
        label: "ArgoCD",
        to: "https://argoproj.github.io/",
      },
    ],
  },
  {
    label: t("footer.columns.interests"),
    children: [
      {
        label: "Go",
        to: "https://go.dev/",
      },
    ],
  },
]);
</script>

<template>
  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns
          :ui="{ root: 'xl:grid-cols-4', center: 'xl:col-span-4' }"
          :columns="columns"
        />
      </UContainer>
    </template>
    <template #left>
      <p class="text-muted text-sm">
        {{ t("footer.credits", { year }) }}
      </p>
    </template>

    <template #right>
      <UButton
        v-for="link in footer.links"
        :key="link.to"
        v-bind="link"
        :aria-label="getSocialLabel(link.to)"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
