import Hero from "@/components/hero/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Programs from "@/components/Programs";
import BuilderLog from "@/components/BuilderLog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/EasterEgg";

// One universe. Each section is a region of it — the compass on the
// right tracks your position as you travel through the work.
export default function Home() {
  return (
    <>
      <Hero />            {/* region: hero   — the constellation */}
      <About />          {/* region: origin — who I am */}
      <Ticker />         {/* motion strip between regions */}
      <Projects />       {/* region: work   — featured + archive */}
      <Skills />         {/* region: stack  — my tools */}
      <Programs />       {/* region: guilds — fellowships */}
      <BuilderLog />     {/* region: notes  — field notes */}
      <Contact />        {/* region: signal — open a channel */}
      <Footer />
      <EasterEgg />
    </>
  );
}
