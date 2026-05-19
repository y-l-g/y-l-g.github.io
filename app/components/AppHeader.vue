<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

type LocaleItem = {
  code: string;
  name?: string;
};

const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t("nav.home"),
    to: "/",
  },
  {
    label: t("nav.services"),
    to: "/#services",
  },
  {
    label: t("nav.blog"),
    to: "/blog",
  },
]);

const availableLocales = computed(() =>
  (locales.value as LocaleItem[]).filter((item) => item.code !== locale.value),
);

const getSwitchLocalePath = (code: string) =>
  switchLocalePath(code as "fr" | "en");
</script>
<template>
  <div
    class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10"
  >
    <UNavigationMenu
      :items
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden',
      }"
    >
      <template #list-trailing>
        <UButton
          v-for="item in availableLocales"
          :key="item.code"
          :to="getSwitchLocalePath(item.code)"
          :locale="false"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-lucide-languages"
          :label="item.code.toUpperCase()"
          :aria-label="t('nav.language', { name: item.name })"
        />
        <UColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>
