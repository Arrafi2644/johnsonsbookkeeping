import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PhoneButton } from "@/components/layout/phone-button";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { Process } from "@/components/sections/process";
import { Stories } from "@/components/sections/stories";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Areas } from "@/components/sections/areas";
import { Contact } from "@/components/sections/contact";
import { content } from "@/lib/content";

const { site } = content;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "US",
  },
  areaServed: content.areas.map((name) => ({ "@type": "City", name })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Why />
        <Services />
        <Process />
        <Stories />
        <Testimonials />
        <Cta />
        <Faq />
        <Areas />
        <Contact />
      </main>
      <SiteFooter />
      <PhoneButton />
    </>
  );
}
