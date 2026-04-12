import Dock from "@/components/dock";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Publications from "@/components/publications";
import Stack from "@/components/stack";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      {/* Dot grid background */}
      <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <Dock />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Publications />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
