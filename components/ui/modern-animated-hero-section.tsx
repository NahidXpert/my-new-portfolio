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
          MD NAHID NUR · CSE STUDENT
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
