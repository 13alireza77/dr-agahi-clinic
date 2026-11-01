import type { APIRoute } from "astro";

// PUBLIC_PREVIEW=1 (test deploys) keeps search engines out so the preview never competes with the real domain.
export const GET: APIRoute = ({ site }) =>
  new Response(
    import.meta.env.PUBLIC_PREVIEW === "1"
      ? "User-agent: *\nDisallow: /\n"
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", new URL(import.meta.env.BASE_URL, site))}\n`,
  );
