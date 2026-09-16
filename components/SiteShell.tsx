import Link from "next/link";
import { href, labels, paths, site, type Locale, type PageKey } from "@/lib/site";

const menu: { key: PageKey; children?: PageKey[] }[] = [
  { key: "about", children: ["about", "filming"] },
  { key: "stay", children: ["stay", "mainHouse"] },
  { key: "experiences" }, { key: "gallery" },
  { key: "guide", children: ["guide", "explore", "location"] },
];

export function SiteHeader({ locale, current }: { locale: Locale; current: PageKey }) {
  const other: Locale = locale === "ko" ? "en" : "ko";
  return <header className="site-header">
    <div className="header-inner wrap">
      <Link className="brand" href={href(locale, "home")} aria-label={locale === "ko" ? "강산재 홈" : "Kangsanjae home"}>
        <span>강산재</span><small>KANGSANJAE</small>
      </Link>
      <nav className="desktop-nav" aria-label={locale === "ko" ? "주 메뉴" : "Main navigation"}>
        {menu.map(item => <div className={`nav-item ${current === item.key || item.children?.includes(current) ? "is-current" : ""}`} key={item.key}>
          <Link href={href(locale, item.key)} aria-current={current === item.key ? "page" : undefined}>{item.key === "about" ? locale === "ko" ? "강산재 소개" : "About" : item.key === "guide" ? locale === "ko" ? "여행 안내" : "Travel Guide" : labels[item.key][locale]}</Link>
          {item.children && <div className="nav-dropdown">{item.children.map(child => <Link key={child} href={href(locale, child)}>{labels[child][locale]}</Link>)}</div>}
        </div>)}
      </nav>
      <div className="header-actions"><div className="lang-switch"><Link href={href("ko", current)} aria-current={locale === "ko" ? "page" : undefined}>KO</Link><span>/</span><Link href={href("en", current)} aria-current={locale === "en" ? "page" : undefined}>EN</Link></div><Link className="button button-dark header-book" href={href(locale, "reservation")}>{locale === "ko" ? "예약하기" : "Book Now"}</Link></div>
      <details className="mobile-menu"><summary aria-label={locale === "ko" ? "메뉴 열기" : "Open menu"}><span></span><span></span><span></span></summary><nav aria-label={locale === "ko" ? "모바일 메뉴" : "Mobile navigation"}>{menu.map(item => <div key={item.key} className="mobile-menu-group"><Link href={href(locale, item.key)}>{labels[item.key][locale]}</Link>{item.children?.filter(child => child !== item.key).map(child => <Link className="sub-link" key={child} href={href(locale, child)}>{labels[child][locale]}</Link>)}</div>)}<Link className="button button-dark" href={href(locale, "reservation")}>{locale === "ko" ? "예약하기" : "Book Now"}</Link></nav></details>
    </div>
  </header>;
}

export function SiteFooter({ locale }: { locale: Locale }) {
  return <footer className="site-footer"><div className="wrap footer-inner"><div><Link href={href(locale, "home")} className="brand brand-light"><span>강산재</span><small>KANGSANJAE</small></Link><p>{locale === "ko" ? site.address : site.addressEn}</p></div><nav aria-label={locale === "ko" ? "푸터 메뉴" : "Footer navigation"}><Link href={href(locale, "guide")}>{labels.guide[locale]}</Link><Link href={href(locale, "reservation")}>{labels.reservation[locale]}</Link><Link href={href(locale, "location")}>{labels.location[locale]}</Link><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><Link href={href(locale === "ko" ? "en" : "ko", "home")}>{locale === "ko" ? "EN" : "KO"}</Link></nav></div></footer>;
}

export function Shell({ locale, current, children }: { locale: Locale; current: PageKey; children: React.ReactNode }) {
  return <><SiteHeader locale={locale} current={current} /><main id="main-content">{children}</main><SiteFooter locale={locale} /><Link className="mobile-book button button-dark" href={href(locale, "reservation")}>{locale === "ko" ? "예약하기 →" : "Book Your Stay →"}</Link></>;
}

export function Breadcrumb({ locale, current }: { locale: Locale; current: PageKey }) {
  if (current === "home") return null;
  const parent = current === "filming" ? "about" : current === "mainHouse" ? "stay" : null;
  return <nav className="breadcrumb wrap" aria-label={locale === "ko" ? "현재 위치" : "Breadcrumb"}><Link href={href(locale, "home")}>{labels.home[locale]}</Link><span aria-hidden="true">/</span>{parent && <><Link href={href(locale, parent)}>{labels[parent][locale]}</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{labels[current][locale]}</span></nav>;
}

export function BookStrip({ locale }: { locale: Locale }) {
  return <section className="book-strip"><div className="wrap book-strip-inner"><div><span className="eyebrow">YOUR STAY BEGINS HERE</span><h2>{locale === "ko" ? "강산재에서의 쉼을 예약하세요" : "Find Your Quiet at Kangsanjae"}</h2><p>{locale === "ko" ? site.address : site.addressEn}</p></div><div className="book-strip-actions"><Link className="button button-dark" href={href(locale, "reservation")}>{locale === "ko" ? "예약·문의" : "Book Your Stay"} <span aria-hidden="true">→</span></Link><Link className="text-link" href={href(locale, "location")}>{locale === "ko" ? "오시는 길" : "Getting Here"} →</Link></div></div></section>;
}

export function Related({ locale, items }: { locale: Locale; items: PageKey[] }) {
  return <nav className="related wrap" aria-label={locale === "ko" ? "관련 페이지" : "Related pages"}><span className="eyebrow">EXPLORE MORE</span><div>{items.map(item => <Link href={href(locale, item)} key={item}>{labels[item][locale]} <span aria-hidden="true">↗</span></Link>)}</div></nav>;
}
