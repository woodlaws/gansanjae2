import type { MetadataRoute } from "next";
import { href, keys } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return keys.flatMap(key => (["ko", "en"] as const).map(locale => ({ url: `${origin}${href(locale, key)}`, alternates: { languages: { ko: `${origin}${href("ko", key)}`, en: `${origin}${href("en", key)}` } } })));
}
