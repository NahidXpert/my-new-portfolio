export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  gallery: string[];
  video?: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
}

export const projects: Project[] = [
  {
    slug: "recipe",
    title: "Gather & Thyme",
    eyebrow: "Recipe discovery platform",
    description:
      "A responsive recipe discovery app powered by TheMealDB. Search meals, browse by category, cuisine, or ingredient, follow complete recipe instructions, save favorites in IndexedDB, and keep exploring with offline support.",
    image: "/project/Screenshot 2026-11-02 001942.png",
    gallery: [
      "/project/Screenshot 2026-11-02 001942.png",
      "/project/Screenshot 2026-11-02 002039.png",
      "/project/Screen Shot 2026-11-02 at 00.21.35.png",
      "/project/Screen Shot 2026-11-02 at 00.29.17.png",
    ],
    video: "/project/recipe_app.mp4",
    tags: ["React", "Vite", "React Router", "TheMealDB API", "IndexedDB", "PWA"],
    liveUrl: "https://recipes-app-mu-nine.vercel.app",
    codeUrl: "https://github.com/NahidXpert/recipes-app",
  },
  {
    slug: "music-player",
    title: "Rogue Music Player",
    eyebrow: "Local music library",
    description:
      "A local-first music player for the browser. Import audio files without an account or upload service, read embedded metadata and cover art, organize tracks into playlists, and keep the complete library stored privately in IndexedDB.",
    image: "/project/Screenshot 2026-11-02 002809.png",
    gallery: [
      "/project/Screenshot 2026-11-02 002809.png",
      "/project/Screen Shot 2026-11-02 at 00.21.01.png",
      "/project/Screenshot 2026-11-02 001934.png",
      "/project/Screenshot 2026-11-02 001959.png",
    ],
    tags: ["React", "TypeScript", "Vite", "IndexedDB", "PWA", "Music Metadata"],
    liveUrl: "https://my-music-player-lake.vercel.app",
    codeUrl: "https://github.com/NahidXpert/my-music-player",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
