"use client";

import { motion } from "framer-motion";
import resumeData from "@/data/resume.json";
import { Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-obsidian py-32 px-4 md:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="pb-8">
            <p className="text-cyan uppercase tracking-[0.3em] font-bold text-sm mb-4">Let's Connect</p>
            <h2 className="text-4xl md:text-7xl font-heading font-black text-offwhite tracking-tighter flex flex-col items-center gap-4">
              <span className="pb-4">Ready to build something</span>
              <span className="text-indigo-400 italic">extraordinary?</span>
            </h2>
          </div>
          
          <a href={`mailto:${resumeData.personal.email}`} className="inline-block relative group">
            <span className="text-xl md:text-3xl lg:text-4xl font-heading font-black text-offwhite uppercase tracking-tighter group-hover:text-cyan transition-colors z-10 relative">
              {resumeData.personal.email}
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>

          <div className="flex items-center justify-center gap-8 mt-16">
            <a 
              href="https://www.linkedin.com/in/shubham-singh-pm/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-offwhite hover:border-cyan hover:text-cyan hover:-translate-y-2 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/shubhamsingh93/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-offwhite hover:border-cyan hover:text-cyan hover:-translate-y-2 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
