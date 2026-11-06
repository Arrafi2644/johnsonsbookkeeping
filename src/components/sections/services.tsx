import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { content, type Service } from "@/lib/content";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Style = { span: string; card: string; icon: string; muted: string; check: string; ring: string; wide?: boolean };

/** Each service gets its own footprint and tone so the grid reads as a composed layout, not a repeated card. */
const styles: Record<string, Style> = {
  "quickbooks-cleanup": {
    span: "lg:col-span-7",
    card: "on-dark bg-primary text-primary-foreground",
    icon: "bg-accent text-accent-foreground",
    muted: "text-primary-foreground/75",
    check: "text-accent",
    ring: "border border-white/10 hover:border-accent focus-within:border-accent",
  },
  "quickbooks-training": {
    span: "lg:col-span-5",
    card: "bg-card",
    icon: "bg-primary text-accent",
    muted: "text-muted-foreground",
    check: "text-primary",
    ring: "border border-border hover:border-accent focus-within:border-accent",
  },
  "llc-formation": {
    span: "lg:col-span-4",
    card: "bg-card",
    icon: "bg-primary text-accent",
    muted: "text-muted-foreground",
    check: "text-primary",
    ring: "border border-border hover:border-accent focus-within:border-accent",
  },
  "s-corp-election": {
    span: "lg:col-span-4",
    card: "bg-sage/45",
    icon: "bg-primary text-accent",
    muted: "text-primary/75",
    check: "text-primary",
    ring: "border border-transparent hover:border-accent focus-within:border-accent",
  },
  bookkeeping: {
    span: "lg:col-span-4",
    card: "bg-card",
    icon: "bg-primary text-accent",
    muted: "text-muted-foreground",
    check: "text-primary",
    ring: "border border-border hover:border-accent focus-within:border-accent",
  },
  advisory: {
    span: "lg:col-span-12",
    card: "bg-accent text-accent-foreground",
    icon: "bg-primary text-accent",
    muted: "text-primary/80",
    check: "text-primary",
    ring: "border border-primary/20 hover:border-primary focus-within:border-primary",
    wide: true,
  },
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const s = styles[service.id];
  const Icon = icons[service.icon];
  return (
    <Reveal className={s.span} delay={(index % 3) * 100}>
    <Spotlight
      as="article"
      className={cn(
        "card-lift hover-fx group flex h-full flex-col rounded-3xl p-7 after:hidden sm:p-9",
        s.card,
        s.ring,
        s.wide && "lg:grid lg:grid-cols-[1fr_1.1fr_0.9fr] lg:items-start lg:gap-12",
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className={cn("icon-pop flex size-14 items-center justify-center rounded-2xl", s.icon)}>
            <Icon aria-hidden className="size-6" strokeWidth={1.6} />
          </span>
          <span aria-hidden className={cn("font-serif text-3xl text-transparent opacity-60 transition-[opacity,translate] duration-300 ease-out [-webkit-text-stroke:1.2px_currentColor] group-hover:-translate-x-1 group-hover:opacity-100", s.muted)}>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="mt-8 text-2xl leading-tight sm:text-[1.7rem]">{service.title}</h3>
        <p className="mt-2 font-semibold leading-snug">{service.headline}</p>
      </div>

      <p className={cn("relative z-10 mt-4 leading-7", s.muted, s.wide && "lg:mt-0")}>{service.text}</p>

      <div className={cn("relative z-10 mt-6 flex flex-1 flex-col justify-between gap-8", s.wide && "lg:mt-0")}>
        <ul className="space-y-2.5 text-sm">
          {service.points.map((p) => (
            <li key={p} className="flex gap-2.5">
              <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", s.check)} strokeWidth={2.5} />
              {p}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="inline-flex w-fit items-center gap-2 border-b-2 border-current pb-0.5 text-sm font-semibold transition-[gap] duration-300 hover:gap-4"
        >
          Explore More<span className="sr-only"> about {service.title}</span>
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
    </Spotlight>
    </Reveal>
  );
}

export function Services() {
  const { servicesIntro, services } = content;
  return (
    <Section id="services" className="isolate [background-image:radial-gradient(color-mix(in_srgb,var(--primary)_5%,transparent)_1.5px,transparent_1.5px)] [background-size:24px_24px]">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 -z-10 size-[480px] rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-10 -z-10 size-[420px] rounded-full bg-primary/5 blur-3xl" />
      <SectionHeading eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} />
      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </Section>
  );
}
