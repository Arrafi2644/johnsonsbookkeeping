import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { content, formatAddress, telHref } from "@/lib/content";

export function Contact() {
  const { site, contact, services } = content;
  const row = "group flex gap-4 rounded-2xl p-3 -m-3 transition-colors duration-300 hover:bg-background";
  const iconBox = "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-accent transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6";

  return (
    <Section id="contact" tone="white">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={contact.eyebrow} title={contact.title} text={contact.text} />

          <Reveal delay={100}>
            <address className="mt-10 grid gap-6 not-italic">
              <div className={row}>
                <span className={iconBox}><MapPin aria-hidden className="size-5" strokeWidth={1.75} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Address</p>
                  <p className="mt-1">{formatAddress(site.address)}, {site.address.country}</p>
                </div>
              </div>
              <div className={row}>
                <span className={iconBox}><Phone aria-hidden className="size-5" strokeWidth={1.75} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Phone</p>
                  <a href={telHref(site.phone)} className="link-underline mt-1 inline-block">{site.phone}</a>
                </div>
              </div>
              <div className={row}>
                <span className={iconBox}><Mail aria-hidden className="size-5" strokeWidth={1.75} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Email</p>
                  <a href={`mailto:${site.email}`} className="link-underline mt-1 inline-block break-all">{site.email}</a>
                </div>
              </div>
            </address>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-border shadow-lg transition-shadow duration-500 hover:shadow-2xl">
              <iframe
                title="Map showing the Johnson Accounting and Advisory office in Chandler, Arizona"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="aspect-[16/10] w-full border-0"
              />
            </div>
            <a href={site.mapLink} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
              Open in Google Maps<ExternalLink aria-hidden className="size-3.5" />
            </a>
          </Reveal>
        </div>

        <Reveal direction="right" className="self-start lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-6 shadow-[0_40px_80px_-40px_rgb(13_34_80/0.35)] sm:p-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-[#ffe493] to-accent" />
            <h3 className="text-2xl sm:text-3xl">{contact.formTitle}</h3>
            <ConsultationForm services={services.map((s) => s.title)} layout="split" className="mt-8" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
