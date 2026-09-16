import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { PageView, makeMetadata } from "@/components/PageView";

export function generateStaticParams() { return [{ locale: "ko" }, { locale: "en" }]; }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) return {}; return makeMetadata(locale, "home"); }
export default async function Home({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <PageView locale={locale} page="home" />; }
