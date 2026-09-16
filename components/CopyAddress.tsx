"use client";

import { useState } from "react";
import { site, type Locale } from "@/lib/site";

export default function CopyAddress({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(site.address); setCopied(true); window.setTimeout(() => setCopied(false), 2400); } catch { setCopied(false); } };
  return <button className="button button-outline" type="button" onClick={copy} aria-live="polite">{copied ? locale === "ko" ? "주소를 복사했습니다" : "Address copied" : locale === "ko" ? "한글 주소 복사" : "Copy Korean Address"}</button>;
}
