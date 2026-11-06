import type { Metadata, Viewport } from "next";
import "@fontsource-variable/radio-canada-big";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { content } from "@/lib/content";

const { site } = content;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: "website", locale: "en_US", siteName: site.name },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b1f5c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {/* clip (not hidden) keeps sticky positioning working while stopping off-screen reveal offsets from causing sideways scroll */}
        <div className="overflow-x-clip">{children}</div>
      </body>
    </html>
  );
}
