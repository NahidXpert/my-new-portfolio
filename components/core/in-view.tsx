"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface InViewProps {
  children: ReactNode;
  variants: {
    hidden: CSSProperties;
    visible: CSSProperties;
  };
  viewOptions?: IntersectionObserverInit;
  transition?: {
    duration?: number;
    ease?: string;
  };
}

export function InView({
  children,
  variants,
  viewOptions,
  transition = {},
}: InViewProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, viewOptions);
    observer.observe(element);

    return () => observer.disconnect();
  }, [viewOptions]);

  const activeVariant = isVisible ? variants.visible : variants.hidden;
  const duration = transition.duration ?? 0.3;
  const ease = transition.ease ?? "ease-in-out";

  return (
    <div
      ref={elementRef}
      style={{
        ...activeVariant,
        transition: `opacity ${duration}s ${ease}, transform ${duration}s ${ease}, filter ${duration}s ${ease}`,
      }}
    >
      {children}
    </div>
  );
}
