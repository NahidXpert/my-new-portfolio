# Nahid Nur Portfolio

Personal portfolio website for Nahid Nur, built with Next.js, React, TypeScript, and Tailwind CSS. The site presents a responsive introduction, selected projects, project case-study pages, and a contact form.

## Features

- Animated hero section with navigation to About, Projects, and Contact
- Responsive About section with a looping personal video
- Project cards with mobile-friendly tap interactions
- Individual project pages generated from the project data in [`lib/projects.ts`](./lib/projects.ts)
- Project detail pages with:
  - Project title and description
  - Technology tags
  - Live demo and source-code links
  - Autoplaying, muted, looping project video when available
  - Desktop screenshot
  - Full-length mobile screenshots in a responsive grid
- Contact form with submission feedback
- Custom favicon and web manifest
- Static generation for all project detail routes

## Featured projects

| Project | Live demo | Source code |
| --- | --- | --- |
| Gather & Thyme recipe app | [Open app](https://recipes-app-mu-nine.vercel.app) | [GitHub](https://github.com/NahidXpert/recipes-app) |
| News Reader | [Open app](https://news-reader-beryl.vercel.app) | [GitHub](https://github.com/NahidXpert/news-reader) |
| Mess Meal Management | [Open app](https://nahidxpert.github.io/mess-meal-manager/) | [GitHub](https://github.com/NahidXpert/mess-meal-manager) |

Project media is stored under [`public/project`](./public/project). Add or update a project by editing the corresponding entry in [`lib/projects.ts`](./lib/projects.ts).

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Geist Sans and Geist Mono fonts through `next/font`

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Install dependencies

```bash
npm ci
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available commands

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Start the production server
```

## Project structure

```text
app/
  page.tsx                 Home page
  layout.tsx               Global layout and metadata
  globals.css              Global styles
  projects/[slug]/page.tsx Project detail pages
components/                Reusable UI components
lib/projects.ts            Project content and media configuration
public/project/            Project videos and screenshots
```

## Deployment

The project is ready to deploy on [Vercel](https://vercel.com). Import the repository, use the default Next.js settings, and deploy.

### Contact form configuration

The contact form uses [Web3Forms](https://web3forms.com/) instead of FormSubmit. Create an access key using `nahidnurx@gmail.com`, then add it to a local `.env.local` file:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

Add the same variable in the Vercel project settings under **Settings → Environment Variables**, then redeploy. The access key is read from an environment variable and is not committed to the repository.
