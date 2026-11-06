import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { content } from "@/lib/content";

export function Process() {
  const { process } = content;
  return (
    <Section id="process" tone="dark">
      <SectionHeading dark eyebrow={process.eyebrow} title={process.title} />

      <ol className="relative mt-16 grid gap-6 md:grid-cols-4 transition-all duration-300">
        {/* connecting line behind the step cards (desktop) */}
        <div aria-hidden className="absolute left-0 right-0 top-[3.1rem] hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent md:block" />
        {process.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 130}>
            <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:scale-102 hover:border-accent/60 hover:bg-white/[0.09] hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_184_28/0.25)] focus-within:-translate-y-2 focus-within:border-accent/60 focus-within:bg-white/[0.09] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span className="relative flex size-12 items-center justify-center rounded-full bg-accent font-serif text-lg text-accent-foreground transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-360 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Step {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-primary-foreground/75">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-20 flex flex-col gap-6 border-t border-white/15 pt-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h3 className="text-2xl sm:text-3xl">{process.ctaTitle}</h3>
          <p className="mt-3 text-primary-foreground/75">{process.ctaText}</p>
        </div>
        <Button asChild size="lg" variant="accent" className="self-start md:self-auto">
          <a href="#contact">{process.ctaLabel}<ArrowRight aria-hidden className="size-4" /></a>
        </Button>
      </Reveal>
    </Section>
  );
}
