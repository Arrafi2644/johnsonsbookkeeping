import { Phone } from "lucide-react";
import { content, telHref } from "@/lib/content";

/** Fixed call button in the bottom-right corner. A soft gold ring pulses to draw the eye. */
export function PhoneButton() {
  const { phone } = content.site;
  return (
    <a
      href={telHref(phone)}
      aria-label={`Call us at ${phone}`}
      className="group fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_12px_30px_-8px_rgb(11_31_92/0.55)] outline-none transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_38px_-8px_rgb(11_31_92/0.65)] focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:bottom-6 sm:right-6"
    >
      <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/50 motion-reduce:hidden [animation-duration:2.4s]" />
      <Phone aria-hidden className="size-6 transition-transform duration-300 group-hover:rotate-12 motion-reduce:transition-none" strokeWidth={2} />
    </a>
  );
}
