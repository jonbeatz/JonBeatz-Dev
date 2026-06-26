import type { Metadata } from "next";
import { Share_Tech_Mono, Rajdhani } from "next/font/google";
import "./globals.css";

const mono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

// This standalone project IS the jonbeatz.dev (red) site, so the dev variant
// is the DEFAULT. Set NEXT_PUBLIC_JB_VARIANT="default" only if you ever want
// the legacy gold theme. Drives the data-variant attribute + document title.
const IS_DEV_SITE = process.env.NEXT_PUBLIC_JB_VARIANT !== "default";

export const metadata: Metadata = {
  title: IS_DEV_SITE
    ? "JONBEATZ.DEV — AI Playground"
    : "JonBeatz — Personal AI Command Center",
  description: "Personal AI playground, Google automation station, and local Mem0 memory center.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-variant={IS_DEV_SITE ? "dev" : "default"}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className={`${mono.variable} ${rajdhani.variable}`}>{children}</body>
    </html>
  );
}
