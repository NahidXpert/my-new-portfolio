"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950"
      onClick={() => setIsOpen((open) => !open)}
    >
      <img
        src={project.image}
        alt={`${project.title} project preview`}
        className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-50"
      />
      <div
        className={`absolute inset-0 flex translate-y-0 flex-col items-center justify-center bg-black/50 p-6 text-center transition duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        } md:pointer-events-auto`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime-400">
          {project.eyebrow}
        </p>
        <h3 className="mt-3 text-3xl font-bold text-white">{project.title}</h3>
        <Link
          href={`/projects/${project.slug}`}
          onClick={(event) => event.stopPropagation()}
          className="mt-6 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
