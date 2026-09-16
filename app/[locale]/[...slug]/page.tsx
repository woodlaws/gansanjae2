import { notFound } from "next/navigation";
import { isLocale, keys, paths, routeKey } from "@/lib/site";
import { PageView, makeMetadata } from "@/components/PageView";

export function generateStaticParams() { return (["ko", "en"] as const).flatMap(locale => keys.filter(key => key !== "home").map(key => ({ locale, slug: paths[key].split("/") }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }) { const { locale, slug } = await params; const page = routeKey(slug); if (!isLocale(locale) || !page) return {}; return makeMetadata(locale, page); }
export default async function SubPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) { const { locale, slug } = await params; const page = routeKey(slug); if (!isLocale(locale) || !page || page === "home") notFound(); return <PageView locale={locale} page={page} />; }
