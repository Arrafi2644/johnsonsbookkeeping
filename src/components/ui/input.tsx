import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/70 transition-[border-color,box-shadow,background-color] duration-300 hover:border-primary/40 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/35 disabled:opacity-50 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus-visible:ring-red-600/20";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(field, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-28 resize-y py-3.5", className)} {...props} />;
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="group relative">
      <select className={cn(field, "h-12 appearance-none pr-10", className)} {...props} />
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform duration-300 group-focus-within:rotate-180 group-focus-within:text-primary" />
    </div>
  );
}
