import { Sparkles } from "lucide-react";
import { content } from "@/lib/content";

/** Endless ticker of the six services, sitting between the hero and the stats. Pauses on hover. */
export function Marquee() {
  const items = content.services.map((s) => s.title);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 pr-8 font-serif text-lg font-medium sm:text-xl">
          {t}
          <Sparkles aria-hidden className="size-4 shrink-0" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative z-0 overflow-hidden bg-accent py-4 text-accent-foreground" aria-label="Our services">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
