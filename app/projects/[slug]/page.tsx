import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-[0.25em] text-lime-400 transition hover:text-lime-300"
        >
          ← Back to projects
        </Link>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime-400">
              {project.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-7xl">
              {project.title}
            </h1>
          </div>
          <p className="text-lg leading-8 text-slate-300">
            {project.description}
          </p>
        </div>

        {project.video ? (
          <video
            className="mt-5 aspect-video w-full rounded-2xl border border-slate-800 object-cover"
            src={project.video}
            controls
            playsInline
          />
        ) : null}

        <div className="mt-16 flex flex-col gap-8 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-700 px-4 py-2 font-mono text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              View Live
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-600 px-5 py-3 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
