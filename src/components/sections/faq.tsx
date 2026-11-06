import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { content } from "@/lib/content";

export function Faq() {
  const { faqIntro, faqs } = content;
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={faqIntro.eyebrow} title={faqIntro.title} text={faqIntro.text} />
          <Reveal delay={150}>
            <Button asChild size="lg" variant="outline" className="mt-8">
              <a href="#contact">{faqIntro.cta}</a>
            </Button>
          </Reveal>
        </div>
        <Reveal direction="right">
          <FaqAccordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  );
}
