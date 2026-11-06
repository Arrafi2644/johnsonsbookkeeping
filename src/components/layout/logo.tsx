import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Sizing for the image itself; width follows from the aspect ratio. */
  imageClassName?: string;
  priority?: boolean;
};

/** Official gold logo (mark + wordmark), designed for navy backgrounds. */
export function Logo({ className, imageClassName, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Johnson Accounting and Advisory, home"
      className={cn("group inline-flex shrink-0 items-center rounded-md", className)}
    >
      <Image
        src="/images/Johnson-logo.png"
        alt=""
        width={2048}
        height={1521}
        priority={priority}
        sizes="120px"
        className={cn(
          "h-14 w-auto transition-[height,transform] duration-200 group-hover:scale-105",
          imageClassName,
        )}
      />
    </Link>
  );
}
