export type ResumeLink = {
  label: string;
  href: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  description: string;
  stack: string;
  href: string;
};

export const resume = {
  name: "Youenn Le Gouedec",
  role: "Full-stack web developer",
  location: "Redon, France",
  summary:
    "Laravel, Vue and Nuxt developer based in Redon, France. I build and maintain SaaS products and business tools, from back-end domain code and subscriptions to interfaces, integrations, deployment and production follow-up. On the side I write Rust and Go, and contribute fixes to the open-source tools I use.",
  contact: [
    { label: "youenn.legouedec@gmail.com", href: "mailto:youenn.legouedec@gmail.com" },
    { label: "+33 6 19 46 58 67", href: "tel:+33619465867" },
    { label: "y-l.fr", href: "https://y-l.fr" },
    { label: "github.com/y-l-g", href: "https://github.com/y-l-g" },
    { label: "linkedin.com/in/y-l-g", href: "https://www.linkedin.com/in/y-l-g/" },
    { label: "malt.fr/profile/youennlegouedec", href: "https://www.malt.fr/profile/youennlegouedec" },
  ] satisfies ResumeLink[],
  skills: [
    {
      title: "Back end",
      items: ["Laravel", "PHP", "Symfony", "PostgreSQL", "Redis", "Queues", "Webhooks", "Stripe Cashier", "Filament"],
    },
    {
      title: "Front end",
      items: ["Vue", "Nuxt", "Inertia.js", "TypeScript", "Nuxt UI", "Tailwind CSS", "SSR"],
    },
    {
      title: "Systems",
      items: ["Rust", "Go", "C", "Toasty", "Topcoat", "Caddy modules"],
    },
    {
      title: "Production",
      items: ["Docker", "Caddy", "FrankenPHP", "Traefik", "k3s", "Argo CD", "GitOps", "Backups"],
    },
  ],
  experiences: [
    {
      role: "Full-stack web developer",
      company: "Karbonalpha",
      period: "Mar 2026 to Apr 2026",
      location: "Remote mission",
      bullets: [
        "Worked in a multi-tenant Laravel architecture for insurance workflows.",
        "Implemented back-end features around contracts, affiliation and budget management.",
        "Integrated Nuxt and Vue screens with API-connected customer and employee areas.",
      ],
    },
    {
      role: "Freelance full-stack developer",
      company: "Independent",
      period: "2025 to present",
      location: "Redon, France",
      bullets: [
        "Build and maintain SaaS products, business tools and interfaces with Laravel, Vue, Nuxt and Inertia.",
        "Own the full delivery path: domain code, subscriptions, admin workflows, integrations, deployment and production follow-up.",
        "Run lightweight infrastructure with Docker, k3s, Argo CD, PostgreSQL, Redis and backups.",
      ],
    },
    {
      role: "Digital support and IT services",
      company: "France Services / SAP Informatique",
      period: "2021 to 2025",
      location: "Redon, France",
      bullets: [
        "Helped individuals and local organizations with software, hardware, administrative and training needs.",
        "Built client-facing habits: clear explanations, diagnosis, documentation and practical support.",
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      name: "Webvite",
      description:
        "Production SaaS for small businesses: subscriptions, customer websites, custom domains, analytics and administration.",
      stack: "Laravel, Vue, Stripe",
      href: "https://webvite.eu",
    },
    {
      name: "Notenn",
      description:
        "Library of folk tunes in ABC notation, with arrangements, tunebooks, a multilingual interface and PostgreSQL search.",
      stack: "Laravel, Vue, Inertia, PostgreSQL",
      href: "https://notenn.com",
    },
    {
      name: "Tablo",
      description:
        "Admin toolkit for Rust: declare a resource per model and get server-rendered list, form and detail pages.",
      stack: "Rust, Topcoat, Toasty",
      href: "https://github.com/y-l-g/tablo",
    },
    {
      name: "FrankenPHP WebSocket",
      description:
        "Pusher-compatible WebSocket server compiled into FrankenPHP, with a native Laravel broadcaster.",
      stack: "Go, PHP, C, Caddy",
      href: "https://github.com/y-l-g/websocket",
    },
    {
      name: "Saasterkit",
      description:
        "Open-source Laravel starter kit with authentication, teams, roles, Stripe billing and an admin panel.",
      stack: "Laravel, Vue, Inertia, Nuxt UI",
      href: "https://github.com/y-l-g/saasterkit",
    },
    {
      name: "Pogo",
      description:
        "FrankenPHP module for request-scoped parallel PHP tasks running in isolated worker pools.",
      stack: "Go, PHP, FrankenPHP",
      href: "https://github.com/y-l-g/pogo",
    },
  ] satisfies ResumeProject[],
  upstream: "FrankenPHP, Nuxt UI, Laravel Wayfinder, Toasty, Topcoat",
  education: [
    "Bachelor's degree in Mathematics, Université de Rennes 1, 2013",
    "Engineering studies (unfinished), INSA Rennes, 2009 to 2011",
    "Baccalauréat S with highest honors, Lycée Charles de Gaulle, Vannes, 2009",
  ],
  languages: ["French, native", "English, professional working proficiency"],
};
