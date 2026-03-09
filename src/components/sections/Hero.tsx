"use client";

import { motion } from "framer-motion";
import WireframeCanvas from "../canvas/WireframeCanvas";
import resumeData from "@/data/resume.json";

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  const textVariants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as any } },
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian text-offwhite">
      {/* 3D WebGL Background */}
      <WireframeCanvas />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-16 mx-auto flex flex-col justify-end h-full pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          <div className="overflow-hidden">
            <motion.p variants={textVariants} className="text-cyan font-sans uppercase tracking-[0.2em] font-bold text-sm md:text-base">
              {resumeData.personal.name} • {resumeData.personal.location}
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-3 mt-2 overflow-hidden py-1">
            {["AI", "B2B SaaS", "Enterprise SaaS", "Ed-Tech"].map((tag, idx) => (
              <motion.div
                key={idx}
                variants={textVariants}
                whileHover={{ backgroundColor: "#00f3ff", color: "#000000" }}
                className="px-4 py-1.5 rounded-full border border-cyan bg-transparent text-offwhite text-[10px] md:text-xs font-sans font-bold uppercase tracking-widest cursor-default transition-colors duration-300 inline-block"
              >
                {tag}
              </motion.div>
            ))}
          </div>

          <div className="overflow-hidden pb-6 pt-2 -mb-6 w-full">
            <motion.h1 
              variants={textVariants} 
              className="font-heading font-black leading-[0.9] tracking-tighter uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(2rem, 9.5vw, 8rem)" }}
            >
              {resumeData.personal.title.split(" ")[0]}
              <br />
              <span className="text-outline">{resumeData.personal.title.split(" ")[1]}</span>
            </motion.h1>
          </div>

          <div className="mt-6 max-w-xl py-2">
            <motion.p variants={textVariants} className="text-muted md:text-lg font-sans leading-[1.8]">
              {resumeData.personal.about}
            </motion.p>
          </div>

          <div className="overflow-hidden mt-12 w-full">
            <motion.div variants={textVariants} className="flex flex-wrap items-center gap-4">
              {[
                { label: "View Experience", target: "experience" },
                { label: "Results", target: "results" },
                { label: "Skills", target: "skills" },
                { label: "Projects", target: "projects" },
                { label: "Blogs", target: "https://medium.com/@shubhamsinghpm", external: true },
                { label: "Contact", target: "contact" },
              ].map((item, idx) => {
                const baseClasses = "relative px-6 py-3 md:px-8 md:py-4 border border-cyan/50 rounded-full font-bold uppercase tracking-widest text-xs backdrop-blur-md overflow-hidden group cursor-pointer inline-block w-fit";
                const content = (
                  <>
                    <span className="relative z-10 text-cyan group-hover:text-offwhite transition-colors duration-300">
                      {item.label}
                    </span>
                    <div className="absolute inset-0 bg-cyan transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out z-0" />
                  </>
                );

                if (item.external) {
                  return (
                    <motion.a 
                      key={idx}
                      href={item.target}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0,243,255,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      className={baseClasses}
                    >
                      {content}
                    </motion.a>
                  );
                }

                return (
                  <motion.button 
                    key={idx}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,243,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const el = document.getElementById(item.target);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={baseClasses}
                  >
                    {content}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-cyan to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}
