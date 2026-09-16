import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = { title: "강산재 | Kangsanjae", icons: { icon: "/favicon.svg" } };
export default function RedirectLayout({ children }: { children: React.ReactNode }) { return <html lang="ko"><body>{children}</body></html>; }
