"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Character {
  char: string;
  x: number;
  y: number;
  speed: number;
}

class TextScramble {
  private readonly element: HTMLElement;
  private readonly chars = "!<>-_\\/[]{}—=+*^?#";
  private queue: Array<{
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
  }> = [];
  private frame = 0;
  private frameRequest = 0;
  private resolve: () => void = () => {};

  constructor(element: HTMLElement) {
    this.element = element;
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const oldText = this.element.textContent ?? "";
    const length = Math.max(oldText.length, newText.length);

    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });

    this.queue = Array.from({ length }, (_, index) => {
      const start = Math.floor(Math.random() * 40);
      return {
        from: oldText[index] ?? "",
        to: newText[index] ?? "",
        start,
        end: start + Math.floor(Math.random() * 40),
      };
    });

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  stop() {
    cancelAnimationFrame(this.frameRequest);
  }

  private update() {
    let output = "";
    let complete = 0;

    for (const item of this.queue) {
      if (this.frame >= item.end) {
        complete++;
        output += item.to;
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        output += `<span class="dud">${item.char}</span>`;
      } else {
        output += item.from;
      }
    }

    this.element.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
      return;
    }

    this.frameRequest = requestAnimationFrame(this.update);
    this.frame++;
  }
}

function ScrambledTitle() {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const scramblerRef = useRef<TextScramble>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const scrambler = new TextScramble(elementRef.current);
    scramblerRef.current = scrambler;
    const phrases = [
      "Exploring intelligence.",
      "Exploring digital security",
      "Turning ideas into reality.",
      "Exploring what's possible",
    ];
    let counter = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const next = () => {
      if (cancelled) {
        return;
      }
      scrambler.setText(phrases[counter]).then(() => {
        if (!cancelled) {
          timeoutId = setTimeout(next, 2200);
        }
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

    return () => {
      cancelled = true;
      scrambler.stop();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <h1
      ref={elementRef}
      className="flex h-24 w-full max-w-4xl items-center justify-center text-center font-mono text-4xl font-bold leading-tight tracking-wider text-white sm:h-36 sm:text-6xl lg:h-44 lg:text-7xl"
    >
      I create for the web
    </h1>
  );
}

const CHARACTER_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

function RainingLetters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

  const createCharacters = useCallback(() => {
    return Array.from({ length: 240 }, () => ({
      char: CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  useEffect(() => {
    setCharacters(createCharacters());
  }, [createCharacters]);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      const nextActive = new Set<number>();
      const count = Math.floor(Math.random() * 3) + 3;
      for (let index = 0; index < count; index++) {
        nextActive.add(Math.floor(Math.random() * characters.length));
      }
      setActiveIndices(nextActive);
    }, 100);

    return () => clearInterval(flickerInterval);
  }, [characters.length]);

  useEffect(() => {
    let animationFrameId = 0;
    const updatePositions = () => {
      setCharacters((previous) =>
        previous.map((character) => {
          const nextY = character.y + character.speed;
          if (nextY < 100) {
            return { ...character, y: nextY };
          }
          return {
            ...character,
            y: -5,
            x: Math.random() * 100,
            char: CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)],
          };
        }),
      );
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-black">
      {characters.map((character, index) => {
        const isActive = activeIndices.has(index);
        return (
          <span
            key={index}
            className={`absolute font-mono text-[1.1rem] transition-colors duration-100 ${
              isActive
                ? "z-10 scale-125 font-bold text-lime-400"
                : "font-light text-slate-700"
            }`}
            style={{
              left: `${character.x}%`,
              top: `${character.y}%`,
              opacity: isActive ? 1 : 0.42,
              textShadow: isActive
                ? "0 0 8px rgba(163, 230, 53, 0.9), 0 0 18px rgba(163, 230, 53, 0.45)"
                : "none",
              transform: "translate(-50%, -50%)",
              willChange: "transform, top",
            }}
          >
            {character.char}
          </span>
        );
      })}
    </div>
  );
}

export default function ModernAnimatedHeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 py-24">
      <RainingLetters />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_45%,#000_100%)]" />
      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-lime-400 sm:text-sm">
          MD NAHID NUR · CSE UNDERGRADUATE
        </p>
        <ScrambledTitle />
        <p className="mt-8 flex h-24 w-full max-w-xl shrink-0 items-start justify-center px-2 text-center text-base leading-7 text-slate-300 sm:h-14 sm:px-0 sm:text-lg">
          Passionate about AI/ML, Cybersecurity, and building meaningful
          software solutions.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#work"
            className="rounded-full bg-lime-400 px-7 py-3 text-sm font-bold text-black transition hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
          >
            Explore my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-slate-600 px-7 py-3 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
          >
            Let&apos;s talk
          </a>
        </div>
        <div className="mt-8 flex items-center gap-5 text-slate-400">
          <a
            href="https://github.com/NahidXpert"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/nahiidnur/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.22 0H1.78C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/_nahidnur_/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current">
              <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
            </svg>
          </a>
        </div>
      </div>
      <style jsx global>{`
        .dud {
          color: #a3e635;
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}
