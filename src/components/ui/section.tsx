import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}

const tones = {
  light: "bg-background",
  white: "bg-card",
  sand: "bg-muted",
  dark: "on-dark relative overflow-hidden bg-primary text-primary-foreground",
  gold: "relative overflow-hidden bg-accent text-accent-foreground",
} as const;

type SectionProps = React.ComponentProps<"section"> & { tone?: keyof typeof tones };

/** Full-width band with consistent vertical rhythm. */
export function Section({ tone = "light", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("relative py-20 lg:py-28", tones[tone], className)} {...props}>
      {tone === "dark" && (
        <>
          <div aria-hidden className="drift pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-accent/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-[#2a4fa8]/20 blur-3xl" />
        </>
      )}
      <Container className="relative">{children}</Container>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, dark, as: Tag = "h2", className }: HeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]", dark ? "text-accent" : "text-primary")}>
          <span aria-hidden className="h-0.5 w-10 rounded-full bg-gradient-to-r from-accent to-[#ffe493]" />
          {eyebrow}
        </p>
      )}
      <Tag className={cn("text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]", eyebrow && "mt-5")}>{title}</Tag>
      {text && <p className={cn("mt-5 text-lg leading-8", dark ? "text-primary-foreground/75" : "text-muted-foreground")}>{text}</p>}
    </Reveal>
  );
}
