import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/layout/logo";
import { content, formatAddress, navCta, navItems, telHref } from "@/lib/content";

// No movement on hover (a moving target under the cursor makes the link jitter): colour change plus a gold underline that draws in.
const linkClass =
  "inline-block rounded-sm bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-[position:0_100%] bg-no-repeat pb-0.5 text-primary-foreground/75 transition-[color,background-size] duration-300 hover:bg-[length:100%_2px] hover:text-accent focus-visible:bg-[length:100%_2px] focus-visible:text-accent motion-reduce:transition-none";

/** Column heading with a short gold rule beneath it. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
      <span aria-hidden className="mt-3 block h-0.5 w-8 rounded-full bg-accent/70" />
    </h2>
  );
}

/** Round gold-on-glass chip that holds a contact icon. */
function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-accent">
      {children}
    </span>
  );
}

export function SiteFooter() {
  const { site, services, contact } = content;
  const quickLinks = navItems.map(({ label, href }) => ({ label, href }));
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-primary text-primary-foreground">
      {/* Background: soft glows and a faint dot grid. */}
      <div aria-hidden className="drift pointer-events-none absolute -bottom-40 -right-32 -z-10 size-[30rem] rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-24 -z-10 size-[28rem] rounded-full bg-[#2a4fa8]/25 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, transparent, #000 40%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 40%, transparent)",
        }}
      />
      <div aria-hidden className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Call-to-action band. */}
      <Container className="relative pt-14 lg:pt-16">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span aria-hidden className="h-0.5 w-8 rounded-full bg-accent" />
              {contact.eyebrow}
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug text-white sm:text-3xl">{contact.title}</p>
          </div>
          <Button asChild size="lg" className="group/cta self-start md:self-auto">
            <a href={navCta.href}>
              {navCta.label}
              <ArrowRight aria-hidden className="size-4" />
            </a>
          </Button>
        </div>
      </Container>

      <Container className="relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.3fr]">
        <div>
          <Logo imageClassName="h-28" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/70">{site.footerBlurb}</p>
        </div>

        <nav aria-label="Footer">
          <ColumnHeading>Quick Links</ColumnHeading>
          <ul className="mt-6 space-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnHeading>Services</ColumnHeading>
          <ul className="mt-6 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}><a href="#services" className={linkClass}>{s.title}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnHeading>Contact</ColumnHeading>
          <address className="mt-6 space-y-4 text-sm not-italic">
            <p className="flex items-start gap-3 text-primary-foreground/75">
              <IconChip><MapPin className="size-4" /></IconChip>
              <span className="pt-1.5">{formatAddress(site.address)}, {site.address.country}</span>
            </p>
            <p className="flex items-center gap-3">
              <IconChip><Phone className="size-4" /></IconChip>
              <a href={telHref(site.phone)} className={linkClass}>{site.phone}</a>
            </p>
            <p className="flex items-center gap-3">
              <IconChip><Mail className="size-4" /></IconChip>
              <a href={`mailto:${site.email}`} className={`${linkClass} min-w-0 break-all`}>{site.email}</a>
            </p>
          </address>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <Container className="flex flex-col gap-4 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a
            href="#"
            className="group/top inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 font-medium text-primary-foreground/80 transition-[color,border-color,background-color] duration-300 hover:border-accent hover:bg-accent hover:text-primary focus-visible:border-accent focus-visible:bg-accent focus-visible:text-primary sm:self-auto"
          >
            Back to top
            <ArrowUp aria-hidden className="size-3.5 transition-transform duration-300 group-hover/top:-translate-y-0.5 group-focus-visible/top:-translate-y-0.5 motion-reduce:transition-none" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
