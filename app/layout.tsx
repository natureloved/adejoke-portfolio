import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConstellationProvider } from "@/lib/constellation-context";
import ConstellationField from "@/components/hero/ConstellationField";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import CommandPalette from "@/components/CommandPalette";
import EasterEgg from "@/components/EasterEgg";
import CinematicEntrance from "@/components/CinematicEntrance";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adejoke-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akinola Adejoke | Full-Stack Products for Money, Ownership & Opportunity",
    template: "%s | Akinola Adejoke",
  },
  description:
    "I build full-stack products for money, ownership, and opportunity. Full-stack & blockchain developer specializing in Bitcoin L2s, smart contracts, and high-precision systems.",
  keywords: [
    "Akinola Adejoke",
    "Adejoke",
    "Full Stack Developer",
    "Blockchain Developer",
    "Bitcoin L2",
    "Stacks",
    "Clarity",
    "Solidity",
    "Cairo",
    "DeFi",
    "Web3",
  ],
  authors: [{ name: "Akinola Adejoke" }],
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Akinola Adejoke | Portfolio",
    title: "Akinola Adejoke | Full-Stack Products for Money, Ownership & Opportunity",
    description:
      "I build full-stack products for money, ownership, and opportunity across Bitcoin L2s, smart contracts, and modern systems.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Akinola Adejoke | Full-Stack Products for Money, Ownership & Opportunity",
    description:
      "I build full-stack products for money, ownership, and opportunity across Bitcoin L2s, smart contracts, and modern systems.",
    creator: "@adejoke_btc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0b0e10" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Akinola Adejoke",
              url: siteUrl,
              sameAs: [
                "https://x.com/adejoke_btc",
                "https://github.com/natureloved",
                "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
              ],
              jobTitle: "Full-Stack & Blockchain Developer",
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ConstellationProvider>
          {/* Cinematic entrance animation */}
          <CinematicEntrance />
          {/* Thin scroll progress indicator */}
          <ScrollProgress />
          {/* Cmd/Ctrl+K — jump anywhere, open any project */}
          <CommandPalette />
          {/* Subtle backdrop field */}
          <ConstellationField />
          <CustomCursor />
          <Navbar />
          <ScrollReveal />
          <main id="main">{children}</main>
          {/* Easter egg */}
          <EasterEgg />
        </ConstellationProvider>
      </body>
    </html>
  );
}
