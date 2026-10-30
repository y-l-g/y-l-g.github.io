export type Language =
  | "PHP"
  | "Vue"
  | "TypeScript"
  | "Go"
  | "C"
  | "Rust"
  | "JavaScript";

export type Link = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  summary: string;
  stack: string[];
  // Share of the repository's code, from GitHub's language statistics.
  languages: [Language, number][];
  links: Link[];
};

export type Contribution = {
  name: string;
  repo: string;
  note: string;
  languages: Language[];
  href: string;
};

export const links = {
  call: "https://calendly.com/youenn-le-gouedec/30min",
  github: "https://github.com/y-l-g",
  email: "mailto:youenn.legouedec@gmail.com",
};

export const projects: Project[] = [
  {
    name: "Notenn",
    summary:
      "A library of folk tunes written in ABC notation. Musicians arrange, collect and share scores, with full-text search across thousands of tunes.",
    stack: ["Laravel", "Vue", "Inertia", "PostgreSQL"],
    languages: [
      ["PHP", 52],
      ["Vue", 42],
      ["TypeScript", 6],
    ],
    links: [{ label: "notenn.com", href: "https://notenn.com" }],
  },
  {
    name: "Webvite",
    summary:
      "Websites for small businesses, sold as a subscription. Running in production with paying customers.",
    stack: ["Laravel", "Vue", "Stripe"],
    languages: [
      ["PHP", 63],
      ["Vue", 27],
      ["TypeScript", 10],
    ],
    links: [{ label: "webvite.eu", href: "https://webvite.eu" }],
  },
  {
    name: "Tablo",
    summary:
      "An admin toolkit for Rust. Declare a resource per model and get its list, form and detail pages, server-rendered, with no SPA build step.",
    stack: ["Rust", "Topcoat", "Toasty"],
    languages: [
      ["Rust", 97],
      ["JavaScript", 3],
    ],
    links: [
      { label: "y-l-g/tablo", href: "https://github.com/y-l-g/tablo" },
      { label: "guide", href: "https://y-l.fr/tablo/" },
    ],
  },
  {
    name: "FrankenPHP WebSocket",
    summary:
      "A Pusher-compatible WebSocket server compiled into the FrankenPHP binary. Laravel broadcasts through native calls instead of HTTP.",
    stack: ["Go", "Caddy", "FrankenPHP", "Laravel"],
    languages: [
      ["Go", 83],
      ["PHP", 16],
      ["C", 1],
    ],
    links: [
      { label: "y-l-g/websocket", href: "https://github.com/y-l-g/websocket" },
    ],
  },
  {
    name: "Saasterkit",
    summary:
      "A Laravel starter kit for SaaS products: authentication, teams, roles, Stripe billing and an admin panel.",
    stack: ["Laravel", "Vue", "Inertia", "Nuxt UI"],
    languages: [
      ["PHP", 64],
      ["Vue", 30],
      ["TypeScript", 6],
    ],
    links: [
      { label: "y-l-g/saasterkit", href: "https://github.com/y-l-g/saasterkit" },
      { label: "saasterkit.y-l.fr", href: "https://saasterkit.y-l.fr" },
    ],
  },
];

export const contributions: Contribution[] = [
  {
    name: "FrankenPHP",
    repo: "php/frankenphp",
    note: "Segfault with several extensions, extension workers docs",
    languages: ["PHP", "Go", "C"],
    href: "https://github.com/php/frankenphp/pulls?q=is%3Apr+author%3Ay-l-g+is%3Amerged",
  },
  {
    name: "Nuxt UI",
    repo: "nuxt/ui",
    note: "Server rendering crash under Inertia",
    languages: ["TypeScript", "Vue"],
    href: "https://github.com/nuxt/ui/pull/5396",
  },
  {
    name: "Laravel Wayfinder",
    repo: "laravel/wayfinder",
    note: "Crash on lazily rendered Blade views",
    languages: ["PHP", "TypeScript"],
    href: "https://github.com/laravel/wayfinder/pull/177",
  },
  {
    name: "Toasty",
    repo: "tokio-rs/toasty",
    note: "Enum fields resolved by variant-local index",
    languages: ["Rust"],
    href: "https://github.com/tokio-rs/toasty/pull/1218",
  },
  {
    name: "Topcoat",
    repo: "tokio-rs/topcoat",
    note: "Errors made cheap to clone",
    languages: ["Rust"],
    href: "https://github.com/tokio-rs/topcoat/pull/396",
  },
];
