import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { content } from "@/lib/content";

export function Cta() {
  const { cta } = content;
  return (
    <Section tone="gold" className="py-16 lg:py-20">
      <div aria-hidden className="drift pointer-events-none absolute -left-20 -top-24 size-80 rounded-full bg-white/30 blur-3xl" />
      <div aria-hidden className="drift pointer-events-none absolute -bottom-32 right-10 size-96 rounded-full bg-primary/10 blur-3xl [animation-delay:-6s]" />
      <Reveal className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">{cta.title}</h2>
          <p className="mt-4 text-lg leading-8 text-primary/80">{cta.text}</p>
        </div>
        <Button asChild size="lg" variant="navy" className="self-start lg:self-auto">
          <a href="#contact">{cta.label}<ArrowRight aria-hidden className="size-4" /></a>
        </Button>
      </Reveal>
    </Section>
  );
}
