"use client";
import { motion } from "framer-motion";

export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-gradient-to-b from-black via-[#090b22] to-[#270b4f]">
      
      {/* Light Purple Animated Glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6], x: ["0%", "5%", "0%"], y: ["0%", "5%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-40%] left-[-20%] w-[120vw] h-[120vw] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.25)_0%,rgba(0,0,0,0)_60%)] will-change-transform"
      />
      
      {/* Light Blue Animated Glow */}
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.7, 0.5], x: ["0%", "-5%", "0%"], y: ["0%", "-5%", "0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-40%] right-[-20%] w-[120vw] h-[120vw] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.25)_0%,rgba(0,0,0,0)_60%)] will-change-transform"
      />

      {/* Massive Subtle Logo Watermark */}
      <motion.img
        src="/bg-logo.jpeg"
        alt="Brand Logo"
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] md:top-[8%] inset-x-0 mx-auto w-[85vw] h-[85vw] md:w-[50vw] md:h-[50vw] max-w-[450px] max-h-[450px] object-contain pointer-events-none mix-blend-screen will-change-transform"
      />

      {/* Floating Intense Light Spots */}
      <motion.div
        animate={{ x: ["0%", "15%", "0%"], y: ["0%", "10%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-purple-400/20 blur-[120px] mix-blend-screen will-change-transform"
      />
      <motion.div
        animate={{ x: ["0%", "-15%", "0%"], y: ["0%", "-10%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 blur-[120px] mix-blend-screen will-change-transform"
      />

      {/* 3D Floating Holographic Icons (Writers & Creators Theme) - Enabled on all screens, scaled down on mobile for optimal legibility & performance */}
      <div className="absolute inset-0 [perspective:1000px] pointer-events-none">
        
        {/* Floating Pen/Writer Icon */}
        <motion.div
          animate={{ rotateX: [0, 360], rotateY: [0, 360], z: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] md:top-[15%] left-[2%] md:left-[10%] w-20 h-20 md:w-64 md:h-64 border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-purple-900/10 to-transparent rounded-2xl md:rounded-3xl [transform-style:preserve-3d] flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.15)] will-change-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-[120px] md:h-[120px] text-purple-400/50 [transform:translateZ(15px)] md:[transform:translateZ(30px)]">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </motion.div>

        {/* Floating Video/Camera Icon (Creators) */}
        <motion.div
          animate={{ rotateX: [360, 0], rotateY: [0, 360], z: [0, 150, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[5%] md:bottom-[15%] right-[2%] md:right-[10%] w-24 h-24 md:w-80 md:h-80 border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-blue-900/10 to-transparent rounded-full [transform-style:preserve-3d] flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.15)] will-change-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 md:w-[140px] md:h-[140px] text-blue-400/50 [transform:translateZ(20px)] md:[transform:translateZ(50px)]">
            <path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        </motion.div>

        {/* Floating Mic/Podcast Icon */}
        <motion.div
          animate={{ rotateX: [0, -360], rotateY: [360, 0], z: [-50, 50, -50] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-[55%] md:top-[60%] left-[5%] md:left-[35%] w-16 h-16 md:w-48 md:h-48 border border-pink-500/20 bg-gradient-to-br from-pink-950/40 via-pink-900/10 to-transparent rounded-xl md:rounded-2xl [transform-style:preserve-3d] flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.15)] will-change-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-[80px] md:h-[80px] text-pink-400/50 [transform:translateZ(10px)] md:[transform:translateZ(40px)]">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          </svg>
        </motion.div>
      </div>

      {/* 3D Animated Infinite Horizon Floor - Optimized with direct GPU transform (no layout recalculations) */}
      <div className="absolute bottom-0 left-[-50%] w-[200%] h-[70%] [perspective:1000px] [transform-style:preserve-3d] pointer-events-none opacity-60">
        <motion.div 
          animate={{ transform: ["rotateX(75deg) translateY(0px)", "rotateX(75deg) translateY(64px)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-64px] inset-x-0 bottom-0 origin-bottom bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent_5%,black_100%)] will-change-transform"
        />
      </div>
    </div>
  );
}
