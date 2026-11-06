import * as React from "react";
import { NavigationMenu as NavPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * shadcn-style wrapper around Radix NavigationMenu, without the shared viewport:
 * each panel is positioned by its own item so it can be centred under its trigger.
 */
export function NavigationMenu({ className, ...props }: React.ComponentProps<typeof NavPrimitive.Root>) {
  return <NavPrimitive.Root className={cn("relative flex items-center", className)} {...props} />;
}

export function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavPrimitive.List>) {
  return <NavPrimitive.List className={cn("flex list-none items-center gap-1", className)} {...props} />;
}

export function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavPrimitive.Item>) {
  return <NavPrimitive.Item className={cn("relative", className)} {...props} />;
}

export function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavPrimitive.Trigger>) {
  return (
    <NavPrimitive.Trigger className={cn("group inline-flex items-center gap-1", className)} {...props}>
      {children}
      <ChevronDown
        aria-hidden
        className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
      />
    </NavPrimitive.Trigger>
  );
}

/** Panel anchor: `left-1/2` plus a negative margin set by the caller centres it on the trigger. */
export function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavPrimitive.Content>) {
  return <NavPrimitive.Content className={cn("nav-panel absolute left-1/2 top-full z-50 pt-3", className)} {...props} />;
}

export const NavigationMenuLink = NavPrimitive.Link;
