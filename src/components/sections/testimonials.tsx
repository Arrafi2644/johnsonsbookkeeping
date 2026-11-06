import { BadgeCheck, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/section";
import { ReadMore } from "@/components/ui/read-more";
import { Spotlight } from "@/components/ui/spotlight";
import { content } from "@/lib/content";

const TITLE_HIGHLIGHT = "Clients Say";
/** Reviews longer than this (characters) get the "Read more" clamp. */
const LONG_REVIEW = 260;

/** Row of five gold stars, exposed to assistive tech as a single label. */
function Stars({ className }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={`flex gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className="size-4 fill-accent text-accent-ink drop-shadow-[0_2px_4px_rgba(255,184,28,0.45)]" />
      ))}
    </span>
  );
}

/** Up to two uppercase initials from a full name. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Title with a hand-drawn gold underline beneath the highlighted phrase. */
function Title({ text }: { text: string }) {
  const at = text.indexOf(TITLE_HIGHLIGHT);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="relative inline-block">
        {TITLE_HIGHLIGHT}
        <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute bottom-[-0.18em] left-0 h-[0.28em] w-full">
          <path
            d="M2 8 C 38 2, 82 11, 124 5 S 186 3, 198 7"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
      {text.slice(at + TITLE_HIGHLIGHT.length)}
    </>
  );
}

export function Testimonials() {
  const { testimonials: t } = content;
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="relative isolate overflow-hidden bg-card py-24 lg:py-32">
      {/* Background layers. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse at 50% 40%, transparent 30%, #000 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, transparent 30%, #000 85%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[520px] rounded-full bg-accent/10 blur-3xl" />

      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span aria-hidden className="h-0.5 w-10 rounded-full bg-gradient-to-r from-accent to-[#ffe493]" />
              {t.eyebrow}
            </p>
            <h2 id="testimonials-heading" className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.12] text-primary">
              <Title text={t.title} />
            </h2>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/70 bg-white/70 px-5 py-3 shadow-[0_10px_30px_-15px_rgba(11,31,92,0.35)] backdrop-blur-md">
            <div>
              <p className="font-serif text-xl">{t.rating}</p>
              <p className="text-sm text-muted-foreground">{t.ratingNote}</p>
            </div>
            <Stars />
          </div>
        </Reveal>

        <Reveal as="figure" direction="scale" className="on-dark relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-[#143073] to-primary p-8 text-primary-foreground shadow-[0_40px_80px_-40px_rgb(13_34_80/0.8)] sm:p-12 lg:grid lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-14">
          <div aria-hidden className="drift pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/15 blur-3xl" />
          <Quote aria-hidden className="relative size-14 text-accent" strokeWidth={1.5} />
          <div className="relative">
            <blockquote className="mt-6 font-serif text-2xl leading-snug sm:text-3xl lg:mt-0 lg:text-[2.1rem]">
              “{t.featured.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-sm">
              <span aria-hidden className="h-0.5 w-10 rounded-full bg-accent" />
              <span><span className="font-semibold">{t.featured.name}</span>
              <span className="text-primary-foreground/70"> · {t.featured.role}</span></span>
            </figcaption>
          </div>
        </Reveal>

        {/* Below md: scroll-snap carousel contained in its own overflow; from md: three equal columns. */}
        <ul className="-mx-5 mt-8 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {t.reviews.map((r, i) => {
            const paragraphs = r.text.split("\n\n");
            const body = (
              <div className="space-y-3 text-[15px] leading-7 text-foreground/80">
                {paragraphs.map((para) => <p key={para}>{para}</p>)}
              </div>
            );
            return (
              <Reveal as="li" key={r.name} direction="up" delay={i * 120} className="min-w-[85%] snap-center md:min-w-0">
                <Spotlight
                  as="article"
                  className="hover-fx group/card relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_10px_40px_-18px_rgba(11,31,92,0.28)] ring-1 ring-primary/5 backdrop-blur-md transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent hover:ring-accent/40 hover:shadow-[0_26px_60px_-18px_rgba(11,31,92,0.35)] focus-within:-translate-y-1.5 focus-within:border-accent focus-within:ring-accent/40 focus-within:shadow-[0_26px_60px_-18px_rgba(11,31,92,0.35)] lg:p-7"
                >
                  {/* Gold top bar: draws left to right on hover / focus. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left bg-accent transition-transform duration-[400ms] ease-out [transform:scaleX(0)] group-hover/card:[transform:scaleX(1)] group-focus-within/card:[transform:scaleX(1)]"
                  />
                  {/* Decorative outlined quote mark. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-2 font-serif text-[5rem] leading-none text-transparent opacity-30 transition-[opacity,translate] duration-300 ease-out [-webkit-text-stroke:1.5px_var(--accent)] group-hover/card:translate-x-1 group-hover/card:opacity-80 group-focus-within/card:translate-x-1 group-focus-within/card:opacity-80"
                  >
                    “
                  </span>

                  <header className="relative flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 font-serif text-base text-accent">
                        {initials(r.name)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-sans text-base font-semibold text-primary">{r.name}</h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <BadgeCheck aria-hidden className="size-3.5 text-accent-ink" />
                          Google review
                        </p>
                      </div>
                    </div>
                    <Stars className="relative mt-1 shrink-0" />
                  </header>

                  <blockquote className="relative mb-5 mt-5 flex-1">
                    {r.text.length > LONG_REVIEW ? <ReadMore>{body}</ReadMore> : body}
                  </blockquote>

                  <footer className="mt-auto flex items-center justify-between border-t border-primary/10 pt-5">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Posted on Google</span>
                  </footer>
                </Spotlight>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
