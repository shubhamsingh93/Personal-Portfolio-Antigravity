"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import resumeData from "@/data/resume.json";

function AnimatedCounter({ 
  value, 
  prefix = "", 
  suffix = "" 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // format to 1 decimal place if it's a float like 99.9, otherwise integer
        const formatted = Number.isInteger(value) ? Math.round(latest) : latest.toFixed(1);
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, value]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function Metrics() {
  return (
    <section id="results" className="w-full bg-[#0a0a0a] border-t border-b border-white/5 py-24 px-4 md:px-16 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-heading font-black text-offwhite uppercase tracking-normal mb-20"
        >
          Results at a <span className="text-cyan">Glance</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {resumeData.metrics.map((metric, idx) => {
            // Calculate borders for a 2-row, 3-column grid
            const isTopRow = idx < 3;
            // On desktop, add bottom border to top row, and right border to first two columns
            const borderClasses = `
               py-16 md:px-12 
               border-white/10
               ${isTopRow ? 'lg:border-b' : ''} 
               ${idx % 3 !== 2 ? 'lg:border-r' : ''}
               /* Mobile fallback borders */
               ${idx !== resumeData.metrics.length - 1 ? 'border-b lg:border-b-0' : ''}
            `;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={borderClasses}
              >
                <h3 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-bold text-offwhite tracking-tighter mb-4 whitespace-nowrap">
                  <AnimatedCounter 
                    value={metric.value} 
                    prefix={metric.prefix} 
                    suffix={metric.suffix} 
                  />
                </h3>
                <p className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] text-cyan">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
