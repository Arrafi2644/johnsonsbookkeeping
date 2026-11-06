"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CountUpProps = {
  /** Final value to count up to. */
  value: number;
  /** Text appended after the number, e.g. "+", "%" or "K+". */
  suffix?: string;
  decimals?: number;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
};

/** Ease-out quartic: fast start, gentle landing. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts from 0 to `value` once the element scrolls into view.
 * The initial state is the final value, so server HTML (and no-JS or reduced-motion visitors) never sees 0.
 */
export function CountUp({ value, suffix = "", decimals = 0, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setCurrent(t < 1 ? value * easeOut(t) : value);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setCurrent(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const finalText = `${value.toFixed(decimals)}${suffix}`;
  return (
    <span ref={ref} role="img" aria-label={finalText} className={cn("tabular-nums", className)}>
      <span aria-hidden>
        {current.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
