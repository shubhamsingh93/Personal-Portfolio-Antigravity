"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/sections/SplashScreen";
import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import MobileNav from "@/components/ui/MobileNav";

export default function Home() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!splashFinished && (
          <SplashScreen key="splash" onComplete={() => setSplashFinished(true)} />
        )}
      </AnimatePresence>

      {/* Main Content Wrapper - Only show scrollbar once splash is done */}
      <main className={`relative w-full ${!splashFinished ? "h-screen overflow-hidden" : ""}`}>
        {splashFinished && <MobileNav />}
        <Hero />
        <Metrics />
        <Experience />
        <Skills />
        <Projects />
        <Contact />

        <footer className="w-full py-8 text-center bg-obsidian border-t border-white/5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted font-bold font-sans">
            © {new Date().getFullYear()} // PORTFOLIO // BUILT USING VIBE CODE
          </p>
        </footer>
      </main>
    </>
  );
}
