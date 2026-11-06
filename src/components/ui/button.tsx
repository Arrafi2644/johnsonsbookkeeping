import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * The header "Get Consultation" look is the house style: solid gold, navy text, rounded-md, a light sweep
 * on hover, a small lift, and a trailing arrow that nudges 2px. `default` and `accent` both use it.
 */
const gold =
  "bg-accent text-accent-foreground shadow-[0_10px_26px_-10px_rgb(255_184_28/0.8)] hover:shadow-[0_18px_38px_-10px_rgb(255_184_28/0.95)]";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md text-sm font-semibold",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:w-full before:skew-x-[-20deg]",
    "before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent",
    "hover:before:left-full before:transition-[left] before:duration-700 before:ease-out",
    "[&>svg:last-child:not(:first-child)]:transition-transform [&>svg:last-child:not(:first-child)]:duration-300",
    "hover:[&>svg:last-child:not(:first-child)]:translate-x-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default: gold,
        accent: gold,
        /** Navy fill, for placing a button on a gold background where the gold style would disappear. */
        navy:
          "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_rgb(11_31_92/0.7)] hover:bg-[#143073] hover:shadow-[0_18px_34px_-12px_rgb(11_31_92/0.75)]",
        outline:
          "border border-primary/25 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_14px_28px_-14px_rgb(13_34_80/0.6)]",
        "outline-light":
          "border border-white/30 text-primary-foreground backdrop-blur-sm hover:border-accent hover:bg-white/10 hover:text-accent",
      },
      size: { default: "h-11 px-6", sm: "h-10 px-5", lg: "h-[3.25rem] px-8 text-[0.95rem]" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
