import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const publicDir = ".output/public";
const siteUrl = "https://y-l.fr";
const errors = [];
const canonicals = new Map();
const defaultLocaleContentRoutePrefixes = [
  "/blog",
  "/projets/",
  "/developpeur-",
  "/developpement-saas",
  "/audit-code-laravel",
];
const ignoredEnglishBodyHrefPrefixes = ["http://", "https://", "//", "/en", "/_nuxt/", "/_payload"];
const ignoredEnglishBodyHrefs = new Set([
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/site.webmanifest",
]);

const extractBody = (html) => html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || "";
const extractHrefValues = (html) =>
  [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const htmlFiles = existsSync(publicDir)
  ? walk(publicDir).filter((file) => {
      if (!file.endsWith(".html")) return false;
      if (file.includes("/sitemap.xml/")) return false;
      return !["200.html", "404.html"].includes(file.split("/").pop());
    })
  : [];

if (!htmlFiles.length) {
  errors.push("No generated HTML files found. Run `npm run build` first.");
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const label = relative(publicDir, file);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
  const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1];
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  const jsonLd = html.includes('type="application/ld+json"');

  if (!title || title.length < 10) errors.push(`${label}: missing or short title`);
  if (!description || description.length < 50) {
    errors.push(`${label}: missing or short meta description`);
  }
  if (!canonical?.startsWith(siteUrl)) errors.push(`${label}: invalid canonical`);
  if (!ogTitle) errors.push(`${label}: missing og:title`);
  if (!ogImage) errors.push(`${label}: missing og:image`);
  if (!jsonLd) errors.push(`${label}: missing JSON-LD`);

  if (label.startsWith("en/")) {
    const bodyHrefs = extractHrefValues(extractBody(html));
    const defaultLocaleHrefs = bodyHrefs.filter((href) => {
      if (ignoredEnglishBodyHrefs.has(href)) return false;
      if (ignoredEnglishBodyHrefPrefixes.some((prefix) => href.startsWith(prefix))) return false;
      return defaultLocaleContentRoutePrefixes.some((prefix) => href.startsWith(prefix));
    });

    for (const href of defaultLocaleHrefs) {
      errors.push(`${label}: English page links to default-locale route ${href}`);
    }
  }

  if (canonical) {
    const existing = canonicals.get(canonical);
    if (existing) {
      errors.push(`${label}: duplicate canonical with ${existing}: ${canonical}`);
    } else {
      canonicals.set(canonical, label);
    }
  }
}

const robotsPath = join(publicDir, "robots.txt");
const sitemapPath = join(publicDir, "sitemap_index.xml");

if (!existsSync(robotsPath)) {
  errors.push("robots.txt is missing from generated output.");
} else {
  const robots = readFileSync(robotsPath, "utf8");
  if (!robots.includes(`${siteUrl}/sitemap_index.xml`)) {
    errors.push("robots.txt must reference https://y-l.fr/sitemap_index.xml.");
  }
}

if (!existsSync(sitemapPath)) {
  errors.push("sitemap_index.xml is missing from generated output.");
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`SEO check passed for ${htmlFiles.length} generated pages.`);
