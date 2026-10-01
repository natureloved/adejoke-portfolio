import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

// The canonical domain, defined once in lib/site. Everything social and SEO
// related resolves from here, so it has to be the custom domain rather than
// the deployment alias. Social crawlers treat the first canonical they see as
// the real URL, and the alias is a different host, so a page served on the
// custom domain while pointing canonical at the alias is read as a duplicate
// of itself.
const siteUrl = SITE_URL;

const title = `${SITE.name}, Blockchain developer`;

const description =
  "Blockchain and full-stack developer building Bitcoin L2 lending, voice payments, on-chain agents, and the university software people actually use. Live demos and open source, no claims without a link.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${SITE.name}` },
  description,
  keywords: [
    "Akinola Adejoke",
    "full stack developer",
    "smart contract developer",
    "Bitcoin L2",
    "Stacks",
    "Clarity",
    "Solidity",
    "DeFi",
    "AI agents",
    "Next.js",
    "TypeScript",
    "Lagos",
  ],
  authors: [{ name: SITE.name }],
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `${SITE.name} | Portfolio`,
    title,
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@RastaDev_",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8f3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    alternateName: SITE.alias,
    url: siteUrl,
    email: `mailto:${SITE.email}`,
    jobTitle: "Full-Stack & Blockchain Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    knowsAbout: [
      "Bitcoin Layer 2",
      "Smart Contracts",
      "DeFi",
      "AI Agents",
      "TypeScript",
    ],
    sameAs: [SITE.x, SITE.github, SITE.linkedin],
  };

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} data-reading="plain">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="skip-link"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
