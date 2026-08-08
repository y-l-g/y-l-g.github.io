import { siteName } from "~/utils/seo";

export type ResumeIconName =
  | "external-link"
  | "github"
  | "linkedin"
  | "mail"
  | "malt"
  | "map-pin"
  | "phone";

export type Link = {
  label: string;
  href: string;
  icon?: ResumeIconName;
  iconClass?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
};

export type Project = {
  name: string;
  description: string;
  stack: string;
  href?: string;
};

export type ResumeContent = {
  seoTitle: string;
  seoDescription: string;
  jsonLdName: string;
  jsonLdJobTitle: string;
  printLabel: string;
  contactAriaLabel: string;
  role: string;
  name: string;
  summary: string;
  portraitAlt: string;
  location: string;
  openProjectLabel: string;
  sectionTitles: {
    skills: string;
    education: string;
    languages: string;
    experience: string;
    projects: string;
  };
  contactLinks: Link[];
  skillGroups: SkillGroup[];
  experiences: Experience[];
  projects: Project[];
  education: string[];
  languages: string[];
};

const sharedContactLinks: Link[] = [
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

export const resumeContent: Record<"fr" | "en", ResumeContent> = {
  fr: {
    seoTitle: "CV développeur web full-stack",
    seoDescription:
      "CV de Youenn Le Gouedec, développeur web full-stack spécialisé Laravel, Vue, Nuxt, produits SaaS et infrastructure de production pragmatique.",
    jsonLdName: `${siteName} CV`,
    jsonLdJobTitle: "Développeur web full-stack",
    printLabel: "Imprimer / Enregistrer en PDF",
    contactAriaLabel: "Liens de contact",
    role: "Développeur web full-stack",
    name: "Youenn Le Gouedec",
    summary:
      "Développeur Laravel, Vue et Nuxt basé à Redon. Je construis et maintiens des produits SaaS et outils métier, du code métier back-end et des abonnements jusqu'aux interfaces, intégrations, déploiements et suivi de production.",
    portraitAlt: "Portrait de Youenn Le Gouedec",
    location: "Redon, France",
    openProjectLabel: "Ouvrir",
    sectionTitles: {
      skills: "Compétences",
      education: "Formation",
      languages: "Langues",
      experience: "Expérience",
      projects: "Projets sélectionnés",
    },
    contactLinks: sharedContactLinks,
    skillGroups: [
      {
        title: "Backend",
        items: [
          "Laravel",
          "PHP",
          "Symfony",
          "PostgreSQL",
          "Redis",
          "Files d'attente",
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
          "Formulaires",
          "UI produit",
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
          "Sauvegardes",
          "Health checks",
        ],
      },
    ],
    experiences: [
      {
        role: "Développeur web full-stack",
        company: "Karbonalpha",
        period: "mars 2026 - avril 2026",
        location: "Mission à distance",
        bullets: [
          "Intervention dans une architecture Laravel multi-tenant complexe pour des parcours assurance.",
          "Développement back-end autour des contrats, affiliations et budgets.",
          "Intégration d'écrans Nuxt/Vue connectés aux espaces client et salarié.",
        ],
      },
      {
        role: "Développeur full-stack freelance",
        company: "Youenn Le Gouedec",
        period: "2025 - aujourd'hui",
        location: "Redon, France",
        bullets: [
          "Conception et maintenance de produits SaaS, outils métier et interfaces avec Laravel, Vue, Nuxt et Inertia.",
          "Prise en charge de parcours complets : domaine métier, abonnements, administration, intégrations, déploiement et suivi production.",
          "Infrastructure légère avec Docker, Kubernetes/GitOps, Argo CD, PostgreSQL, Redis et sauvegardes.",
        ],
      },
      {
        role: "Support numérique et services informatiques",
        company: "France Services / SAP Informatique",
        period: "2021 - 2025",
        location: "Redon, France",
        bullets: [
          "Aide aux particuliers et structures locales sur des besoins logiciels, matériels, administratifs et de formation.",
          "Habitudes solides de diagnostic, explication claire, documentation et support pragmatique.",
        ],
      },
    ],
    projects: [
      {
        name: "Webvite",
        description:
          "SaaS en production pour petites entreprises : abonnements, sites clients, domaines, analytics, administration et maintenance.",
        stack: "Laravel, Vue, SaaS, paiements, production",
        href: "https://webvite.eu",
      },
      {
        name: "Saasterkit",
        description:
          "Starter kit SaaS open source Laravel/Vue/Inertia avec authentification, équipes, rôles, facturation, administration et thème.",
        stack: "Laravel, Vue, Inertia, Nuxt UI, Stripe",
        href: "https://github.com/y-l-g/saasterkit",
      },
      {
        name: "Notenn",
        description:
          "Application musicale pour organiser, éditer, rendre et partager des partitions, avec interface multilingue et recherche PostgreSQL.",
        stack: "Laravel, Vue, Inertia, PostgreSQL, Docker",
        href: "https://notenn.com",
      },
      {
        name: "Pogo WebSocket",
        description:
          "Module WebSocket expérimental compatible Pusher pour FrankenPHP et Laravel broadcasting, autour des contraintes temps réel en PHP.",
        stack: "Go, PHP, FrankenPHP, WebSocket, Redis",
        href: "https://github.com/y-l-g/websocket",
      },
      {
        name: "y-l.fr & notes techniques",
        description:
          "Portfolio personnel et notes sur Laravel, Nuxt, architecture SaaS, GitOps, k3s et décisions de production.",
        stack: "Nuxt, Nuxt Content, Nuxt UI, SEO",
        href: "https://y-l.fr",
      },
      {
        name: "Pogo Async",
        description:
          "Package Composer et module FrankenPHP pour exécuter des jobs PHP parallèles dans des pools de workers isolés.",
        stack: "PHP, FrankenPHP, Go, Caddy, Composer",
        href: "https://github.com/y-l-g/pogo",
      },
    ],
    education: [
      "Licence de mathématiques, Université Rennes 1, 2013",
      "Formation d'ingénieur (non terminé), INSA Rennes, 2009-2011",
      "Baccalauréat S, mention très bien, Lycée Charles de Gaulle, Vannes, 2009",
    ],
    languages: [
      "Français : langue maternelle",
      "Anglais : usage professionnel",
    ],
  },
  en: {
    seoTitle: "Full-Stack Developer Resume",
    seoDescription:
      "Resume of Youenn Le Gouedec, full-stack web developer specializing in Laravel, Vue, Nuxt, SaaS products and pragmatic production infrastructure.",
    jsonLdName: `${siteName} Resume`,
    jsonLdJobTitle: "Full-stack web developer",
    printLabel: "Print / Save PDF",
    contactAriaLabel: "Contact links",
    role: "Full-stack web developer",
    name: "Youenn Le Gouedec",
    summary:
      "Laravel, Vue and Nuxt developer based in Redon, France. I build and maintain SaaS products and business tools, from backend domain code and subscriptions to front-end interfaces, integrations, deployment workflows and production follow-up.",
    portraitAlt: "Portrait of Youenn Le Gouedec",
    location: "Redon, France",
    openProjectLabel: "Open",
    sectionTitles: {
      skills: "Core Skills",
      education: "Education",
      languages: "Languages",
      experience: "Experience",
      projects: "Selected Projects",
    },
    contactLinks: sharedContactLinks,
    skillGroups: [
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
    ],
    experiences: [
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
    ],
    projects: [
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
    ],
    education: [
      "Bachelor's degree in Mathematics, Universite de Rennes 1, 2013",
      "Engineering studies (unfinished), INSA Rennes, 2009-2011",
      "Baccalaureat S, highest honors, Lycee Charles de Gaulle, Vannes, 2009",
    ],
    languages: ["French: native", "English: professional working proficiency"],
  },
};
