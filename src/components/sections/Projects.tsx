"use client";

import { motion } from "framer-motion";
import resumeData from "@/data/resume.json";
import { ExternalLink, TrendingUp, BrainCircuit } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-obsidian-light py-32 px-4 md:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="text-center mb-20 flex flex-col items-baseline lg:items-center w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight text-offwhite mb-4 relative"
          >
            Featured Projects
            <div className="absolute -bottom-4 left-0 lg:left-1/2 lg:-translate-x-1/2 w-24 h-1 bg-cyan" />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted mt-8 font-sans text-lg md:text-xl text-left lg:text-center w-full max-w-2xl lg:mx-auto"
          >
            Ideas turned into reality through code and design.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.projects.map((project, idx) => {
            // Pick an icon based on project type dynamically
            const Icon = project.title.includes("Explain") ? BrainCircuit : TrendingUp;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-obsidian border border-white/5 rounded-2xl p-8 md:p-12 flex flex-col justify-between hover:border-cyan/30 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle top accent inspired by design */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-8">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  
                  <h3 className="text-3xl font-heading font-bold text-offwhite mb-4 group-hover:text-cyan transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted font-sans text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 mt-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-sans flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Launch App <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
