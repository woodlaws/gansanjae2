import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = { icons: { icon: "/favicon.svg" } };
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale}><body><a className="skip-link" href="#main-content">{locale === "ko" ? "본문으로 바로가기" : "Skip to content"}</a>{children}</body></html>;
}
