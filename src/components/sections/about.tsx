import Image from "next/image";
import { ArrowRight, Award, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Spotlight } from "@/components/ui/spotlight";
import { content, telHref } from "@/lib/content";
import { icons } from "@/lib/icons";

/** Phrases that get a highlight; the surrounding wording stays exactly as written in content.json. */
const MISSION_HIGHLIGHT = "straightforward, dependable financial expertise";
const TITLE_HIGHLIGHT = "honest advice";

/** Splits `text` around the first occurrence of `phrase` and wraps it in `render`. */
function highlight(text: string, phrase: string, render: (phrase: string) => React.ReactNode) {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      {render(phrase)}
      {text.slice(at + phrase.length)}
    </>
  );
}

export function About() {
  const { about, site, stats } = content;
  const experience = stats[0];

  return (
    <Section id="about" className="hover-fx group/about overflow-hidden">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Image composition: first on mobile. */}
        <Reveal direction="left" className="group/image relative sm:mb-10">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-[-20px] translate-y-[20px] rounded-3xl border-2 border-accent/60 transition-[translate,border-color] duration-500 ease-out group-hover/image:translate-x-[-14px] group-hover/image:translate-y-[14px] group-hover/image:border-accent"
          />

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgb(0_0_0/0.35)]">
            <Image
              src="/images/office.jpg"
              alt="The Johnson Accounting and Advisory office entrance in Chandler, Arizona"
              fill
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
              className="object-cover object-[48%_50%] transition-transform duration-700 ease-out group-hover/image:scale-105"
            />
            {/* Navy fade at the bottom edge, revealed on hover. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100"
            />
          </div>

          {/* Floating experience badge: floats up 6px on hover. */}
          <div className="absolute -top-4 right-4 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-xl transition-[translate,box-shadow] duration-300 ease-out group-hover/image:-translate-y-1.5 group-hover/image:shadow-2xl sm:-right-5 sm:top-10">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Award aria-hidden className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-2xl leading-none text-primary">
                {experience.value}
                {experience.suffix}
              </p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">Years of experience</p>
            </div>
          </div>

          {/* Mission card: overlaps the image on every size. */}
          <div className="on-dark relative -mt-10 ml-auto mr-3 max-w-sm rounded-2xl border-l-[3px] border-accent/70 bg-primary p-6 shadow-lg transition-[translate,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-1 hover:border-accent hover:shadow-xl sm:absolute sm:-bottom-10 sm:-right-6 sm:mr-0 sm:mt-0 lg:-right-10">
            <p className="font-serif text-lg leading-snug text-primary-foreground">
              {about.missionLabel} {highlight(about.mission, MISSION_HIGHLIGHT, (p) => <span className="text-accent">{p}</span>)}
            </p>
          </div>
        </Reveal>

        {/* Text column. */}
        <div className="relative isolate">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 right-0 -z-10 select-none font-serif text-[clamp(6rem,16vw,14rem)] leading-none text-primary/[0.03] transition-transform duration-[1200ms] ease-out group-hover/about:translate-x-3"
          >
            Johnson
          </span>

          <Reveal direction="right">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-accent-ink">
              <span aria-hidden className="h-0.5 w-8 rounded-full bg-accent" />
              {about.eyebrow}
            </p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-primary">
              {highlight(about.title, TITLE_HIGHLIGHT, (p) => <span className="text-accent-ink">{p}</span>)}
            </h2>
            <p className="mt-5 max-w-prose leading-7 text-muted-foreground">{about.text}</p>
          </Reveal>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {about.principles.map((p, i) => {
              const Icon = icons[p.icon];
              return (
                <Reveal as="li" key={p.title} delay={i * 100}>
                  <Spotlight className="group/pillar h-full rounded-2xl border border-border bg-card p-6 transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-lg focus-within:-translate-y-1.5 focus-within:border-accent/60 focus-within:shadow-lg">
                    <div className="relative z-10">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-accent transition-[rotate,background-color,color] duration-300 ease-out group-hover/pillar:rotate-6 group-hover/pillar:bg-accent group-hover/pillar:text-primary group-focus-within/pillar:rotate-6 group-focus-within/pillar:bg-accent group-focus-within/pillar:text-primary">
                        <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="mt-4 font-sans text-base font-semibold leading-snug text-primary">{p.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.description}</p>
                    </div>
                  </Spotlight>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* The shared Button already sweeps a skewed white shine across on hover; focus-visible mirrors it. */}
            <Button asChild size="lg" className="group/cta focus-visible:-translate-y-0.5 focus-visible:before:left-full">
              <a href="#why">
                {about.cta}
                <span aria-hidden className="inline-flex transition-transform duration-300 ease-out group-hover/cta:translate-x-[3px] group-focus-visible/cta:translate-x-[3px]">
                  <ArrowRight className="size-4" />
                </span>
              </a>
            </Button>
            <a
              href={telHref(site.phone)}
              className="group/phone inline-flex items-center gap-2 rounded-md text-sm font-semibold text-primary"
            >
              <Phone aria-hidden className="size-4 text-accent-ink" />
              {/* Underline draws in from the left. */}
              <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out group-hover/phone:after:scale-x-100 group-focus-visible/phone:after:scale-x-100">
                {site.phone}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
