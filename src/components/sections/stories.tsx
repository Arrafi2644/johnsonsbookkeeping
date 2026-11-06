import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { content } from "@/lib/content";

/** Case-study rows: context on the left, the story in the middle, outcomes on the right. */
export function Stories() {
  const { storiesIntro, stories } = content;
  return (
    <Section id="results">
      <SectionHeading eyebrow={storiesIntro.eyebrow} title={storiesIntro.title} />
      <div className="mt-14 space-y-6">
        {stories.map((s, i) => (
          <Reveal key={s.title} delay={80}>
            <article className="card-lift group grid after:hidden hover:border-accent focus-within:border-accent gap-8 rounded-3xl border border-border bg-card p-7 sm:p-10 lg:grid-cols-[0.8fr_1.3fr_0.9fr] lg:gap-14">
              <header>
                <p className="font-serif text-5xl leading-none text-primary/20 transition-colors duration-500 group-hover:text-accent-ink" aria-hidden>{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-5 inline-block rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">{s.tag}</p>
                <h3 className="mt-4 text-2xl sm:text-3xl">{s.title}</h3>
              </header>

              <div className="flex flex-col items-start gap-6">
                <p className="leading-7 text-muted-foreground">{s.text}</p>
                <a href="#contact" className="inline-flex items-center gap-2 border-b-2 border-accent pb-0.5 text-sm font-semibold transition-[gap] duration-300 hover:gap-4">
                  {storiesIntro.cta}<ArrowRight aria-hidden className="size-4" />
                </a>
              </div>

              <div className="rounded-2xl bg-background p-6 ring-1 ring-border transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover:text-accent">Results</p>
                <ul className="mt-4 space-y-3 text-[0.95rem]">
                  {s.results.map((r) => (
                    <li key={r} className="flex gap-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary transition-colors duration-500 group-hover:text-accent" strokeWidth={2.5} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
