import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Programs from "@/components/Programs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChainBar from "@/components/ChainBar";
import BuilderLog from "@/components/BuilderLog";

export default function Home() {
  return (
    <main>
      <ChainBar />
      <Hero />
      <Ticker />
      <About />
      <Projects />
      <Skills />
      <Programs />
      <BuilderLog />
      <Contact />
      <Footer />
    </main>
  );
}
