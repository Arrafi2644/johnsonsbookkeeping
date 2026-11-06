// import Image from "next/image";
// import { ArrowRight, MapPin, Phone } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { CountUp } from "@/components/ui/count-up";
// import { Reveal } from "@/components/ui/reveal";
// import { Spotlight } from "@/components/ui/spotlight";
// import { content, navCta, slugify, telHref } from "@/lib/content";

// const TITLE_HIGHLIGHT = "Phoenix area";

// /** Title with the highlighted phrase in gold and a hand-drawn gold underline beneath it. */
// function Title({ text }: { text: string }) {
//   const at = text.indexOf(TITLE_HIGHLIGHT);
//   if (at === -1) return <>{text}</>;
//   return (
//     <>
//       {text.slice(0, at)}
//       <span className="relative inline-block text-accent">
//         {TITLE_HIGHLIGHT}
//         <svg
//           aria-hidden
//           viewBox="0 0 200 12"
//           preserveAspectRatio="none"
//           className="absolute -bottom-[0.18em] left-0 h-[0.28em] w-full"
//         >
//           <path
//             d="M2 8 C 38 2, 82 11, 124 5 S 186 3, 198 7"
//             fill="none"
//             stroke="var(--accent)"
//             strokeWidth="3.5"
//             strokeLinecap="round"
//             vectorEffect="non-scaling-stroke"
//           />
//         </svg>
//       </span>
//       {text.slice(at + TITLE_HIGHLIGHT.length)}
//     </>
//   );
// }

// /** Service Area: dark panel over a map-pin photo, headline and CTAs on top, glass strip of city chips below. */
// export function Areas() {
//   const { areasIntro, areas, site } = content;
//   const officeCity = site.address.city;

//   // The office city goes first; the rest keep their content order.
//   const cities = [...areas].sort((a, b) => Number(b === officeCity) - Number(a === officeCity));

//   return (
//     <section id="service-area" aria-labelledby="service-area-heading" className="px-4 py-10 sm:px-6 lg:py-16">
//       <div className="on-dark relative isolate mx-auto flex max-w-[1440px] flex-col justify-between gap-12 overflow-hidden rounded-[2rem] border border-primary/20 px-6 pb-8 pt-14 shadow-[0_30px_80px_-40px_rgba(11,31,92,0.6)] lg:min-h-[640px] lg:rounded-[2.5rem] lg:px-14 lg:pb-10 lg:pt-20">
//         <Image
//           src="/images/service-area-bg.png"
//           alt=""
//           aria-hidden
//           fill
//           sizes="(min-width: 1440px) 1440px, 100vw"
//           quality={80}
//           className="-z-10 object-cover object-[70%_center] lg:object-center"
//         />
//         {/* Readability layers. */}
//         <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-primary/60 lg:hidden" />
//         <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
//           style={{ background: "linear-gradient(90deg, rgb(6 20 61 / 0.55), transparent 55%)" }}
//         />

//         {/* Upper content. */}
//         <div className="relative max-w-xl">
//           {/* Floating decoration. */}
//           <div aria-hidden className="float-slow pointer-events-none absolute -left-6 -top-10 size-[110px] rounded-full border border-white/10" />
//           <div aria-hidden className="float-slow pointer-events-none absolute -top-8 right-4 flex gap-2 [animation-delay:-3s]">
//             <span className="size-2 rounded-full bg-accent" />
//             <span className="mt-3 size-2 rounded-full bg-accent/70" />
//           </div>

//           <Reveal>
//             <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-accent">
//               <span aria-hidden className="h-0.5 w-8 rounded-full bg-accent" />
//               {areasIntro.eyebrow}
//             </p>
//             <h2 id="service-area-heading" className="mt-5 text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.1] text-white text-balance">
//               <Title text={areasIntro.title} />
//             </h2>
//             <p className="mt-6 max-w-prose leading-7 text-white/75">{areasIntro.text}</p>

//             <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
//               <Button asChild size="lg" className="group/cta focus-visible:-translate-y-0.5 focus-visible:before:left-full">
//                 <a href={navCta.href}>
//                   {navCta.label}
//                   <span aria-hidden className="inline-flex transition-transform duration-300 ease-out group-hover/cta:translate-x-[3px] group-focus-visible/cta:translate-x-[3px]">
//                     <ArrowRight className="size-4" />
//                   </span>
//                 </a>
//               </Button>
//               <a href={telHref(site.phone)} className="group/phone inline-flex items-center gap-2 rounded-md text-sm font-semibold text-white">
//                 <Phone aria-hidden className="size-4 text-accent" />
//                 <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out group-hover/phone:after:scale-x-100 group-focus-visible/phone:after:scale-x-100">
//                   {site.phone}
//                 </span>
//               </a>
//             </div>

//             <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
//               <MapPin aria-hidden className="size-4 text-accent" />
//               <span>
//                 <CountUp value={areas.length} /> cities served
//               </span>
//             </p>
//           </Reveal>
//         </div>

//         {/* Chip strip. */}
//         <Spotlight className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:p-5">
//           <div className="relative mb-4 flex items-center gap-4">
//             <h3 className="font-sans text-sm font-semibold text-white">Cities we serve</h3>
//             <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
//           </div>
//           <ul className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-7">
//             {cities.map((city, i) => {
//               const isOffice = city === officeCity;
//               return (
//                 <Reveal as="li" key={city} delay={i * 40} className="min-w-0">
//                   <a
//                     href={`/service-area/${slugify(city)}-az`}
//                     className={`chip-link group flex h-full items-center gap-2 rounded-full border bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-[transform,background-color,color,border-color] duration-300 hover:border-accent hover:bg-accent hover:text-primary focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:bg-accent focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 ${
//                       isOffice ? "border-accent" : "border-white/20"
//                     }`}
//                   >
//                     <span className="pin-pulse relative flex size-4 shrink-0 items-center justify-center">
//                       <MapPin aria-hidden className="size-4 text-accent transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary" />
//                     </span>
//                     <span className="flex min-w-0 flex-col leading-tight">
//                       {isOffice && (
//                         <span className="text-[10px] font-semibold uppercase tracking-wider text-accent transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary">
//                           Our office
//                         </span>
//                       )}
//                       <span className="truncate">{city}, AZ</span>
//                     </span>
//                   </a>
//                 </Reveal>
//               );
//             })}
//           </ul>
//         </Spotlight>
//       </div>
//     </section>
//   );
// }



import Image from "next/image";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { content, navCta, slugify, telHref } from "@/lib/content";

const TITLE_HIGHLIGHT = "Phoenix area";

/** Title with the highlighted phrase in gold and a hand-drawn gold underline beneath it. */
function Title({ text }: { text: string }) {
  const at = text.indexOf(TITLE_HIGHLIGHT);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="relative inline-block text-accent">
        {TITLE_HIGHLIGHT}
        <svg
          aria-hidden
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          className="absolute -bottom-[0.18em] left-0 h-[0.28em] w-full"
        >
          <path
            d="M2 8 C 38 2, 82 11, 124 5 S 186 3, 198 7"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
      {text.slice(at + TITLE_HIGHLIGHT.length)}
    </>
  );
}

/** Service Area: full-bleed dark section over a map-pin image, headline and CTAs on top, glass strip of city chips below. */
export function Areas() {
  const { areasIntro, areas, site } = content;
  const officeCity = site.address.city;

  // The office city goes first; the rest keep their content order.
  const cities = [...areas].sort((a, b) => Number(b === officeCity) - Number(a === officeCity));

  return (
    <section
      id="service-area"
      aria-labelledby="service-area-heading"
      className="on-dark relative isolate overflow-hidden bg-primary"
    >
      {/* Full-bleed image, pushed to the right on desktop so the pins stay clear of the text. */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[88%] lg:[mask-image:linear-gradient(90deg,transparent,#000_22%)]">
        <Image
          src="/images/service-area-bg.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-[70%_center] lg:object-center"
        />
      </div>

      {/* Readability layers. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-primary/60 lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-gradient-to-t from-primary/90 via-primary/35 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        style={{ background: "linear-gradient(90deg, rgb(6 20 61 / 0.78), rgb(6 20 61 / 0.4) 42%, transparent 66%)" }}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-14 px-5 pb-10 pt-20 lg:min-h-[740px] lg:px-10 lg:pb-14 lg:pt-28">
        {/* Upper content. */}
        <div className="relative max-w-xl">
          {/* Floating decoration. */}
          <div aria-hidden className="float-slow pointer-events-none absolute -left-6 -top-10 size-[110px] rounded-full border border-white/10" />
          <div aria-hidden className="float-slow pointer-events-none absolute -top-8 right-4 flex gap-2 [animation-delay:-3s]">
            <span className="size-2 rounded-full bg-accent" />
            <span className="mt-3 size-2 rounded-full bg-accent/70" />
          </div>

          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-accent">
              <span aria-hidden className="h-0.5 w-8 rounded-full bg-accent" />
              {areasIntro.eyebrow}
            </p>
            <h2 id="service-area-heading" className="mt-5 text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.1] text-white text-balance">
              <Title text={areasIntro.title} />
            </h2>
            <p className="mt-6 max-w-prose leading-7 text-white/80">{areasIntro.text}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button asChild size="lg" className="group/cta focus-visible:-translate-y-0.5 focus-visible:before:left-full">
                <a href={navCta.href}>
                  {navCta.label}
                  <span aria-hidden className="inline-flex transition-transform duration-300 ease-out group-hover/cta:translate-x-[3px] group-focus-visible/cta:translate-x-[3px]">
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              </Button>
              <a href={telHref(site.phone)} className="group/phone inline-flex items-center gap-2 rounded-md text-sm font-semibold text-white">
                <Phone aria-hidden className="size-4 text-accent" />
                <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out group-hover/phone:after:scale-x-100 group-focus-visible/phone:after:scale-x-100">
                  {site.phone}
                </span>
              </a>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <MapPin aria-hidden className="size-4 text-accent" />
              <span>
                <CountUp value={areas.length} /> cities served
              </span>
            </p>
          </Reveal>
        </div>

        {/* Chip strip. */}
        <Spotlight className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:p-5">
          <div className="relative mb-4 flex items-center gap-4">
            <h3 className="font-sans text-sm font-semibold text-white">Cities we serve</h3>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>
          <ul className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {cities.map((city, i) => {
              const isOffice = city === officeCity;
              return (
                <Reveal as="li" key={city} delay={i * 40} className="min-w-0">
                  <a
                    href={`/service-area/${slugify(city)}-az`}
                    className={`chip-link group flex h-full items-center gap-2 rounded-full border bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-[transform,background-color,color,border-color] duration-300 hover:border-accent hover:bg-accent hover:text-primary focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:bg-accent focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 ${
                      isOffice ? "border-accent" : "border-white/20"
                    }`}
                  >
                    <span className="pin-pulse relative flex size-4 shrink-0 items-center justify-center">
                      <MapPin aria-hidden className="size-4 text-accent transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary" />
                    </span>
                    <span className="flex min-w-0 flex-col leading-tight">
                      {isOffice && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary">
                          Our office
                        </span>
                      )}
                      <span className="truncate">{city}, AZ</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </Spotlight>
      </div>
    </section>
  );
}