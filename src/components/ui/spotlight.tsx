"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = React.ComponentProps<"div"> & {
  /** Element to render. */
  as?: "div" | "li" | "article" | "section";
};

/**
 * Tracks the mouse and writes --mx / --my (px, relative to the element) straight to the DOM,
 * so the `.spotlight` glow follows the cursor without ever re-rendering React.
 * Touch and pen pointers and reduced-motion users are ignored.
 */
export function Spotlight({ as: Tag = "div", className, children, onPointerMove, ...props }: SpotlightProps) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  // Cancel a pending frame on unmount.
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={cn("spotlight", className)} onPointerMove={handlePointerMove} {...props}>
      {children}
    </Comp>
  );
}
