"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky header wrapper. Its only job is to track scroll: it sets `data-scrolled` so server-rendered
 * children can restyle themselves with `group-data-[scrolled=true]/header:*` classes.
 */
export function HeaderShell({ topStrip, children }: { topStrip: React.ReactNode; children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "group/header on-dark sticky top-0 z-40 text-primary-foreground transition-[background-color,box-shadow,backdrop-filter] duration-200",
        scrolled ? "bg-primary/90 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.55)] backdrop-blur-lg" : "bg-primary",
      )}
    >
      {/* grid-rows 1fr -> 0fr collapses the strip smoothly without measuring it */}
      <div
        className={cn(
          "hidden md:grid transition-[grid-template-rows,opacity] duration-200",
          scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
        )}
        aria-hidden={scrolled || undefined}
        inert={scrolled || undefined}
      >
        <div className="overflow-hidden">{topStrip}</div>
      </div>
      {children}
      {/* 1px gold hairline along the bottom edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
    </header>
  );
}
