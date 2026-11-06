"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ReadMoreProps = {
  children: React.ReactNode;
  /** Collapsed height, in rem. Six lines of text-[15px]/leading-7 (1.75rem) = 10.5rem. */
  collapsedRem?: number;
  className?: string;
};

/**
 * Clamps long text to a fixed height with a fade and a "Read more" toggle.
 * The full text always stays in the DOM; only its visible height changes.
 */
export function ReadMore({ children, collapsedRem = 10.5, className }: ReadMoreProps) {
  const id = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  // Pixel height while expanded (so the transition has a numeric target); "none" once it has settled.
  const [maxHeight, setMaxHeight] = useState<string>(`${collapsedRem}rem`);

  const toggle = () => {
    const el = bodyRef.current;
    if (!el) return;
    if (expanded) {
      // Pin the current height first so the collapse can animate from a number.
      setMaxHeight(`${el.scrollHeight}px`);
      requestAnimationFrame(() => {
        setExpanded(false);
        setMaxHeight(`${collapsedRem}rem`);
      });
    } else {
      setExpanded(true);
      setMaxHeight(`${el.scrollHeight}px`);
    }
  };

  return (
    <div className={className}>
      <div
        ref={bodyRef}
        id={id}
        style={{ maxHeight }}
        onTransitionEnd={() => {
          if (expanded) setMaxHeight("none");
        }}
        className={cn(
          "overflow-hidden transition-[max-height] duration-500 ease-out motion-reduce:transition-none",
          !expanded && "[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]",
        )}
      >
        {children}
      </div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={toggle}
        className="mt-3 rounded-sm text-sm font-semibold text-accent-ink underline decoration-accent decoration-2 underline-offset-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
