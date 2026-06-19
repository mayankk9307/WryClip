// components/CustomCursor.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Use MotionValues to prevent React re-renders on mousemove (eliminates lag entirely)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trail for the outer ring using a physics spring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 768 || window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const clickCursor = () => setClicked(true);
    const releaseCursor = () => setClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", clickCursor);
    window.addEventListener("mouseup", releaseCursor);

    // Global event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If the mouse is over anything clickable or interactive
      if (target.closest("a, button, input, textarea, select, [role='button'], details, summary, .cursor-link")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", clickCursor);
      window.removeEventListener("mouseup", releaseCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isMobile) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-purple-400 will-change-transform"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: clicked ? 0.5 : hovered ? 0 : 1,
          opacity: hovered ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Outer elegant trailing ring - Optimized for zero lag */}
      <motion.div
        className="pointer-events-none fixed z-[9998] top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-purple-500/60 flex justify-center items-center will-change-transform"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
          backgroundColor: hovered ? "rgba(168, 85, 247, 0.15)" : "rgba(168, 85, 247, 0)",
          borderColor: hovered ? "rgba(168, 85, 247, 0.1)" : "rgba(168, 85, 247, 0.6)"
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}