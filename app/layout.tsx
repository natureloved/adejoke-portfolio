import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adejoke-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akinola Adejoke Elizabeth — Full Stack & Multi-Chain Developer",
    template: "%s | Adejoke Elizabeth",
  },
  description:
    "Portfolio of Akinola Adejoke Elizabeth — Full Stack Developer and Multi-Chain Builder fluent in Solidity, Cairo, and Clarity.",
  keywords: [
    "Adejoke Elizabeth",
    "Full Stack Developer",
    "Blockchain Developer",
    "Solidity",
    "Cairo",
    "StarkNet",
    "Stacks",
    "EVM",
    "DeFi",
    "Web3",
  ],
  authors: [{ name: "Akinola Adejoke Elizabeth" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Adejoke Elizabeth — Portfolio",
    title: "Akinola Adejoke Elizabeth — Full Stack & Multi-Chain Developer",
    description:
      "Full Stack Developer and Multi-Chain Builder. Solidity · Cairo · Clarity · Next.js · DeFi.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Akinola Adejoke Elizabeth — Full Stack & Multi-Chain Developer",
    description:
      "Full Stack Developer & Multi-Chain Builder. Solidity, Cairo, Clarity, Next.js.",
    creator: "@adejoke_btc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmMono.variable} ${syne.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#06060c" />
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
              jobTitle: "Full Stack & Multi-Chain Developer",
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CustomCursor />
        <ScrollReveal />
        <Navbar />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
