"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import resumeData from "@/data/resume.json";

export default function Experience() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Create a horionztal scroll effect driven by the vertical scrolling of targetRef
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Depending on wide/mobile, we want to enable or disable the custom scroll
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Total horizontal scroll distance depends on the number of items and padding
  // Let's assume scrolling from 0% to -x% based on content
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section 
      id="experience"
      ref={targetRef} 
      // Ensure the container is very tall to allow scrolling
      className={`relative ${isDesktop ? "h-[300vh]" : "h-auto bg-obsidian-light py-20"} bg-obsidian text-offwhite`}
    >
      <div className={isDesktop ? "sticky top-0 h-screen flex items-center overflow-hidden" : ""}>
        {/* Title for section */}
        <div className="absolute top-16 left-8 md:left-16 z-10 w-full overflow-hidden">
          <motion.h2 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[6vw] font-heading font-black uppercase text-outline opacity-50 tracking-tight"
          >
            Experience
          </motion.h2>
        </div>

        {/* Desktop mapping vs Mobile accordion block */}
        <motion.div 
          style={isDesktop ? { x } : {}} 
          className={
            isDesktop 
              ? "flex gap-32 pl-[15vw] pr-[20vw] pt-[15vh]" 
              : "flex flex-col gap-12 px-8 pt-8"
          }
        >
          {resumeData.experience.map((exp, idx) => (
            <div 
              key={exp.id} 
              className={
                 isDesktop 
                   ? "w-[60vw] md:w-[45vw] lg:w-[35vw] shrink-0 border-l border-cyan/30 pl-10 relative group"
                   : "w-full border-l-2 border-cyan/30 pl-6 relative"
              }
            >
              {/* Timeline marker */}
              <div className="absolute -left-[5px] top-0 w-[10px] h-[10px] bg-cyan/50 rounded-full group-hover:bg-cyan group-hover:scale-150 transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
              
              <div className="mb-4">
                <h3 className="text-3xl lg:text-5xl font-heading font-bold mb-2 group-hover:text-cyan transition-colors flex items-center gap-4">
                  {exp.company}
                  {exp.company === "Infosys" && (
                    <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center shadow-lg">
                      <img 
                        src="/logos/infosys.svg" 
                        alt="Infosys Logo" 
                        className="h-5 md:h-6 w-auto object-contain" 
                      />
                    </div>
                  )}
                  {exp.company === "HP Inc." && (
                    <div className="bg-white px-3 py-1.5 rounded-md flex items-center justify-center shadow-lg">
                      <img 
                        src="/logos/hp.svg" 
                        alt="HP Logo" 
                        className="h-5 md:h-6 w-auto object-contain" 
                      />
                    </div>
                  )}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm uppercase tracking-widest text-muted">
                  <span className="text-offwhite font-bold">{exp.role}</span>
                  <span>//</span>
                  <span>{exp.duration}</span>
                </div>
              </div>
              
              <p className="text-lg md:text-xl font-sans mb-8 text-offwhite/80 leading-relaxed max-w-lg">
                {exp.description}
              </p>

              <ul className="space-y-4">
                {exp.achievements.map((achieve, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-4 text-muted hover:text-offwhite transition-colors duration-300 font-sans"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-cyan mt-1">▹</span>
                    <span className="leading-relaxed">{achieve}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
