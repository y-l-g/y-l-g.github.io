<script setup lang="ts">
import { defineComponent, h, type PropType } from "vue";
import {
  defaultSeoImage,
  defaultSeoImageHeight,
  defaultSeoImageWidth,
  jsonLdScript,
  siteName,
  withSiteUrl,
} from "~/utils/seo";

const resumeIcons = {
  "external-link": {
    viewBox: "0 0 24 24",
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  },
  github: {
    viewBox: "0 0 24 24",
    body: '<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
  },
  linkedin: {
    viewBox: "0 0 24 24",
    body: '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>',
  },
  mail: {
    viewBox: "0 0 24 24",
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></g>',
  },
  malt: {
    viewBox: "0 0 24 24",
    body: '<path fill="currentColor" d="M20.195 8.581c-.069 0-.285.026-.484.113c-.432.181-.597.311-.597.58v5.023c0 .277.26.355.735.355c.467 0 .649-.087.649-.355V8.858c0-.173-.113-.277-.303-.277m3.502 4.903c-.345.087-.45.113-.57.113c-.147 0-.2-.044-.2-.2v-2.161h.788c.207 0 .285-.078.285-.285c0-.173-.078-.26-.285-.26h-.787v-.839c0-.259-.087-.363-.268-.363c-.173 0-.415.156-.934.597c-.528.45-.83.744-.83.951c0 .121.086.199.224.199h.424v2.335c0 .683.337 1.08.925 1.08c.39 0 .675-.146 1.012-.406c.311-.242.51-.432.51-.596c0-.139-.103-.217-.294-.165m-15.21-3.078c-.13 0-.285.026-.484.112c-.433.19-.597.312-.597.58v3.2c0 .276.26.354.735.354c.467 0 .649-.087.649-.355v-3.614c0-.173-.113-.277-.303-.277m1.816 0c-.355 0-.675.121-.986.363c-.173.138-.32.294-.32.424c0 .112.078.173.19.173c.19 0 .251-.078.416-.078s.25.173.25.476v2.533c0 .277.26.355.735.355c.467 0 .649-.087.649-.355v-2.776c0-.657-.39-1.115-.934-1.115m2.43 0c-.337 0-.692.121-1.003.363c-.173.138-.32.294-.32.424c0 .112.078.173.19.173c.19 0 .25-.078.432-.078s.268.173.268.476v2.533c0 .277.26.355.735.355c.467 0 .649-.087.649-.355v-2.776c0-.657-.39-1.115-.951-1.115m5.335 0a1.3 1.3 0 0 0-.484.112c-.26.113-.398.2-.467.312c-.26-.303-.597-.398-.977-.398c-1.116 0-1.911.942-1.911 2.283c0 1.124.605 1.954 1.461 1.954c.26 0 .493-.104.77-.363c.216-.2.32-.329.32-.45a.14.14 0 0 0-.147-.147c-.121 0-.251.104-.416.104c-.354 0-.596-.545-.596-1.35c0-.803.32-1.348.804-1.348c.32 0 .562.242.562.657v2.525c0 .277.26.355.735.355c.467 0 .649-.087.649-.355v-3.614c0-.173-.113-.277-.303-.277M3.499 13.563l-.21.21l.619.618c.304.304.79.598 1.244.144c.339-.34.26-.695.073-.98c-.06.004-1.726.008-1.726.008m-.963-2.325l.21-.21l-.608-.607c-.304-.303-.765-.621-1.243-.143c-.351.35-.273.692-.087.97Zm2.86.416a384 384 0 0 1-1.511 1.524h1.154c.43 0 .981-.101.981-.777c0-.496-.296-.683-.624-.747m-3.244-.031H.981c-.43 0-.981.135-.981.778c0 .479.307.676.641.745c.04-.046 1.511-1.523 1.511-1.523m1.484 3.04l-.618-.618l-.608.607a3 3 0 0 1-.137.128c.07.333.266.639.745.639s.676-.307.745-.641q-.064-.054-.127-.115M2.41 10.15l.608.607l.618-.618a2 2 0 0 1 .128-.118c-.065-.327-.251-.623-.747-.623s-.682.297-.746.625q.068.058.14.127zm2.742.117c-.455-.454-.94-.16-1.244.144l-2.87 2.87c-.303.303-.621.765-.143 1.243s.94.16 1.243-.143l2.87-2.87c.304-.304.598-.79.144-1.244"/>',
  },
  "map-pin": {
    viewBox: "0 0 24 24",
    body: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></g>',
  },
  phone: {
    viewBox: "0 0 24 24",
    body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384"/>',
  },
} as const;

type ResumeIconName = keyof typeof resumeIcons;

const ResumeIcon = defineComponent({
  props: {
    name: {
      type: String as PropType<ResumeIconName>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    return () => {
      const icon = resumeIcons[props.name];

      return h("svg", {
        ...attrs,
        class: ["resume-svg-icon", attrs.class],
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: icon.viewBox,
        "aria-hidden": "true",
        focusable: "false",
        innerHTML: icon.body,
      });
    };
  },
});

type Link = {
  label: string;
  href: string;
  icon?: ResumeIconName;
  iconClass?: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
};

type Project = {
  name: string;
  description: string;
  stack: string;
  href?: string;
};

const title = "Full-Stack Developer Resume";
const description =
  "Resume of Youenn Le Gouedec, full-stack web developer specializing in Laravel, Vue, Nuxt, SaaS products and pragmatic production infrastructure.";

const contactLinks: Link[] = [
  {
    label: "youenn.legouedec@gmail.com",
    href: "mailto:youenn.legouedec@gmail.com",
    icon: "mail",
  },
  {
    label: "+33 6 19 46 58 67",
    href: "tel:+33619465867",
    icon: "phone",
  },
  {
    label: "y-l.fr",
    href: "https://y-l.fr",
    icon: "external-link",
  },
  {
    label: "github.com/y-l-g",
    href: "https://github.com/y-l-g",
    icon: "github",
  },
  {
    label: "Malt",
    href: "https://www.malt.fr/profile/youennlegouedec",
    icon: "malt",
    iconClass: "resume-icon-malt",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/y-l-g/",
    icon: "linkedin",
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    items: [
      "Laravel",
      "PHP",
      "Symfony",
      "PostgreSQL",
      "Redis",
      "Queues",
      "Webhooks",
      "Stripe Cashier",
      "Filament",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Vue",
      "Nuxt",
      "Inertia.js",
      "TypeScript",
      "Nuxt UI",
      "Tailwind CSS",
      "SSR",
      "Forms",
      "Product UI",
    ],
  },
  {
    title: "Production",
    items: [
      "Docker",
      "Caddy",
      "FrankenPHP",
      "Traefik",
      "k3s",
      "Argo CD",
      "GitOps",
      "Backups",
      "Health checks",
    ],
  },
];

const experiences: Experience[] = [
  {
    role: "Full-Stack Web Developer",
    company: "Karbonalpha",
    period: "March 2026 - April 2026",
    location: "Remote mission",
    bullets: [
      "Worked in a complex multi-tenant Laravel architecture for insurance workflows.",
      "Implemented backend features around contracts, affiliation and budget management.",
      "Integrated Nuxt/Vue screens with API-connected customer and employee areas.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Youenn Le Gouedec",
    period: "2025 - Present",
    location: "Redon, France",
    bullets: [
      "Builds and maintains SaaS products, business tools and product interfaces with Laravel, Vue, Nuxt and Inertia.",
      "Owns full delivery paths: domain code, subscriptions, admin workflows, integrations, deployment and production follow-up.",
      "Maintains lightweight infrastructure using Docker, Kubernetes/GitOps, Argo CD, PostgreSQL, Redis and backups.",
    ],
  },
  {
    role: "Digital Support & IT Services",
    company: "France Services / SAP Informatique",
    period: "2021 - 2025",
    location: "Redon, France",
    bullets: [
      "Helped individuals and local organizations solve practical software, hardware, administrative and training needs.",
      "Built strong client-facing habits: clear explanations, diagnosis, documentation and pragmatic support.",
    ],
  },
];

const projects: Project[] = [
  {
    name: "Webvite",
    description:
      "Production SaaS for small businesses with subscriptions, customer websites, custom domains, analytics, administration and ongoing maintenance.",
    stack: "Laravel, Vue, SaaS, payments, production",
    href: "https://webvite.eu",
  },
  {
    name: "Saasterkit",
    description:
      "Open-source Laravel/Vue/Inertia SaaS starter kit with authentication, teams, roles, billing, administration and theming.",
    stack: "Laravel, Vue, Inertia, Nuxt UI, Stripe",
    href: "https://github.com/y-l-g/saasterkit",
  },
  {
    name: "Notenn",
    description:
      "Music web application for organizing, editing, rendering and sharing scores, with multilingual UI and PostgreSQL search.",
    stack: "Laravel, Vue, Inertia, PostgreSQL, Docker",
    href: "https://notenn.com",
  },
  {
    name: "Pogo WebSocket",
    description:
      "Experimental Pusher-compatible WebSocket module for FrankenPHP and Laravel broadcasting, focused on real-time PHP constraints.",
    stack: "Go, PHP, FrankenPHP, WebSocket, Redis",
    href: "https://github.com/y-l-g/websocket",
  },
  {
    name: "y-l.fr & technical writing",
    description:
      "Personal portfolio and notes about Laravel, Nuxt, SaaS architecture, GitOps, k3s and production decisions.",
    stack: "Nuxt, Nuxt Content, Nuxt UI, SEO",
    href: "https://y-l.fr",
  },
  {
    name: "Pogo Async",
    description:
      "Composer package and FrankenPHP module for request-scoped parallel PHP jobs using isolated worker pools.",
    stack: "PHP, FrankenPHP, Go, Caddy, Composer",
    href: "https://github.com/y-l-g/pogo",
  },
];

const education = [
  "Bachelor's degree in Mathematics, Universite de Rennes 1, 2013",
  "Engineering studies, INSA Rennes, 2009-2011",
  "Baccalaureat S, highest honors, Lycee Charles de Gaulle, Vannes, 2009",
];

const printResume = () => window.print();

useSeoMeta({
  title,
  ogTitle: `${siteName} - ${title}`,
  description,
  ogDescription: description,
  ogType: "profile",
  ogUrl: withSiteUrl("/resume"),
  ogImage: defaultSeoImage,
  ogImageWidth: defaultSeoImageWidth,
  ogImageHeight: defaultSeoImageHeight,
  twitterImage: defaultSeoImage,
});

useHead({
  script: [
    jsonLdScript({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: `${siteName} Resume`,
      url: withSiteUrl("/resume"),
      description,
      mainEntity: {
        "@type": "Person",
        name: siteName,
        jobTitle: "Full-stack web developer",
        email: "mailto:youenn.legouedec@gmail.com",
        telephone: "+33619465867",
        image: defaultSeoImage,
        url: withSiteUrl("/"),
        sameAs: contactLinks
          .map((link) => link.href)
          .filter((href) => href.startsWith("https://")),
      },
    }),
  ],
});
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
        label="Print / Save PDF"
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
            Full-stack web developer
          </p>
          <h1
            class="mt-1 text-3xl font-semibold tracking-normal text-highlighted"
          >
            Youenn Le Gouedec
          </h1>
          <p class="mt-3 max-w-3xl text-sm leading-6 text-toned">
            Laravel, Vue and Nuxt developer based in Redon, France. I build and
            maintain SaaS products and business tools, from backend domain code
            and subscriptions to front-end interfaces, integrations, deployment
            workflows and production follow-up.
          </p>
        </div>

        <div class="flex items-start gap-4 sm:flex-col sm:items-end">
          <NuxtImg
            src="/8fdc0794-1657-4f9e-913e-c8997e5cddb2.webp"
            alt="Portrait of Youenn Le Gouedec"
            width="112"
            height="112"
            class="size-24 rounded-lg object-cover ring ring-default sm:size-28 print:size-24"
          />
          <div class="flex items-center gap-1 text-sm text-toned">
            <ResumeIcon name="map-pin" class="size-4 text-primary" />
            <span>Redon, France</span>
          </div>
        </div>
      </header>

      <section
        aria-label="Contact links"
        class="resume-contact grid gap-2 border-b border-muted py-4 text-sm sm:grid-cols-2 lg:grid-cols-3"
      >
        <a
          v-for="link in contactLinks"
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
            <h2 class="resume-section-title">Core Skills</h2>
            <div class="mt-3 space-y-4">
              <div v-for="group in skillGroups" :key="group.title">
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
            <h2 class="resume-section-title">Education</h2>
            <ul class="mt-3 space-y-2 text-sm leading-5 text-toned">
              <li v-for="item in education" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="resume-section-title">Languages</h2>
            <ul class="mt-3 space-y-2 text-sm leading-5 text-toned">
              <li>French: native</li>
              <li>English: professional working proficiency</li>
            </ul>
          </section>
        </aside>

        <div class="resume-main space-y-6">
          <section>
            <h2 class="resume-section-title">Experience</h2>
            <div class="mt-3 space-y-4">
              <article
                v-for="experience in experiences"
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
            <h2 class="resume-section-title">Selected Projects</h2>
            <div class="resume-projects mt-3 grid gap-3 sm:grid-cols-2">
              <article
                v-for="project in projects"
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
                    :aria-label="`Open ${project.name}`"
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
    --ui-primary: #1d4ed8;
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
