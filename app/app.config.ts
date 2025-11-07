export default defineAppConfig({
  global: {
    picture: {
      light: "/profile.png",
      dark: "/profile.png",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/",
    email: "wayeldev@gmail.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
    },
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
  },
  footer: {
    credits: `Built with Nuxt • ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-x",
        to: "https://x.com/_y_l_g_",
        target: "_blank",
        "aria-label": "YL on X",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/y-l-g",
        target: "_blank",
        "aria-label": "YL on GitHub",
      },
    ],
  },
  author: {
    name: "YL",
    avatar: {
      src: "/profile.png",
      alt: "YL}",
    },
  },
  toc: {
    title: "Table of Contents",
  },
  columns: [
    {
      label: "Backend",
      children: [
        {
          label: "Laravel",
          to: "https://laravel.com/",
        },
      ],
    },
    {
      label: "Frontent",
      children: [
        {
          label: "Vue",
          to: "https://vuejs.org/",
        },
        {
          label: "Nuxt",
          to: "https://nuxt.com/",
        },
      ],
    },
    {
      label: "Infrastructure",
      children: [
        {
          label: "Frankenphp",
          to: "https://frankenphp.dev/",
        },
        {
          label: "Docker",
          to: "https://www.docker.com/",
        },
      ],
    },
    {
      label: "Interests",
      children: [
        {
          label: "Go",
          to: "https://go.dev/",
        },
        {
          label: "Kubernetes",
          to: "https://kubernetes.io/",
        },
      ],
    },
  ],
});
