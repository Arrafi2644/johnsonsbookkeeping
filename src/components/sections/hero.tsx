import Image from "next/image";
import { ArrowRight, MapPin, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { content } from "@/lib/content";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const { hero, services, testimonials, stats } = content;
  const [before, after] = hero.title.split(hero.highlight);

  return (
    <section className="on-dark relative isolate overflow-hidden bg-primary text-primary-foreground">
      {/* ambient background: drifting glows, a fading grid, and a bottom vignette */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="drift absolute -right-32 -top-32 size-[40rem] rounded-full bg-accent/15 blur-3xl" />
        <div className="drift absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-[#2a4fa8]/30 blur-3xl [animation-delay:-8s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <Container className="grid items-start gap-12 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        <div>
          <p className="fade-up flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent" style={d(0)}>
            <span aria-hidden className="h-0.5 w-10 rounded-full bg-gradient-to-r from-accent to-[#ffe493]" />
            {hero.eyebrow}
          </p>
          <h1 className="fade-up mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.6rem]" style={d(120)}>
            {before}
            <span className="text-shimmer">{hero.highlight}</span>
            {after}
          </h1>
          <p className="fade-up mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80" style={d(240)}>{hero.text}</p>

          <div className="fade-up mt-9 flex flex-wrap gap-3" style={d(360)}>
            <Button asChild size="lg" variant="accent"><a href="#consultation">{hero.primaryCta}<ArrowRight aria-hidden className="size-4" /></a></Button>
            <Button asChild size="lg" variant="outline-light"><a href="#services">{hero.secondaryCta}</a></Button>
          </div>

          <p className="fade-up mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-4 pr-5 text-sm text-primary-foreground/80 backdrop-blur" style={d(480)}>
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-accent text-accent" />)}
            </span>
            <span><strong className="font-semibold text-primary-foreground">{testimonials.rating}</strong> · {testimonials.ratingNote}</span>
          </p>

          <figure className="fade-up group relative mt-12 hidden sm:block" style={d(600)}>
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
              <Image
                src="/images/analyst.jpg"
                alt="An accountant reviewing a financial summary report on a tablet and printed charts"
                width={1024}
                height={683}
                priority
                sizes="(min-width: 1024px) 560px, 90vw"
                className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            </div>
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-primary/70 px-4 py-2 text-xs font-medium backdrop-blur-md">
              <MapPin aria-hidden className="size-3.5 text-accent" />
              {content.site.address.city}, {content.site.address.region}
            </figcaption>
            <div className="float-y absolute -right-3 -top-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-primary shadow-2xl backdrop-blur lg:-right-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-accent">
                <ShieldCheck aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-xl">{stats[1].value}{stats[1].suffix}</span>
                <span className="block text-[0.7rem] font-medium text-muted-foreground">{stats[1].label}</span>
              </span>
            </div>
          </figure>
        </div>

        <div id="consultation" className="fade-up relative scroll-mt-28" style={d(300)}>
          {/* soft gold halo behind the card */}
          <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.2rem] bg-gradient-to-br from-accent/40 via-transparent to-white/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl bg-card p-6 text-foreground shadow-[0_40px_90px_-30px_rgb(0_0_0/0.75)] ring-1 ring-white/20 sm:p-9">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-[#ffe493] to-accent" />
            <h2 className="text-2xl sm:text-[1.75rem]">{hero.formTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{hero.formText}</p>
            <ConsultationForm services={services.map((s) => s.title)} className="mt-6" />
          </div>
        </div>
      </Container>
    </section>
  );
}
