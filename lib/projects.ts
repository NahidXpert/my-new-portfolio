export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  desktopImage: string;
  mobileImages: string[];
  video?: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
}

export const projects: Project[] = [
  {
    slug: "recipe-app",
    title: "Gather & Thyme",
    eyebrow: "Recipe discovery platform",
    description:
      "A responsive recipe discovery app powered by TheMealDB. Search meals, browse by category, cuisine, or ingredient, follow complete recipe instructions, save favorites in IndexedDB, and keep exploring with offline support.",
    image: "/project/recipe-app/image-1.png",
    desktopImage: "/project/recipe-app/image-1.png",
    mobileImages: [
      "/project/recipe-app/Screen Shot 2026-11-02 at 00.21.01.png",
      "/project/recipe-app/Screen Shot 2026-11-02 at 00.21.56.png",
      "/project/recipe-app/Screen Shot 2026-11-03 at 19.52.35.png",
    ],
    video: "/project/recipe-app/recipe-app.mp4",
    tags: ["React", "Vite", "React Router", "TheMealDB API", "IndexedDB", "PWA"],
    liveUrl: "https://recipes-app-mu-nine.vercel.app",
    codeUrl: "https://github.com/NahidXpert/recipes-app",
  },
  {
    slug: "news-reader",
    title: "News Reader",
    eyebrow: "Responsive news platform",
    description:
      "A clean, responsive news reading experience designed to make browsing the latest stories simple and comfortable on every screen.",
    image: "/project/news-reader/image-news.png",
    desktopImage: "/project/news-reader/image-news.png",
    mobileImages: ["/project/news-reader/Screen Shot 2026-11-03 at 20.33.41.png"],
    tags: ["React", "TypeScript", "Responsive UI", "News API"],
    liveUrl: "https://news-reader-beryl.vercel.app",
    codeUrl: "https://github.com/NahidXpert/news-reader",
  },
  {
    slug: "mess-meal-management",
    title: "Mess Meal Management",
    eyebrow: "Meal management platform",
    description:
      "A lightweight browser-based mess management system for tracking members, daily meals, grocery expenses, inventory, deposits, cook bills, and monthly settlements. Built as a dependency-free single-page app with local browser storage, data backup, and restore support.",
    image: "/project/mess-meal-management/Screenshot 2026-11-03 203440.png",
    desktopImage: "/project/mess-meal-management/Screenshot 2026-11-03 203440.png",
    mobileImages: [
      "/project/mess-meal-management/Screen Shot 2026-11-03 at 20.35.28.png",
      "/project/mess-meal-management/Screen Shot 2026-11-03 at 21.58.05.png",
      "/project/mess-meal-management/Screen Shot 2026-11-03 at 21.59.19.png",
    ],
    video: "/project/mess-meal-management/Untitled design.mp4",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "LocalStorage",
      "Inventory",
      "Expense Tracking",
      "Responsive UI",
    ],
    liveUrl: "https://nahidxpert.github.io/mess-meal-manager/",
    codeUrl: "https://github.com/NahidXpert/mess-meal-manager",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
