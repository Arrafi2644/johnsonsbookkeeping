import data from "@/data/content.json";

export const content = data;
export type Service = (typeof data.services)[number];

/** One entry in the header navigation tree. Only plain strings, so it can be passed to client components. */
export type NavItem = {
  label: string;
  href: string;
  description?: string;
  /** Icon name resolved through `lib/icons.ts`. */
  icon?: string;
  /** Marks a top-level item that opens a panel instead of linking. */
  menu?: "services" | "areas";
  children?: NavItem[];
};

export type NavCta = { label: string; href: string };

/** Shape of `nav` in content.json: services are referenced by slug, sub-services are plain labels. */
type RawNavChild = { slug: string; children?: string[] };
type RawNavItem = { label: string; href: string; menu?: "services" | "areas"; children?: RawNavChild[] };

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function formatAddress(a: (typeof data.site)["address"]) {
  return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
}

/** Lowercase, hyphen-separated, ASCII-only slug ("Recording income & expenses" -> "recording-income-expenses"). */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildNav(): NavItem[] {
  const bySlug = new Map(data.services.map((s) => [s.slug, s]));

  return (data.nav as RawNavItem[]).map((item): NavItem => {
    if (item.menu === "services") {
      const children = (item.children ?? []).map((child): NavItem => {
        const service = bySlug.get(child.slug);
        if (!service) throw new Error(`content.json: nav references unknown service slug "${child.slug}"`);
        const href = `/services/${service.slug}`;
        return {
          label: service.title,
          href,
          description: service.navDescription,
          icon: service.icon,
          children: child.children?.map((label) => ({ label, href: `${href}#${slugify(label)}` })),
        };
      });
      return { label: item.label, href: item.href, menu: "services", children };
    }

    if (item.menu === "areas") {
      const children = data.areas.map((city): NavItem => ({
        label: `${city}, AZ`,
        href: `/service-area/${slugify(city)}-az`,
      }));
      return { label: item.label, href: item.href, menu: "areas", children };
    }

    return { label: item.label, href: item.href };
  });
}

/** Header, mobile menu and footer navigation, built once from the content file. */
export const navItems: NavItem[] = buildNav();
export const navCta: NavCta = data.navCta;
