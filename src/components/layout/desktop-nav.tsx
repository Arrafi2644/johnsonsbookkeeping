"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { icons } from "@/lib/icons";
import type { NavCta, NavItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = {
  items: NavItem[];
  cta: NavCta;
  phone: string;
  phoneHref: string;
};

const linkClass =
  "nav-underline inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white data-[state=open]:text-white aria-[current=page]:text-white";

/** Home matches "/" exactly; every other item also matches its sub-routes. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ items, cta, phone, phoneHref }: Props) {
  const pathname = usePathname();
  // The mega menu remembers which service row is hovered/focused; null shows the promo card.
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div className="hidden items-center gap-5 lg:flex">
      <NavigationMenu
        aria-label="Main"
        delayDuration={80}
        skipDelayDuration={300}
        onValueChange={(value) => {
          if (value !== "Services") setActiveService(null);
        }}
      >
        <NavigationMenuList>
          {items.map((item) => {
            const active = isActive(pathname, item.href);

            if (item.menu === "services") {
              const current = item.children?.find((c) => c.href === activeService);
              return (
                <NavigationMenuItem key={item.label} value="Services">
                  <NavigationMenuTrigger className={linkClass} data-active={active || undefined}>
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="-ml-[360px] w-[720px]">
                    <div className="grid grid-cols-[1.15fr_1fr] overflow-hidden rounded-2xl border border-border border-t-[3px] border-t-accent bg-white text-foreground shadow-2xl">
                      <ul className="grid gap-1 p-3">
                        {item.children?.map((service) => {
                          const Icon = service.icon ? icons[service.icon] : undefined;
                          return (
                            <li key={service.href}>
                              <NavigationMenuLink asChild active={isActive(pathname, service.href)}>
                                <Link
                                  href={service.href}
                                  onMouseEnter={() => setActiveService(service.href)}
                                  onFocus={() => setActiveService(service.href)}
                                  className="group/row flex items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-muted focus-visible:bg-muted aria-[current=page]:bg-muted"
                                >
                                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover/row:bg-primary group-hover/row:text-accent group-focus-visible/row:bg-primary group-focus-visible/row:text-accent">
                                    {Icon && <Icon aria-hidden className="size-5" strokeWidth={1.75} />}
                                  </span>
                                  <span>
                                    <span className="block text-[0.95rem] font-semibold leading-tight text-primary">{service.label}</span>
                                    <span className="mt-1 block text-sm leading-snug text-muted-foreground">{service.description}</span>
                                  </span>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="border-l border-border bg-background p-3">
                        {current?.children ? (
                          <div key={current.href} className="p-3" style={{ animation: "fade-in 0.2s ease-out both" }}>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">{current.label}</p>
                            <ul className="mt-3 grid gap-0.5">
                              {current.children.map((sub) => (
                                <li key={sub.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={sub.href}
                                      className="group/sub flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-primary transition-colors duration-200 hover:bg-white focus-visible:bg-white"
                                    >
                                      <ChevronRight aria-hidden className="size-4 shrink-0 text-accent-ink transition-transform duration-200 group-hover/sub:translate-x-0.5" />
                                      {sub.label}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div
                            key="promo"
                            className="on-dark flex h-full flex-col justify-between rounded-xl bg-primary p-6 text-primary-foreground"
                            style={{ animation: "fade-in 0.2s ease-out both" }}
                          >
                            <div>
                              <p className="font-serif text-xl leading-snug">Not sure which service fits?</p>
                              <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                                Tell us about your business and we will point you to the right support.
                              </p>
                            </div>
                            <div className="mt-6 grid gap-3">
                              <NavigationMenuLink asChild>
                                <Button asChild variant="accent" size="sm">
                                  <Link href={cta.href}>Book a free consultation</Link>
                                </Button>
                              </NavigationMenuLink>
                              <a href={phoneHref} className="flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-accent">
                                <Phone aria-hidden className="size-4 text-accent" />
                                {phone}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            if (item.menu === "areas") {
              return (
                <NavigationMenuItem key={item.label} value="Areas">
                  <NavigationMenuTrigger className={linkClass} data-active={active || undefined}>
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="-ml-[290px] w-[580px]">
                    <div className="overflow-hidden rounded-2xl border border-border border-t-[3px] border-t-accent bg-white p-5 text-foreground shadow-2xl">
                      <p className="px-2 font-serif text-lg text-primary">Serving the Phoenix metro area</p>
                      <ul className="mt-3 grid grid-cols-3 gap-1">
                        {item.children?.map((area) => (
                          <li key={area.href}>
                            <NavigationMenuLink asChild active={pathname === area.href}>
                              <Link
                                href={area.href}
                                className="group/area flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm font-medium text-primary transition-[background-color,transform] duration-200 hover:translate-x-0.5 hover:bg-muted focus-visible:bg-muted aria-[current=page]:bg-muted"
                              >
                                <MapPin aria-hidden className="size-4 shrink-0 text-accent-ink" />
                                {area.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild active={active}>
                  <Link href={item.href} className={cn(linkClass)}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <a
        href={phoneHref}
        className="hidden items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white xl:flex"
      >
        <Phone aria-hidden className="size-4 text-accent" />
        {phone}
      </a>

      <Button asChild size="sm">
        <Link href={cta.href}>
          {cta.label}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
