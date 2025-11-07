<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { mapContentNavigation } from "@nuxt/ui/utils/content";
import { findPageBreadcrumb } from "@nuxt/content/utils";
const { toc } = useAppConfig();

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first(),
);
if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryCollectionItemSurroundings("blog", route.path, {
    fields: ["description"],
  }),
);

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation", ref([]));
const blogNavigation = computed(
  () => navigation.value.find((item) => item.path === "/blog")?.children || [],
);

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(blogNavigation?.value, page.value?.path),
  ).map(({ icon, ...link }) => link),
);

if (page.value.image) {
  defineOgImage({ url: page.value.image });
} else {
  defineOgImageComponent(
    "Blog",
    {
      headline: breadcrumb.value.map((item) => item.label).join(" > "),
    },
    {
      fonts: ["Geist:400", "Geist:600"],
    },
  );
}

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title,
});

const articleLink = computed(() => `${window?.location}`);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <UContainer class="max-w-[70rem]">
    <UPage
      v-if="page"
      class="relative min-h-screen mt-20"
      :ui="{
        center: 'lg:col-span-7',
        right: 'lg:col-span-3 order-first lg:order-last',
        root: 'flex flex-col lg:grid lg:grid-cols-10 lg:gap-20',
      }"
    >
      <ULink to="/blog" class="text-sm flex items-center gap-1 mt-2">
        <UIcon name="lucide:chevron-left" />
        Blog
      </ULink>
      <div class="flex flex-col gap-3 mt-8">
        <div class="flex text-xs text-muted gap-2">
          <span v-if="page.date">
            {{ formatDate(page.date) }}
          </span>
          <span v-if="page.date && page.minRead"> - </span>
          <span v-if="page.minRead"> {{ page.minRead }} MIN READ </span>
        </div>

        <h1 class="text-4xl font-medium max-w-3xl mx-auto mt-4">
          {{ page.title }}
        </h1>
        <p class="text-muted max-w-2xl">
          {{ page.description }}
        </p>
      </div>
      <UPageBody>
        <ContentRenderer v-if="page.body" :value="page" />

        <div class="flex items-center justify-end gap-2 text-sm text-muted">
          <UButton
            size="sm"
            variant="link"
            color="neutral"
            label="Copy link"
            @click="
              copyToClipboard(articleLink, 'Article link copied to clipboard')
            "
          />
        </div>
        <UContentSurround :surround />
      </UPageBody>
      <template v-if="page?.body?.toc?.links?.length" #right>
        <UContentToc :title="toc?.title" :links="page.body?.toc?.links">
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>
