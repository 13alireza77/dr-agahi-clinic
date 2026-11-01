import data from "../data/site.json";

export const site = data;

/** Convert ASCII digits to Persian digits for display. */
export const fa = (value: string | number) =>
  String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

/** 09102384649 -> ۰۹۱۰ ۲۳۸ ۴۶۴۹ (wrap in an LTR-isolated element when rendering). */
export const faPhone = (phone: string) =>
  fa(phone.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1 $2 $3"));

export const telHref = `tel:${site.phoneIntl}`;

const { lat, lng } = site.geo;
export const mapLinks = {
  // Neshan's web map has no pin-by-coordinates URL, so this is a share link (nshn.ir/…) copied from the Neshan app.
  neshan: site.neshanUrl,
  balad: `https://balad.ir/location?latitude=${lat}&longitude=${lng}&zoom=17`,
  google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
};

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Internal link that respects the deploy sub-path (e.g. GitHub Pages /repo-name/). */
export const link = (path: string) => base + path;

/** Absolute URL for canonical, Open Graph and schema.org. */
export const abs = (path: string) => new URL(link(path), import.meta.env.SITE ?? site.url).href;
