"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import resumeData from "@/data/resume.json";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [counter, setCounter] = useState(0);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 3.5,
      ease: [0.65, 0, 0.35, 1], // Custom slow-in slow-out curve
      onUpdate(value) {
        setCounter(Math.floor(value));
      },
      onComplete() {
        setTimeout(() => {
          setShowName(true);
          // Wait for name reveal, then automatically fire onComplete
          setTimeout(() => {
            onComplete();
          }, 2000);
        }, 300);
      }
    });

    return () => controls.stop();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100vh", opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] as any }}
    >
      <AnimatePresence mode="wait">
        {!showName ? (
          <motion.div
            key="counter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="flex flex-col items-center justify-center text-cyan"
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-[20vw] font-heading font-black leading-none tracking-tighter">
              {counter}%
            </h1>
            <p className="text-sm tracking-[0.3em] uppercase mt-4 text-muted font-sans font-bold">
              System Initialization
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="name"
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }}
            className="text-center"
          >
            <h1 className="text-[12vw] font-heading font-black uppercase text-offwhite leading-none tracking-tighter mix-blend-difference">
              {resumeData.personal.name.split(" ").map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
