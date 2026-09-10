import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConstellationProvider } from "@/lib/constellation-context";
import ConstellationField from "@/components/hero/ConstellationField";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Compass from "@/components/Compass";
import ChainBar from "@/components/ChainBar";
import ScrollReveal from "@/components/ScrollReveal";
import BootSequence from "@/components/BootSequence";
import CommandPalette from "@/components/CommandPalette";
import EasterEgg from "@/components/EasterEgg";

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
    default: "Akinola Adejoke Elizabeth | Full Stack and Multi-Chain Developer",
    template: "%s | Adejoke Elizabeth",
  },
  description:
    "Portfolio of Akinola Adejoke Elizabeth, a full stack and multi-chain developer building useful products across Bitcoin, EVM, and emerging ecosystems.",
  keywords: [
    "Adejoke Elizabeth",
    "Full Stack Developer",
    "Blockchain Developer",
    "Solidity",
    "Cairo",
    "Clarity",
    "Stacks",
    "DeFi",
    "Web3",
  ],
  authors: [{ name: "Akinola Adejoke Elizabeth" }],
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Adejoke Elizabeth | Portfolio",
    title: "Akinola Adejoke Elizabeth | Full Stack and Multi-Chain Developer",
    description:
      "Full stack and multi-chain developer building useful products across Bitcoin, EVM, and emerging ecosystems.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Akinola Adejoke Elizabeth | Full Stack and Multi-Chain Developer",
    description:
      "Full stack and multi-chain developer building useful products across Bitcoin, EVM, and emerging ecosystems.",
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
              name: "Akinola Adejoke Elizabeth",
              url: siteUrl,
              sameAs: [
                "https://x.com/adejoke_btc",
                "https://github.com/natureloved",
                "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
              ],
              jobTitle: "Full Stack and Multi-Chain Developer",
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ConstellationProvider>
          {/* First-paint handshake — once per session, skippable */}
          <BootSequence />
          {/* Cmd/Ctrl+K — jump anywhere, open any project, copy the email */}
          <CommandPalette />
          {/* The living backdrop — eight chains orbiting behind everything */}
          <ConstellationField />
          <ChainBar />
          <CustomCursor />
          <Navbar />
          <Compass />
          <ScrollReveal />
          <main id="main">{children}</main>
          {/* Hidden "rasta" easter egg — renders nothing until triggered */}
          <EasterEgg />
        </ConstellationProvider>
      </body>
    </html>
  );
}
