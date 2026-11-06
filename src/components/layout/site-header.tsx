import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/layout/logo";
import { HeaderShell } from "@/components/layout/header-shell";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { content, navCta, navItems, telHref } from "@/lib/content";

/** Server component: static data is resolved here and handed to the small client islands as plain props. */
export function SiteHeader() {
  const { site } = content;
  const phoneHref = telHref(site.phone);

  const topStrip = (
    <div className="bg-black/30 text-xs text-primary-foreground/80">
      <Container className="flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={phoneHref} className="flex items-center gap-1.5 font-medium transition-colors hover:text-accent">
            <Phone aria-hidden className="size-3.5 text-accent" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 transition-colors hover:text-accent">
            <Mail aria-hidden className="size-3.5 text-accent" />
            {site.email}
          </a>
        </div>
        <p className="flex items-center gap-1.5">
          <MapPin aria-hidden className="size-3.5 text-accent" />
          Serving Phoenix metro, AZ
        </p>
      </Container>
    </div>
  );

  return (
    <HeaderShell topStrip={topStrip}>
      <Container className="flex h-20 items-center justify-between gap-6 transition-[height] duration-200 group-data-[scrolled=true]/header:h-16">
        <Logo priority imageClassName="h-[4.5rem] group-data-[scrolled=true]/header:h-14" />
        <DesktopNav items={navItems} cta={navCta} phone={site.phone} phoneHref={phoneHref} />
        <div className="lg:hidden">
          <MobileMenu items={navItems} cta={navCta} phone={site.phone} phoneHref={phoneHref} />
        </div>
      </Container>
    </HeaderShell>
  );
}
