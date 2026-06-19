"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComingSoonModal from "../components/ComingSoonModal";
import { motion } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function DownloadPage() {
  const [darkMode, toggleDarkMode] = usePersistedTheme();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const benefits = [
    { title: "Direct Camera Auditions", desc: "Record and capture high-definition audition tapes directly with in-app camera guides and custom teleprompters." },
    { title: "Story , Poetry & Script Locks", desc: "Writers can protect scripts, stories, ghazals, screenplays, and thoughts behind custom paywalls and earn directly from readers." },
    { title: "UPI Withdrawals", desc: "Track written unlock earnings, request manual payouts, and verify UPI withdrawal status directly in your secure wallet." },
    { title: "Free Vertical Streams", desc: "Watch cinematic vertical reels and short micro-series episodes completely free with a lag-free native player." }
  ];

  return (
    <div className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"} relative min-h-screen transition-colors duration-500`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto relative z-10">

        {/* Main Content Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* Left: Headline & Buttons */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20 w-fit mx-auto md:mx-0">
              Download WryClip App
            </span>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent tracking-tight leading-none">
              Take the Stage in Your Pocket
            </h1>
            <p className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Unlock the full WryClip experience! Build your acting portfolio, apply to live casting calls, and monetize your content directly. Get WryClip for Android and iOS.
            </p>

            {/* Badges Container */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mt-4">

              {/* Play Store Button */}
              <motion.button
                onClick={() => setIsComingSoonOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-48 h-14 bg-black border border-white/10 rounded-xl flex items-center px-4 gap-3 shadow-lg hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition cursor-pointer text-left"
              >
                <img src="https://img.icons8.com/color/48/google-play.png" alt="Google Play" className="w-8 h-8" />
                <div className="text-left text-white">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Get it on</p>
                  <p className="text-sm font-bold leading-tight">Google Play</p>
                </div>
              </motion.button>

              {/* App Store Button */}
              <motion.button
                onClick={() => setIsComingSoonOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-48 h-14 bg-black border border-white/10 rounded-xl flex items-center px-4 gap-3 shadow-lg hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition cursor-pointer text-left"
              >
                <img src="https://img.icons8.com/color/48/apple-app-store--v3.png" alt="App Store" className="w-8 h-8" />
                <div className="text-left text-white">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Download on the</p>
                  <p className="text-sm font-bold leading-tight">App Store</p>
                </div>
              </motion.button>

            </div>

            {/* Direct APK Download Option */}
            <div className="flex flex-col gap-2 items-center md:items-start mt-2">
              <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Or download the Android installation file directly:</span>
              <motion.button
                onClick={() => setIsComingSoonOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-xl border bg-purple-500/10 border-purple-500/20 text-purple-400 font-semibold text-sm flex items-center gap-2 hover:bg-purple-500/20 transition cursor-pointer"
              >
                📥 Direct APK Download (Android)
              </motion.button>
              <span className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Latest version v1.2.0 • Play Store Certified</span>
            </div>

          </div>

          {/* Right: Phone Frame Preview */}
          <div className="flex justify-center items-center relative">

            {/* Background Glow Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Stylized CSS Phone Frame */}
            <motion.div
              initial={{ rotate: -5, y: 30 }}
              animate={{ rotate: 3, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-64 h-[500px] border-4 border-gray-800 rounded-[36px] bg-black shadow-2xl relative overflow-hidden flex flex-col justify-between p-3"
            >
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-gray-800 rounded-full z-20"></div>

              {/* Screen Mock UI */}
              <div className="w-full h-full rounded-[26px] overflow-hidden bg-gradient-to-b from-[#110729] to-[#05070c] relative flex flex-col justify-between p-4 pt-8">

                {/* Header inside phone */}
                <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                  <span>WryClip</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                </div>

                {/* Reels Simulation representation */}
                <div className="flex flex-col gap-2 my-auto">
                  <div className="w-full h-24 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
                    <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Poetry Library</div>
                    <div className="text-[11px] font-bold text-white">Khamosh Lab (Ghazal)</div>
                    <div className="text-[9px] text-gray-400 flex justify-between">
                      <span>🔒 Lock Fee</span>
                      <span className="text-purple-300 font-bold">₹29</span>
                    </div>
                  </div>

                  <div className="w-full h-24 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl"></div>
                    <div className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Creator Wallet</div>
                    <div className="text-xs font-bold text-white">Balance: ₹8,450</div>
                    <div className="text-[9px] text-gray-400 flex justify-between">
                      <span>UPI payout ready</span>
                      <span className="text-green-400 font-bold">● verified</span>
                    </div>
                  </div>
                </div>

                {/* Bottom navigation inside phone */}
                <div className="w-full flex justify-around items-center border-t border-white/15 pt-2.5 text-xs text-gray-400">
                  <span>🏠</span>
                  <span className="text-purple-400 font-bold">🎬</span>
                  <span>💼</span>
                  <span>👤</span>
                </div>

              </div>
            </motion.div>

          </div>

        </div>

        {/* Benefits Grid */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Download WryClip App?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 font-bold text-sm">
                  {i + 1}
                </div>
                <h3 className="font-bold text-base mb-2">{b.title}</h3>
                <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer darkMode={darkMode} />

      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </div>
  );
}
