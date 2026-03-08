"use client";

import { motion } from "framer-motion";

export default function NavBar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 w-full z-40 bg-obsidian/80 backdrop-blur-md border-b border-white/5 py-4 px-8 md:px-16 flex justify-between items-center"
    >
      <div className="font-heading font-black text-xl tracking-tighter text-offwhite uppercase">
        Shubham<span className="text-cyan">.</span>
      </div>
      
      <ul className="hidden md:flex gap-8 text-xs font-sans font-bold uppercase tracking-widest text-muted">
        <li>
          <button onClick={() => scrollTo("experience")} className="hover:text-cyan transition-colors">
            Experience
          </button>
        </li>
        <li>
          <button onClick={() => scrollTo("skills")} className="hover:text-cyan transition-colors">
            Skills
          </button>
        </li>
        <li>
          <button onClick={() => scrollTo("projects")} className="hover:text-cyan transition-colors">
            Projects
          </button>
        </li>
        <li>
          <a href="https://medium.com/@shubhamsinghpm" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">
            Blogs
          </a>
        </li>
        <li>
          <button onClick={() => scrollTo("contact")} className="hover:text-cyan transition-colors text-cyan font-black">
            Contact
          </button>
        </li>
      </ul>
    </motion.nav>
  );
}
