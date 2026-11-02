"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/#home" className="flex items-center gap-3">
          <Image
            src="/android-chrome-192x192.png"
            alt="MD Nahid Nur"
            className="h-9 w-9 rounded-lg"
            width={36}
            height={36}
          />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs sm:tracking-[0.2em]">
            MD Nahid Nur
          </span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-4 sm:flex sm:gap-8"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300 transition hover:text-lime-400 sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-700 text-slate-300 transition hover:border-lime-400 hover:text-lime-400 sm:hidden"
        >
          <span
            className={`h-px w-5 bg-current transition ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-current transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-current transition ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      <nav
        aria-label="Mobile navigation"
        className={`overflow-hidden border-t border-white/10 px-6 transition-[max-height,opacity,padding] duration-500 ease-in-out sm:hidden ${
          isOpen
            ? "max-h-96 py-4 opacity-100"
            : "pointer-events-none max-h-0 py-0 opacity-0"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl flex-col gap-1 transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 transition hover:bg-slate-900 hover:text-lime-400"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-5 border-t border-white/10 px-3 pt-4">
            <Link
              href="https://github.com/NahidXpert"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-slate-400 transition hover:text-lime-400"
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/nahiidnur/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 transition hover:text-lime-400"
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="https://www.instagram.com/_nahidnur_/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-slate-400 transition hover:text-lime-400"
            >
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current">
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
    </svg>
  );
}
