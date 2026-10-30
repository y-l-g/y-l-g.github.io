<script setup lang="ts">
import { resume } from "~/data/resume";

usePageSeo({
  title: "Resume, Youenn Le Gouedec",
  description:
    "Resume of Youenn Le Gouedec, full-stack web developer working with Laravel, Vue, Nuxt, Rust and Go, based in Redon, France.",
  path: "/resume",
  type: "profile",
  jsonLd: {
    "@type": "ProfilePage",
    url: `${siteUrl}/resume`,
    mainEntity: {
      "@type": "Person",
      name: siteName,
      jobTitle: resume.role,
      email: "mailto:youenn.legouedec@gmail.com",
      image: portrait,
      url: siteUrl,
      sameAs: resume.contact
        .map((link) => link.href)
        .filter((href) => href.startsWith("https://") && href !== siteUrl),
    },
  },
});

const print = () => window.print();
</script>

<template>
  <div class="resume">
    <div class="toolbar">
      <NuxtLink to="/">y-l.fr</NuxtLink>
      <button type="button" @click="print">Print or save as PDF</button>
    </div>

    <article class="sheet">
      <header class="head">
        <div>
          <p class="role">{{ resume.role }}</p>
          <h1>{{ resume.name }}</h1>
          <p class="summary">{{ resume.summary }}</p>
        </div>
        <img
          src="/portrait.webp"
          alt="Painted portrait of Youenn Le Gouedec"
          width="112"
          height="112"
        >
      </header>

      <ul class="contact" aria-label="Contact">
        <li>{{ resume.location }}</li>
        <li v-for="link in resume.contact" :key="link.href">
          <a :href="link.href" rel="noopener">{{ link.label }}</a>
        </li>
      </ul>

      <div class="body">
        <aside>
          <section>
            <h2>Skills</h2>
            <div v-for="group in resume.skills" :key="group.title" class="group">
              <h3>{{ group.title }}</h3>
              <p>{{ group.items.join(", ") }}</p>
            </div>
          </section>

          <section>
            <h2>Open source</h2>
            <p>Merged fixes in {{ resume.upstream }}.</p>
          </section>

          <section>
            <h2>Education</h2>
            <ul class="plain">
              <li v-for="item in resume.education" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2>Languages</h2>
            <ul class="plain">
              <li v-for="item in resume.languages" :key="item">{{ item }}</li>
            </ul>
          </section>
        </aside>

        <div class="main">
          <section>
            <h2>Experience</h2>
            <article
              v-for="job in resume.experiences"
              :key="job.company + job.role"
              class="job"
            >
              <div class="job-head">
                <h3>{{ job.role }}</h3>
                <p class="period">{{ job.period }}</p>
              </div>
              <p class="where">{{ job.company }}, {{ job.location }}</p>
              <ul class="bullets">
                <li v-for="bullet in job.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </article>
          </section>

          <section>
            <h2>Selected projects</h2>
            <div class="projects">
              <article v-for="project in resume.projects" :key="project.name">
                <h3>
                  <a :href="project.href" rel="noopener">{{ project.name }}</a>
                </h3>
                <p>{{ project.description }}</p>
                <p class="stack">{{ project.stack }}</p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.resume {
  padding: 1rem 1rem 4rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 56rem;
  margin: 0 auto 1rem;
  font-family: var(--mono);
  font-size: 0.75rem;
}

.toolbar a {
  text-decoration: none;
}

.toolbar a::before {
  content: "\2190";
  margin-right: 0.4em;
}

.toolbar button {
  font: inherit;
  color: var(--paper);
  background: var(--ink);
  border: 0;
  border-radius: 2px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
}

.toolbar button:hover {
  background: var(--accent);
}

.sheet {
  max-width: 56rem;
  margin: 0 auto;
  padding: 1.75rem 1.25rem;
  border: 1px solid var(--rule);
  font-size: 0.875rem;
  line-height: 1.5;
}

.head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--ink);
}

.head img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
}

.role,
h2,
.period,
.stack,
.contact {
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.02em;
}

.role {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
}

h1 {
  margin-top: 0.35rem;
  font-family: var(--serif);
  font-weight: 400;
  font-size: 2.75rem;
  line-height: 1;
  letter-spacing: -0.015em;
}

.summary {
  margin-top: 0.85rem;
  max-width: 40rem;
  color: var(--ink-2);
}

.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 1.25rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--rule);
  color: var(--ink-2);
}

.contact a {
  text-decoration: none;
}

.contact a:hover {
  color: var(--accent);
}

.body {
  display: grid;
  gap: 1.5rem;
  padding-top: 1.25rem;
}

section + section {
  margin-top: 1.4rem;
}

h2 {
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-3);
}

h3 {
  font-size: 0.875rem;
  font-weight: 600;
}

.group + .group {
  margin-top: 0.6rem;
}

.group p,
aside p,
.plain {
  color: var(--ink-2);
}

.plain li + li {
  margin-top: 0.3rem;
}

.job + .job {
  margin-top: 1rem;
}

.job-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.period {
  color: var(--ink-3);
  white-space: nowrap;
}

.where {
  color: var(--accent);
}

.bullets {
  margin-top: 0.35rem;
  color: var(--ink-2);
}

.bullets li {
  position: relative;
  padding-left: 0.9rem;
}

.bullets li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 0.35rem;
  height: 1px;
  background: var(--ink-3);
}

.projects {
  display: grid;
  gap: 0.9rem 1.5rem;
}

.projects article {
  break-inside: avoid;
}

.projects a {
  text-decoration: none;
}

.projects a::after {
  content: "\2197";
  margin-left: 0.3em;
  font-weight: 400;
  color: var(--ink-3);
}

.projects a:hover {
  color: var(--accent);
}

.projects p {
  color: var(--ink-2);
}

.projects .stack {
  margin-top: 0.15rem;
  color: var(--ink-3);
}

@media (min-width: 720px) {
  .resume {
    padding-top: 2rem;
  }

  .sheet {
    padding: 2.5rem 2.75rem;
  }

  .head img {
    width: 7rem;
    height: 7rem;
  }

  .body {
    grid-template-columns: 14rem 1fr;
    gap: 2.25rem;
  }

  .projects {
    grid-template-columns: 1fr 1fr;
  }
}

@media print {
  @page {
    size: A4;
    margin: 11mm;
  }

  :global(:root) {
    --paper: #fff;
    --ink: #111;
    --ink-2: #333;
    --ink-3: #6b6b6b;
    --rule: #d6d6d6;
    --accent: #9a4a1b;
  }

  :global(body) {
    background: #fff;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .resume {
    padding: 0;
  }

  .toolbar {
    display: none;
  }

  .sheet {
    max-width: none;
    padding: 0;
    border: 0;
    font-size: 8.6pt;
  }

  h1 {
    font-size: 26pt;
  }

  .head img {
    width: 24mm;
    height: 24mm;
  }

  .body {
    grid-template-columns: 50mm 1fr;
    gap: 7mm;
  }

  .projects {
    grid-template-columns: 1fr 1fr;
  }

  .projects a::after {
    content: none;
  }
}
</style>
