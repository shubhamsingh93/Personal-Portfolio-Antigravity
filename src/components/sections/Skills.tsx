"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart, Code2, PenTool } from "lucide-react";

const skillCategories = [
  {
    title: "Strategy",
    icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
    skills: ["Product Strategy", "Roadmapping", "A/B Testing", "Growth Metrics", "User Research"]
  },
  {
    title: "Analytics",
    icon: <BarChart className="w-5 h-5 text-indigo-400" />,
    skills: ["SQL", "Mixpanel", "Google Analytics", "Tableau", "Data Visualization"]
  },
  {
    title: "Technical",
    icon: <Code2 className="w-5 h-5 text-indigo-400" />,
    skills: ["RESTful APIs", "Python", "CI/CD", "GenAI/LLMs", "Agile/Scrum"]
  },
  {
    title: "Design",
    icon: <PenTool className="w-5 h-5 text-indigo-400" />,
    skills: ["Figma", "Wireframing", "Prototyping", "User Experience", "Design Systems"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-obsidian py-32 px-4 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight text-offwhite mb-4 relative"
          >
            Skills & Expertise
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-cyan" />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted mt-8 font-sans text-lg md:text-xl"
          >
            A blend of strategic vision and technical execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-obsidian-light border border-white/5 rounded-2xl p-8 hover:border-cyan/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-offwhite">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-3 py-1.5 bg-white/5 rounded-md text-sm font-sans text-muted hover:text-offwhite hover:bg-white/10 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
