<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

type ActiveMenuItem = "home" | "services" | "blog";

type LocaleItem = {
  code: string;
  name?: string;
};

const ACTIVE_SECTION_OFFSET = 96;

const { locale, locales, t } = useI18n();
const route = useRoute();
const switchLocalePath = useSwitchLocalePath();

const activeLandingItem = ref<ActiveMenuItem>("home");
let scrollFrame: number | undefined;

const landingPath = computed(() => getLocalizedContentPath("/", locale.value));
const blogPath = computed(() => getLocalizedContentPath("/blog", locale.value));
const isLandingRoute = computed(() => route.path === landingPath.value);
const isBlogRoute = computed(
  () => route.path === blogPath.value || route.path.startsWith(`${blogPath.value}/`),
);
const activeItem = computed<ActiveMenuItem | undefined>(() => {
  if (isLandingRoute.value) {
    return activeLandingItem.value;
  }

  if (isBlogRoute.value) {
    return "blog";
  }

  return undefined;
});

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t("nav.home"),
    to: "/",
    active: activeItem.value === "home",
  },
  {
    label: t("nav.services"),
    to: "/#services",
    active: activeItem.value === "services",
  },
  {
    label: t("nav.blog"),
    to: "/blog",
    active: activeItem.value === "blog",
  },
]);

const availableLocales = computed(() =>
  (locales.value as LocaleItem[]).filter((item) => item.code !== locale.value),
);

const getSwitchLocalePath = (code: string) =>
  switchLocalePath(code as "fr" | "en");

const updateActiveLandingItem = () => {
  if (!import.meta.client || !isLandingRoute.value) {
    activeLandingItem.value = "home";
    return;
  }

  const servicesSection = document.getElementById("services");

  if (!servicesSection) {
    activeLandingItem.value = "home";
    return;
  }

  const rect = servicesSection.getBoundingClientRect();
  activeLandingItem.value =
    rect.top <= ACTIVE_SECTION_OFFSET && rect.bottom > ACTIVE_SECTION_OFFSET
      ? "services"
      : "home";
};

const scheduleActiveLandingItemUpdate = () => {
  if (!import.meta.client || scrollFrame !== undefined) {
    return;
  }

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = undefined;
    updateActiveLandingItem();
  });
};

onMounted(() => {
  scheduleActiveLandingItemUpdate();

  window.addEventListener("scroll", scheduleActiveLandingItemUpdate, {
    passive: true,
  });
  window.addEventListener("resize", scheduleActiveLandingItemUpdate);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scheduleActiveLandingItemUpdate);
  window.removeEventListener("resize", scheduleActiveLandingItemUpdate);

  if (scrollFrame !== undefined) {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = undefined;
  }
});

watch(
  () => [route.path, route.hash, locale.value],
  async () => {
    await nextTick();
    scheduleActiveLandingItemUpdate();
  },
  { flush: "post" },
);
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
