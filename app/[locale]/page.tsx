import Dock from "@/components/dock";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Publications from "@/components/publications";
import Stack from "@/components/stack";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import { GridBackground } from "@/components/grid-background";

export default function Home() {
  return (
    <>
      <GridBackground />

      <Dock />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Projects />
        <Publications />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
