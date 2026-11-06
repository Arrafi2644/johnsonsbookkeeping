"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";
import { icons } from "@/lib/icons";
import type { NavCta, NavItem } from "@/lib/content";

type Props = {
  items: NavItem[];
  cta: NavCta;
  phone: string;
  phoneHref: string;
};

const rowClass =
  "flex w-full items-center justify-between border-b border-white/10 py-4 text-lg font-medium text-white transition-colors hover:text-accent";

export function MobileMenu({ items, cta, phone, phoneHref }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline-light" size="sm" className="px-3 lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="on-dark bg-primary text-primary-foreground">
        <SheetTitle className="sr-only">Site menu</SheetTitle>

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <Logo />
          <SheetClose asChild>
            <Button variant="outline-light" size="sm" className="px-3" aria-label="Close menu">
              <X className="size-5" />
            </Button>
          </SheetClose>
        </div>

        {/* Any tapped link closes the sheet. Delegating here covers links inside the accordions too. */}
        <nav
          aria-label="Mobile"
          className="flex-1 overflow-y-auto overscroll-contain px-6"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <Accordion type="single" collapsible>
            {items.map((item) => {
              if (item.menu === "services") {
                return (
                  <AccordionItem key={item.label} value="services">
                    <AccordionTrigger className={rowClass}>{item.label}</AccordionTrigger>
                    <AccordionContent className="pb-2 pl-1">
                      <Accordion type="single" collapsible>
                        {item.children?.map((service) => {
                          const Icon = service.icon ? icons[service.icon] : undefined;
                          const label = (
                            <span className="flex items-center gap-3">
                              {Icon && <Icon aria-hidden className="size-4 text-accent" strokeWidth={1.75} />}
                              {service.label}
                            </span>
                          );
                          if (!service.children) {
                            return (
                              <Link key={service.href} href={service.href} className="flex items-center justify-between border-b border-white/5 py-3 pr-1 text-[0.95rem] text-white/85 transition-colors hover:text-accent">
                                {label}
                              </Link>
                            );
                          }
                          return (
                            <AccordionItem key={service.href} value={service.href}>
                              <AccordionTrigger className="w-full border-b border-white/5 py-3 pr-1 text-[0.95rem] text-white/85 hover:text-accent">
                                {label}
                              </AccordionTrigger>
                              <AccordionContent className="pb-2 pl-7">
                                <Link href={service.href} className="flex items-center gap-2 py-2.5 text-sm font-semibold text-accent">
                                  {service.label} overview
                                </Link>
                                {service.children.map((sub) => (
                                  <Link key={sub.href} href={sub.href} className="flex items-center gap-2 py-2.5 text-sm text-white/75 transition-colors hover:text-accent">
                                    <ChevronRight aria-hidden className="size-3.5 shrink-0 text-accent" />
                                    {sub.label}
                                  </Link>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              if (item.menu === "areas") {
                return (
                  <AccordionItem key={item.label} value="areas">
                    <AccordionTrigger className={rowClass}>{item.label}</AccordionTrigger>
                    <AccordionContent className="grid grid-cols-2 gap-x-3 pb-3">
                      {item.children?.map((area) => (
                        <Link key={area.href} href={area.href} className="flex items-center gap-2 py-2.5 text-sm text-white/80 transition-colors hover:text-accent">
                          <MapPin aria-hidden className="size-3.5 shrink-0 text-accent" />
                          {area.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              return (
                <Link key={item.label} href={item.href} className={rowClass}>
                  {item.label}
                </Link>
              );
            })}
          </Accordion>
        </nav>

        <div className="grid gap-3 border-t border-white/10 bg-primary p-6">
          <SheetClose asChild>
            <Button asChild size="lg" variant="accent" className="w-full">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </SheetClose>
          <Button asChild size="lg" variant="outline-light" className="w-full">
            <a href={phoneHref}>
              <Phone aria-hidden className="size-4" />
              {phone}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
