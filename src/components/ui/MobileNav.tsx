"use client";

import { motion } from "framer-motion";

export default function MobileNav() {
  const links = [
    { label: "Exp", target: "experience" },
    { label: "Results", target: "results" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Blogs", target: "https://medium.com/@shubhamsinghpm", external: true },
    { label: "Contact", target: "contact" },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 3.5, duration: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#050505]/80 backdrop-blur-xl border-t border-white/10 px-4 py-4 pb-safe-offset-4 flex shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="flex justify-between items-center w-full overflow-x-auto no-scrollbar gap-6 px-2">
        {links.map((item, idx) => {
          if (item.external) {
            return (
              <a 
                key={idx}
                href={item.target}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan hover:text-offwhite whitespace-nowrap"
              >
                {item.label}
              </a>
            );
          }
          return (
            <button 
              key={idx}
              onClick={() => {
                const el = document.getElementById(item.target);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-cyan whitespace-nowrap transition-colors"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
