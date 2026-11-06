import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Spotlight } from "@/components/ui/spotlight";
import { content, telHref } from "@/lib/content";
import { icons } from "@/lib/icons";

const TITLE_HIGHLIGHT = "Financial Clarity";

/** Title with the highlighted phrase in accent-ink and a hand-drawn gold underline beneath it. */
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

/** "Why Choose Us": dark panel over a glowing growth-chart photo, statement and actions on top, three glass cards below. */
export function Why() {
  const { why, about, site } = content;
  // Supporting line: the first sentence of the About paragraph (no new claims).
  const intro = `${about.text.split(". ")[0].replace(/.$/, "")}.`;

  return (
    <section id="why" aria-labelledby="why-heading" className="hover-fx px-4 py-10 sm:px-6 lg:py-16">
      <div className="on-dark relative isolate mx-auto flex max-w-[1440px] flex-col gap-12 overflow-hidden rounded-[2rem] border border-primary/20 px-6 pb-8 pt-14 shadow-[0_30px_80px_-40px_rgba(11,31,92,0.6)] lg:min-h-[640px] lg:justify-between lg:rounded-[2.5rem] lg:px-14 lg:pb-10 lg:pt-20">
        <Image
          src="/images/why-choose-us-bg-2.png"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1440px) 1440px, 100vw"
          quality={80}
          className="-z-10 object-cover object-[70%_center] lg:object-center"
        />
        {/* Readability layers. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-primary/50 lg:hidden" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
          style={{ background: "linear-gradient(90deg, rgb(6 20 61 / 0.5), transparent 55%)" }}
        />

        {/* Header. */}
        <Reveal className="relative max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-accent">
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-accent" />
            {why.eyebrow}
          </p>
          <h2 id="why-heading" className="mt-5 text-[clamp(2.25rem,4.4vw,3.5rem)] leading-[1.1] text-white text-balance">
            <Title text={why.title} />
          </h2>
          <p className="mt-6 max-w-prose leading-7 text-white/75">{intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {about.principles.map((p) => (
              <li key={p.title} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2 pr-3.5 text-sm font-medium text-white backdrop-blur">
                <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {p.title}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg" className="group/cta focus-visible:-translate-y-0.5 focus-visible:before:left-full">
              <a href="#services">
                {why.cta}
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
        </Reveal>

        {/* Three glass cards. */}
        <ul className="relative grid items-stretch gap-4 md:grid-cols-3">
          {why.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={i * 120} className="min-w-0">
                <Spotlight className="group/card h-full rounded-3xl border border-white/20 bg-primary/40 p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[translate,background-color,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent hover:bg-primary/55 focus-within:-translate-y-1.5 focus-within:border-accent lg:p-7">
                  <span
                    aria-hidden
                    className="absolute right-6 top-4 font-serif text-5xl leading-none text-transparent opacity-50 transition-[opacity,translate] duration-300 ease-out [-webkit-text-stroke:1.5px_var(--accent)] group-hover/card:-translate-x-1.5 group-hover/card:opacity-100"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary transition-[rotate] duration-300 ease-out group-hover/card:rotate-6">
                      <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 text-xl text-white">{item.title}</h3>
                    <span aria-hidden className="mt-3 block h-0.5 w-8 rounded-full bg-accent" />
                    <div className="mt-4 space-y-3 text-[15px] leading-7 text-white/80">
                      {item.paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
