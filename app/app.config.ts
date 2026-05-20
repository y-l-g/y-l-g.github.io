export default defineAppConfig({
  global: {
    picture: {
      light: "/profile.png",
      dark: "/profile.png",
    },
    meetingLink: "https://calendly.com/youenn-le-gouedec/30min",
    maltLink: "https://www.malt.fr/profile/youennlegouedec",
    email: "youenn.legouedec@gmail.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
    },
    icons: {
      arrowLeft: "i-lucide-arrow-left",
      arrowRight: "i-lucide-arrow-right",
      chevronDown: "i-lucide-chevron-down",
      chevronLeft: "i-lucide-chevron-left",
      chevronRight: "i-lucide-chevron-right",
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
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-x",
        to: "https://x.com/_y_l_g_",
        target: "_blank",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/y-l-g",
        target: "_blank",
      },
      {
        icon: "i-simple-icons-malt",
        to: "https://www.malt.fr/profile/youennlegouedec",
        target: "_blank",
        ui: {
          leadingIcon: "size-12",
        },
      },
    ],
  },
  author: {
    name: "YL",
    avatar: {
      src: "/profile.png",
      alt: "YL",
    },
  },
});
