import { Star } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { CountUp } from "@/components/ui/count-up";
import { content } from "@/lib/content";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const RING_RADIUS = 16;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const STAR_COUNT = 5;

/** Small progress ring beside a percentage figure. The arc redraws when the parent `group/stat` is hovered. */
function PercentRing({ percent }: { percent: number }) {
  const filled = (RING_CIRCUMFERENCE * percent) / 100;
  return (
    <svg aria-hidden viewBox="0 0 40 40" className="size-8 shrink-0 -rotate-90 sm:size-10">
      <circle cx="20" cy="20" r={RING_RADIUS} fill="none" strokeWidth="4" className="stroke-border" />
      <circle
        cx="20"
        cy="20"
        r={RING_RADIUS}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${RING_CIRCUMFERENCE}`}
        style={{ "--ring-from": filled } as React.CSSProperties}
        className="stroke-accent group-hover/stat:[animation:ring-draw_900ms_ease-out]"
      />
    </svg>
  );
}

/** Five filled gold stars that pop in sequence (60ms apart) when the stat column is hovered. */
function StarRow() {
  return (
    <div aria-hidden className="mt-3 flex gap-0.5">
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <Star
          key={i}
          style={{ "--i": i } as React.CSSProperties}
          className="size-4 fill-accent text-accent transition-transform duration-200 ease-out [transition-delay:calc(var(--i)*60ms)] group-hover/stat:scale-125"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/** One large panel with four counters, sitting below the gold ticker. */
export function Stats() {
  return (
    <Section
      aria-label="Our track record"
      className="hover-fx relative z-10 pb-10 pt-8 [background-image:radial-gradient(color-mix(in_srgb,var(--primary)_4%,transparent)_1.5px,transparent_1.5px)] [background-size:24px_24px] lg:pb-14 lg:pt-10"
    >
      <Reveal>
        <Spotlight className="rounded-3xl border border-border bg-card p-4 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-12px_rgb(0_0_0/0.12),0_32px_64px_-24px_rgb(0_0_0/0.14)] lg:p-6">
          <ul className="relative z-10 grid grid-cols-2 lg:grid-cols-4">
            {content.stats.map((s, i) => {
              const Icon = icons[s.icon];
              return (
                <li
                  key={s.label}
                  className={cn(
                    "px-1 py-3 lg:px-2 lg:py-0",
                    // Hairline dividers: vertical between columns, horizontal between mobile rows.
                    i % 2 === 1 && "border-l",
                    i >= 2 && "border-t lg:border-t-0",
                    i > 0 && "lg:border-l",
                  )}
                >
                  <div className="group/stat h-full rounded-2xl p-3 ring-[1.5px] ring-transparent transition-[translate,background-color,--tw-ring-color] duration-[250ms] ease-out hover:-translate-y-1 hover:bg-muted/60 hover:ring-accent focus-within:ring-accent sm:p-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-accent-ink transition-[rotate,scale,background-color,color] duration-[250ms] ease-out group-hover/stat:rotate-6 group-hover/stat:scale-105 group-hover/stat:bg-primary group-hover/stat:text-accent">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {/* The ::after underline sweeps left to right under the number. */}
                      <span className="relative inline-block after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-[400ms] after:ease-out group-hover/stat:after:scale-x-100">
                        <CountUp
                          value={s.value}
                          suffix={s.suffix}
                          decimals={s.decimals}
                          className="font-serif text-[clamp(2rem,3.4vw,3.5rem)] leading-none text-primary"
                        />
                      </span>
                      {s.suffix === "%" && <PercentRing percent={s.value} />}
                    </div>

                    <p className="mt-3 text-sm leading-5 text-muted-foreground">{s.label}</p>
                    {s.suffix === "K+" && <StarRow />}

                    {/* Fixed w-16 bar scaled from 50% to 100%, so hover never changes layout. */}
                    <span
                      aria-hidden
                      className="mt-3 block h-0.5 w-16 origin-left scale-x-50 rounded-full bg-accent transition-[scale] duration-300 ease-out group-hover/stat:scale-x-100"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Spotlight>
      </Reveal>
    </Section>
  );
}
