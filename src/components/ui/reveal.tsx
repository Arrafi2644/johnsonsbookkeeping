"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  /** Element to render, so list items and articles keep valid markup. */
  as?: "div" | "li" | "article" | "section" | "figure";
  /** Stagger delay in ms. */
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
};

/** Fades and slides its content in the first time it scrolls into view. */
export function Reveal({ as: Tag = "div", delay = 0, direction = "up", className, style, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      data-in={shown}
      data-dir={direction}
      className={cn("reveal", className)}
      style={{ ...style, "--d": `${delay}ms` } as React.CSSProperties}
      {...props}
    />
  );
}
