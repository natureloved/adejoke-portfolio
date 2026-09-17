import Hero from "@/components/hero/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import About from "@/components/About";
import BuilderProfile from "@/components/BuilderProfile";
import LabGrid from "@/components/LabGrid";
import JourneyTimeline from "@/components/JourneyTimeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectShowcase />
      <About />
      <BuilderProfile />
      <LabGrid />
      <JourneyTimeline />
      <Contact />
      <Footer />
    </>
  );
}
