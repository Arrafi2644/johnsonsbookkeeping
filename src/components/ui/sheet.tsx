import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;

/** Right-hand drawer. Radix Dialog locks body scroll, traps focus and closes on Escape. */
export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="menu-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-md" />
      <SheetPrimitive.Content
        aria-describedby={undefined}
        className={cn(
          "menu-panel fixed inset-y-0 right-0 z-50 flex h-full w-[min(24rem,90vw)] flex-col shadow-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}
