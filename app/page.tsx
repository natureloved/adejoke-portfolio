import Capabilities from "@/components/Capabilities";
import { ContactProvider } from "@/components/ContactContext";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Lab from "@/components/Lab";
import Nav from "@/components/Nav";
import Story from "@/components/Story";
import Toolkit from "@/components/Toolkit";
import Work from "@/components/Work";
import IconSprite from "@/components/IconSprite";

export default function Home() {
  return (
    <ContactProvider>
      <IconSprite />
      <Nav />
      <main id="main">
        <Hero />
        <Toolkit />
        <Work />
        <Capabilities />
        <Lab />
        <Story />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </ContactProvider>
  );
}
