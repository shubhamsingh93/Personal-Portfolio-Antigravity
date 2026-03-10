"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "var(--color-cyan)",
      mixBlendMode: "normal" as any,
    },
  };

  // Only render on client to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "tween",
        ease: "backOut",
        duration: 0.15,
      }}
    />
  );
}
