import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn(className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    // Radix renders the header as an h3, which the global heading rule would set in the serif font.
    <AccordionPrimitive.Header className="flex font-sans tracking-normal">
      <AccordionPrimitive.Trigger
        className={cn("group flex flex-1 items-center justify-between text-left transition-colors", className)}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className="accordion-content" {...props}>
      <div className={className}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
