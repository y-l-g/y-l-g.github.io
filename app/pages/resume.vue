<script setup lang="ts">
import {
  defaultSeoImage,
  defaultSeoImageHeight,
  defaultSeoImageWidth,
  jsonLdScript,
  siteName,
  withSiteUrl,
} from "~/utils/seo";
import { resumeContent } from "~/data/resume";

const { locale } = useI18n();
const resumeLocale = computed<"fr" | "en">(() =>
  locale.value === DEFAULT_LOCALE ? "fr" : "en",
);
const resume = computed(() => resumeContent[resumeLocale.value]);
const canonicalPath = computed(() => getLocalizedContentPath("/resume", locale.value));
const title = computed(() => resume.value.seoTitle);
const description = computed(() => resume.value.seoDescription);
const sameAs = computed(() =>
  resume.value.contactLinks
    .map((link) => link.href)
    .filter((href) => href.startsWith("https://")),
);

const printResume = () => window.print();

useSeoMeta({
  title,
  ogTitle: computed(() => `${siteName} - ${title.value}`),
  description,
  ogDescription: description,
  ogType: "profile",
  ogUrl: computed(() => withSiteUrl(canonicalPath.value)),
  ogImage: defaultSeoImage,
  ogImageWidth: defaultSeoImageWidth,
  ogImageHeight: defaultSeoImageHeight,
  twitterImage: defaultSeoImage,
});

useHead(() => ({
  script: [
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: resume.value.jsonLdName,
      url: withSiteUrl(canonicalPath.value),
      description: description.value,
      mainEntity: {
        "@type": "Person",
        name: siteName,
        jobTitle: resume.value.jsonLdJobTitle,
        email: "mailto:youenn.legouedec@gmail.com",
        telephone: "+33619465867",
        image: defaultSeoImage,
        url: withSiteUrl("/"),
        sameAs: sameAs.value,
      },
    }),
  ],
}));
</script>

<template>
  <main
    class="resume-page min-h-screen bg-muted py-6 text-default print:bg-white print:py-0"
  >
    <div
      class="mx-auto flex w-full max-w-5xl justify-end px-4 pb-4 print:hidden"
    >
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-printer"
        :label="resume.printLabel"
        @click="printResume"
      />
    </div>

    <article
      class="resume-sheet mx-auto w-full max-w-5xl bg-default px-6 py-7 shadow-sm ring ring-default sm:px-8 lg:px-10 print:max-w-none print:p-0 print:shadow-none print:ring-0"
    >
      <header
        class="resume-header grid gap-5 border-b border-muted pb-5 sm:grid-cols-[1fr_auto]"
      >
        <div>
          <p class="text-sm font-medium text-primary">
            {{ resume.role }}
          </p>
          <h1
            class="mt-1 text-3xl font-semibold tracking-normal text-highlighted"
          >
            {{ resume.name }}
          </h1>
          <p class="mt-3 max-w-3xl text-sm leading-6 text-toned">
            {{ resume.summary }}
          </p>
        </div>

        <div class="flex items-start gap-4 sm:flex-col sm:items-end">
          <NuxtImg
            src="/8fdc0794-1657-4f9e-913e-c8997e5cddb2.webp"
            :alt="resume.portraitAlt"
            width="112"
            height="112"
            class="size-24 rounded-lg object-cover ring ring-default sm:size-28 print:size-24"
          />
          <div class="flex items-center gap-1 text-sm text-toned">
            <ResumeIcon name="map-pin" class="size-4 text-primary" />
            <span>{{ resume.location }}</span>
          </div>
        </div>
      </header>

      <section
        :aria-label="resume.contactAriaLabel"
        class="resume-contact grid gap-2 border-b border-muted py-4 text-sm sm:grid-cols-2 lg:grid-cols-3"
      >
        <a
          v-for="link in resume.contactLinks"
          :key="link.href"
          :href="link.href"
          class="flex min-w-0 items-center gap-2 text-toned transition-colors hover:text-default"
          rel="noopener noreferrer"
        >
          <ResumeIcon
            v-if="link.icon"
            :name="link.icon"
            class="size-4 shrink-0 text-primary"
            :class="link.iconClass"
          />
          <span class="truncate">{{ link.label }}</span>
        </a>
      </section>

      <div class="resume-body grid gap-6 pt-5 lg:grid-cols-[1fr_2fr]">
        <aside class="resume-sidebar space-y-6">
          <section>
            <h2 class="resume-section-title">
              {{ resume.sectionTitles.skills }}
            </h2>
            <div class="mt-3 space-y-4">
              <div v-for="group in resume.skillGroups" :key="group.title">
                <h3 class="text-sm font-semibold text-highlighted">
                  {{ group.title }}
                </h3>
                <div class="mt-2 flex flex-wrap gap-1.5">
                  <UBadge
                    v-for="item in group.items"
                    :key="item"
                    color="neutral"
                    variant="subtle"
                    size="sm"
                    class="resume-skill-badge rounded-md"
                  >
                    {{ item }}
                  </UBadge>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 class="resume-section-title">
              {{ resume.sectionTitles.education }}
            </h2>
            <ul class="mt-3 space-y-2 text-sm leading-5 text-toned">
              <li v-for="item in resume.education" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="resume-section-title">
              {{ resume.sectionTitles.languages }}
            </h2>
            <ul class="mt-3 space-y-2 text-sm leading-5 text-toned">
              <li v-for="item in resume.languages" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>
        </aside>

        <div class="resume-main space-y-6">
          <section>
            <h2 class="resume-section-title">
              {{ resume.sectionTitles.experience }}
            </h2>
            <div class="mt-3 space-y-4">
              <article
                v-for="experience in resume.experiences"
                :key="`${experience.company}-${experience.role}`"
                class="break-inside-avoid"
              >
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                >
                  <div>
                    <h3 class="text-base font-semibold text-highlighted">
                      {{ experience.role }}
                    </h3>
                    <p class="text-sm font-medium text-primary">
                      {{ experience.company }}
                    </p>
                  </div>
                  <p class="text-sm text-muted">
                    {{ experience.period }}
                  </p>
                </div>
                <p v-if="experience.location" class="mt-1 text-sm text-muted">
                  {{ experience.location }}
                </p>
                <ul class="resume-list mt-2">
                  <li v-for="bullet in experience.bullets" :key="bullet">
                    {{ bullet }}
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <section>
            <h2 class="resume-section-title">
              {{ resume.sectionTitles.projects }}
            </h2>
            <div class="resume-projects mt-3 grid gap-3 sm:grid-cols-2">
              <article
                v-for="project in resume.projects"
                :key="project.name"
                class="resume-project-card break-inside-avoid rounded-lg border border-muted p-3"
              >
                <div class="flex items-start justify-between gap-2">
                  <h3 class="text-sm font-semibold text-highlighted">
                    {{ project.name }}
                  </h3>
                  <a
                    v-if="project.href"
                    :href="project.href"
                    class="mt-0.5 text-primary"
                    :aria-label="`${resume.openProjectLabel} ${project.name}`"
                    rel="noopener noreferrer"
                  >
                    <ResumeIcon name="external-link" class="size-4" />
                  </a>
                </div>
                <p class="mt-1 text-sm leading-5 text-toned">
                  {{ project.description }}
                </p>
                <p class="mt-2 text-xs font-medium uppercase text-muted">
                  {{ project.stack }}
                </p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>
.resume-section-title {
  color: var(--ui-text-highlighted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.resume-list {
  color: var(--ui-text-toned);
  display: grid;
  font-size: 0.875rem;
  gap: 0.25rem;
  line-height: 1.45;
  list-style: disc;
  padding-left: 1.1rem;
}

.resume-svg-icon {
  display: inline-block;
  flex: 0 0 auto;
  height: 1rem;
  width: 1rem;
}

.resume-icon-malt {
  height: 1.75rem;
  margin-left: -0.35rem;
  margin-right: -0.15rem;
  width: 1.75rem;
}

@media print {
  @page {
    margin: 10mm;
    size: A4;
  }

  :global(html) {
    font-size: 12px;
  }

  :global(body),
  :global(#__nuxt) {
    background: #ffffff !important;
  }

  .resume-page {
    --ui-bg: #ffffff;
    --ui-bg-muted: #ffffff;
    --ui-border: #d4d4d8;
    --ui-border-muted: #e4e4e7;
    --ui-primary: #c2410c;
    --ui-text: #18181b;
    --ui-text-highlighted: #09090b;
    --ui-text-muted: #71717a;
    --ui-text-toned: #3f3f46;

    background: #ffffff !important;
    color: #18181b;
    min-height: auto;
    padding: 0 !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .resume-sheet {
    background: #ffffff !important;
    box-shadow: none !important;
    color: #18181b;
    font-size: 1rem;
    max-width: none !important;
    padding: 0 !important;
    width: 100%;
  }

  .resume-header {
    display: grid;
    gap: 0.9rem !important;
    grid-template-columns: minmax(0, 1fr) auto !important;
    padding-bottom: 0.75rem !important;
  }

  .resume-contact {
    display: grid;
    gap: 0.4rem 0.75rem !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    padding-bottom: 0.7rem !important;
    padding-top: 0.7rem !important;
  }

  .resume-body {
    align-items: start;
    display: grid;
    gap: 1.2rem !important;
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 2fr) !important;
    padding-top: 0.85rem !important;
  }

  .resume-sidebar,
  .resume-main {
    display: grid;
    gap: 1rem !important;
  }

  .resume-sidebar > :not(:last-child),
  .resume-main > :not(:last-child) {
    margin-bottom: 0 !important;
  }

  .resume-projects {
    display: grid;
    gap: 0.55rem !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    padding-right: 0.1rem !important;
  }

  .resume-project-card {
    border-color: transparent !important;
    border-radius: 0.45rem !important;
    box-shadow: inset 0 0 0 1px #d4d4d8 !important;
    padding: 0.6rem !important;
  }

  .resume-skill-badge {
    background: #f4f4f5 !important;
    border: 1px solid #d4d4d8 !important;
    box-shadow: none !important;
    color: #27272a !important;
  }

  .resume-section-title {
    color: #09090b;
  }

  .resume-list {
    color: #3f3f46;
  }

  .resume-svg-icon {
    color: currentColor;
    height: 1rem;
    width: 1rem;
  }

  .resume-icon-malt {
    height: 1.75rem;
    width: 1.75rem;
  }
}
</style>
