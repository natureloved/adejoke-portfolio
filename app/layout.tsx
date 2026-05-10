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

export const metadata: Metadata = {
  // Update metadataBase with your deployed URL before going live
  metadataBase: new URL('https://adejoke-portfolio.vercel.app'),
  title: "Akinola Adejoke Elizabeth — Full Stack & Multi-Chain Developer",
  description:
    "Portfolio of Akinola Adejoke Elizabeth — a Full Stack Developer and Multi-Chain Builder fluent in Solidity, Cairo, and Clarity. Building at the intersection of African ingenuity and decentralized finance.",
  keywords: [
    "Adejoke Elizabeth",
    "Full Stack Developer",
    "Blockchain Developer",
    "Solidity",
    "Cairo",
    "Clarity",
    "StarkNet",
    "Stacks",
    "EVM",
    "DeFi",
    "Web3",
  ],
  authors: [{ name: "Akinola Adejoke Elizabeth" }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Adejoke Elizabeth — Portfolio',
    title: 'Akinola Adejoke Elizabeth — Full Stack & Multi-Chain Developer',
    description:
      'Full Stack Developer and Multi-Chain Builder. Solidity · Cairo · Clarity · Next.js · DeFi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akinola Adejoke Elizabeth — Full Stack & Multi-Chain Developer',
    description:
      'Full Stack Developer & Multi-Chain Builder. Solidity, Cairo, Clarity, Next.js.',
    creator: '@adejoke_btc',
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
        {/* Critical CSS for Scroll Reveal to prevent FOUC */}
        <style dangerouslySetInnerHTML={{ __html: ".reveal { opacity: 0; }" }} />
      </head>
      <body>
        <CustomCursor />
        <ScrollReveal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
