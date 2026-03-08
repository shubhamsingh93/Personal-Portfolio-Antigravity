"use client";

import { motion } from "framer-motion";
import resumeData from "@/data/resume.json";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";

export default function BentoGrid() {
  return (
    <section id="skills" className="w-full bg-obsidian py-32 px-4 md:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-[6vw] font-heading font-black uppercase tracking-tight text-outline opacity-50">
            Skills & Projects
          </h2>
        </motion.div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px] grid-flow-dense">
          
          {/* Skills Block - Spans 2 cols, 2 rows */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 md:row-span-2 bg-obsidian-light border border-white/10 p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full group-hover:bg-cyan/20 transition-all duration-700 pointer-events-none" />
            <h3 className="text-2xl font-heading font-bold uppercase tracking-widest text-cyan mb-8">Technical & Strategic Arsenal</h3>
            <div className="flex flex-wrap gap-3 mt-auto">
              {resumeData.skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 border border-white/20 rounded-full text-xs font-sans font-bold uppercase tracking-widest text-offwhite/80 hover:border-cyan hover:text-cyan transition-colors z-10 bg-obsidian/50 backdrop-blur-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project Blocks mapping dynamically to flow around skills */}
          {resumeData.projects.map((project, idx) => (
            <motion.a
              href={project.link}
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, backgroundColor: "rgba(17,17,17,0.8)", borderColor: "rgba(0,243,255,0.5)" }}
              className={`
                border border-white/10 p-8 flex flex-col justify-between group relative overflow-hidden bg-obsidian-light
                md:col-span-1 lg:col-span-2 row-span-1
              `}
            >
              <div className="flex justify-between items-start z-10">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-offwhite group-hover:text-cyan transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight className="text-white/30 group-hover:text-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <div className="z-10 mt-8">
                <p className="text-sm text-muted font-sans mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase tracking-wider font-bold text-cyan/70 bg-cyan/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
          
          {/* Footer Tile / Call to Action inside grid */}
          <div id="contact" className="md:col-span-2 lg:col-span-2 row-span-1 border border-white/10 bg-obsidian-light p-8 flex items-center justify-between group">
            <div className="w-full min-w-0">
              <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2 font-bold group-hover:text-cyan transition-colors">Let's connect</p>
              <a href={`mailto:${resumeData.personal.email}`} className="block w-full">
                <h3 className="text-lg md:text-xl lg:text-3xl font-heading font-black text-offwhite uppercase tracking-tighter group-hover:text-white transition-colors break-words">
                  {resumeData.personal.email}
                </h3>
              </a>
              <div className="flex gap-6 mt-6">
                <a 
                  href="https://www.linkedin.com/in/shubham-singh-pm/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-cyan transition-colors font-sans text-sm font-bold uppercase tracking-widest"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/shubhamsingh93/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted hover:text-cyan transition-colors font-sans text-sm font-bold uppercase tracking-widest"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
