"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { galleryPhotos, photo, type Locale } from "@/lib/site";

type Category = "all" | "exterior" | "interior" | "seasons" | "night";
const categories: Category[] = ["all", "exterior", "interior", "seasons", "night"];
const names: Record<Category, { ko: string; en: string }> = {
  all: { ko: "전체", en: "All" }, exterior: { ko: "전경", en: "Exterior" },
  interior: { ko: "실내", en: "Interior" }, seasons: { ko: "사계절", en: "Seasons" },
  night: { ko: "야경", en: "Evening" },
};

export default function PhotoGallery({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState<Category>("all");
  const [index, setIndex] = useState<number | null>(null);
  const visible = galleryPhotos.filter(item => category === "all" || item.category === category);
  useEffect(() => {
    if (index === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex(value => value === null ? null : (value + 1) % visible.length);
      if (event.key === "ArrowLeft") setIndex(value => value === null ? null : (value + visible.length - 1) % visible.length);
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [index, visible.length]);
  let touchX = 0;
  return <><div className="gallery-filters" role="group" aria-label={locale === "ko" ? "사진 필터" : "Photo filters"}>{categories.map(cat => <button type="button" key={cat} className={cat === category ? "active" : ""} aria-pressed={cat === category} onClick={() => { setCategory(cat); setIndex(null); }}>{names[cat][locale]}</button>)}</div><div className="gallery-grid">{visible.map((item, i) => <button key={item.file} className="gallery-tile" type="button" onClick={() => setIndex(i)} aria-label={`${item[locale]} — ${locale === "ko" ? "확대" : "Enlarge"}`}><Image src={photo(item.file)} alt={item[locale]} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" /><span>{item[locale]}</span></button>)}</div>{index !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={locale === "ko" ? "사진 확대 보기" : "Photo viewer"} onTouchStart={event => { touchX = event.changedTouches[0].screenX; }} onTouchEnd={event => { const delta = event.changedTouches[0].screenX - touchX; if (Math.abs(delta) > 45) setIndex((index + (delta < 0 ? 1 : visible.length - 1)) % visible.length); }}><button className="lightbox-close" onClick={() => setIndex(null)} aria-label={locale === "ko" ? "닫기" : "Close"}>×</button><button className="lightbox-prev" onClick={() => setIndex((index + visible.length - 1) % visible.length)} aria-label={locale === "ko" ? "이전 사진" : "Previous photo"}>‹</button><div className="lightbox-image"><Image src={photo(visible[index].file)} alt={visible[index][locale]} fill sizes="95vw" /><p>{visible[index][locale]} <span>{index + 1} / {visible.length}</span></p></div><button className="lightbox-next" onClick={() => setIndex((index + 1) % visible.length)} aria-label={locale === "ko" ? "다음 사진" : "Next photo"}>›</button></div>}</>;
}
