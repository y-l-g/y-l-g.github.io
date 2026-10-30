<script setup lang="ts">
import { contributions, links, projects } from "~/data/work";
import type { Language } from "~/data/work";

usePageSeo({
  title: "Youenn Le Gouedec, full-stack developer",
  description:
    "Full-stack developer in Redon, France. Laravel and Vue products, Rust and Go tooling, and fixes sent upstream to FrankenPHP, Nuxt UI, Wayfinder, Toasty and Topcoat.",
  path: "/",
  jsonLd: {
    "@type": "Person",
    name: siteName,
    url: siteUrl,
    image: portrait,
    jobTitle: "Full-stack developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Redon",
      addressCountry: "FR",
    },
    sameAs: [links.github],
  },
});

const pad = (n: number) => String(n).padStart(2, "0");
const swatch = (language: Language) => ({
  "--swatch": `var(--${language.toLowerCase()})`,
});
</script>

<template>
  <div class="page">
    <figure class="portrait">
      <img
        src="/portrait.webp"
        alt="Painted portrait of Youenn Le Gouedec"
        width="900"
        height="900"
        fetchpriority="high"
      >
      <figcaption>
        <span>Redon, Brittany</span>
        <span>47.65° N, 2.08° W</span>
      </figcaption>
    </figure>

    <main class="content">
      <header class="intro">
        <p class="kicker">Full-stack developer</p>
        <h1>Youenn <em>Le Gouedec</em></h1>
        <p class="lede">
          I build products with Laravel and Vue, write Rust and Go when the
          problem asks for it, and send fixes upstream when a tool I depend on
          breaks.
        </p>
        <nav class="actions" aria-label="Contact">
          <a class="call" :href="links.call" rel="noopener">Book a call</a>
          <NuxtLink to="/resume">Resume</NuxtLink>
          <a :href="links.github" rel="noopener">GitHub</a>
        </nav>
      </header>

      <section aria-labelledby="projects">
        <h2 id="projects" class="heading">
          Projects <span>{{ pad(projects.length) }}</span>
        </h2>
        <ol class="projects">
          <li
            v-for="(project, i) in projects"
            :key="project.name"
            class="project"
            :style="{ '--i': i }"
          >
            <span class="index" aria-hidden="true">{{ pad(i + 1) }}</span>
            <div class="project-body">
              <div class="project-head">
                <h3>{{ project.name }}</h3>
                <ul class="project-links">
                  <li v-for="link in project.links" :key="link.href">
                    <a :href="link.href" rel="noopener">{{ link.label }}</a>
                  </li>
                </ul>
              </div>
              <p class="summary">{{ project.summary }}</p>
              <div class="bar" aria-hidden="true">
                <span
                  v-for="[language, share] in project.languages"
                  :key="language"
                  :style="{ ...swatch(language), flexGrow: share }"
                />
              </div>
              <div class="meta">
                <ul class="languages" aria-label="Languages">
                  <li
                    v-for="[language, share] in project.languages"
                    :key="language"
                    :style="swatch(language)"
                  >
                    {{ language }} <span>{{ share }}%</span>
                  </li>
                </ul>
                <p class="stack">{{ project.stack.join(" / ") }}</p>
              </div>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="contributions">
        <h2 id="contributions" class="heading">
          Contributions <span>{{ pad(contributions.length) }}</span>
        </h2>
        <ul class="upstream">
          <li v-for="item in contributions" :key="item.repo">
            <a :href="item.href" rel="noopener">
              <span class="upstream-name">
                <span class="name">{{ item.name }}</span>
                <span class="repo">{{ item.repo }}</span>
              </span>
              <span class="note">{{ item.note }}</span>
              <span class="languages">
                <span
                  v-for="language in item.languages"
                  :key="language"
                  :style="swatch(language)"
                >{{ language }}</span>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
}

/* Portrait */

.portrait {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #dfe3ea;
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
}

.portrait figcaption {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem;
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.02em;
  color: #2a3248;
}

/* Content */

.content {
  padding: 2.75rem 1rem 5rem;
  max-width: 48rem;
}

.intro {
  padding-bottom: 3.5rem;
}

.kicker {
  font-family: var(--mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-2);
}

h1 {
  margin-top: 1.1rem;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(3.75rem, 17vw, 7.25rem);
  line-height: 0.88;
  letter-spacing: -0.025em;
}

h1 em {
  display: block;
  font-style: italic;
  color: var(--accent);
}

.lede {
  margin-top: 1.75rem;
  max-width: 34rem;
  font-size: 1.1875rem;
  line-height: 1.5;
  text-wrap: pretty;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.75rem;
  margin-top: 2.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
}

.actions a {
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 0.15rem;
  transition: border-color 0.2s;
}

.actions a:hover {
  border-color: var(--ink);
}

.actions .call {
  border: 0;
  padding: 0.7rem 1.15rem;
  background: var(--ink);
  color: var(--paper);
  border-radius: 2px;
  transition: background-color 0.2s;
}

.actions .call:hover {
  background: var(--accent);
}

/* Section headings */

section + section {
  margin-top: 4.5rem;
}

.heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--ink);
  font-family: var(--serif);
  font-weight: 400;
  font-style: italic;
  font-size: 2.25rem;
  line-height: 1;
}

.heading span {
  font-family: var(--mono);
  font-style: normal;
  font-size: 0.75rem;
  color: var(--ink-3);
}

/* Projects */

.project {
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--rule);
}

.index {
  padding-top: 0.55rem;
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--ink-3);
}

.project-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1.5rem;
}

.project h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 2rem;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.project-links {
  display: flex;
  gap: 1.25rem;
  font-family: var(--mono);
  font-size: 0.75rem;
}

.project-links a,
.upstream a {
  text-decoration: none;
}

.project-links a {
  color: var(--accent);
}

.project-links a::after,
.upstream .name::after {
  content: "\2197";
  display: inline-block;
  margin-left: 0.3em;
  transition: transform 0.2s;
}

.project-links a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.project-links a:hover::after,
.upstream a:hover .name::after {
  transform: translate(2px, -2px);
}

.summary {
  margin-top: 0.6rem;
  max-width: 36rem;
  color: var(--ink-2);
  text-wrap: pretty;
}

.bar {
  display: flex;
  gap: 2px;
  height: 4px;
  margin-top: 1.25rem;
}

.bar span {
  flex-basis: 0;
  min-width: 3px;
  background: var(--swatch);
  transform-origin: left;
  animation: grow 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i) * 80ms + 150ms);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  margin-top: 0.7rem;
  font-family: var(--mono);
  font-size: 0.75rem;
}

.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
}

.languages > * {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  white-space: nowrap;
}

.languages > *::before {
  content: "";
  width: 7px;
  height: 7px;
  background: var(--swatch);
}

.languages li span {
  color: var(--ink-3);
}

.stack {
  color: var(--ink-3);
}

/* Upstream */

.upstream a {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.3rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--rule);
}

.name {
  font-size: 1.0625rem;
  font-weight: 500;
  transition: color 0.2s;
}

.upstream .name::after {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--ink-3);
}

.upstream a:hover .name {
  color: var(--accent);
}

.repo {
  display: block;
  font-family: var(--mono);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--ink-3);
}

.note {
  font-size: 0.9375rem;
  color: var(--ink-2);
}

.upstream .languages {
  font-family: var(--mono);
  font-size: 0.75rem;
}

/* Load-in */

.portrait img {
  animation: settle 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes settle {
  from {
    transform: scale(1.05);
  }
}

@keyframes grow {
  from {
    transform: scaleX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}

/* Wider screens */

@media (min-width: 640px) {
  .content {
    padding: 3.5rem 2.5rem 6rem;
  }

  .portrait {
    aspect-ratio: 16 / 10;
  }

  .project {
    grid-template-columns: 3.5rem 1fr;
  }

  .upstream a {
    grid-template-columns: 11.5rem 1fr auto;
    align-items: baseline;
    gap: 1.5rem;
  }

  .upstream .languages {
    justify-content: flex-end;
  }
}

@media (min-width: 1024px) {
  .page {
    display: grid;
    grid-template-columns: minmax(20rem, 40vw) 1fr;
  }

  .portrait {
    position: sticky;
    top: 0;
    height: 100vh;
    aspect-ratio: auto;
  }

  .portrait img {
    object-position: 50% 50%;
  }

  .portrait figcaption {
    padding: 1.25rem 1.5rem;
  }

  .content {
    padding: 6.5rem clamp(3rem, 6vw, 6rem) 7rem;
    max-width: 58rem;
  }

  .intro {
    padding-bottom: 5rem;
  }
}
</style>
