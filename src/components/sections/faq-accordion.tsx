"use client";

import { Accordion } from "radix-ui";
import { Plus } from "lucide-react";

type Item = { q: string; a: string };

/** Single-open accordion. Radix handles aria-expanded, keyboard navigation and focus. */
export function FaqAccordion({ items }: { items: Item[] }) {
  return (
    <Accordion.Root type="single" collapsible defaultValue="item-0" className="space-y-3">
      {items.map((item, i) => (
        <Accordion.Item
          key={item.q}
          value={`item-${i}`}
          className="overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-primary/40 data-[state=open]:border-accent data-[state=open]:shadow-[0_20px_44px_-26px_rgb(13_34_80/0.4)]"
        >
          <Accordion.Header asChild>
            <h3 className="font-sans text-base font-medium tracking-normal">
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-medium transition-colors hover:text-primary/80 sm:px-7 sm:text-xl">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-[background-color,border-color,transform] duration-300 group-hover:border-accent group-data-[state=open]:border-accent group-data-[state=open]:bg-accent">
                  <Plus aria-hidden className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-[135deg]" />
                </span>
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content className="accordion-content">
            <p className="max-w-prose px-6 pb-6 pr-12 leading-7 text-muted-foreground sm:px-7">{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
