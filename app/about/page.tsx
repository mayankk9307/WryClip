"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function AboutPage() {
  const [darkMode, toggleDarkMode] = usePersistedTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"} relative min-h-screen transition-colors duration-500`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto relative z-10">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            About WryClip
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
            From Story to Screen
          </h1>
          <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Welcome to WryClip, the ultimate mobile-first digital ecosystem bridging the gap between creators, actors, producers, casting agents, and entertainment enthusiasts.
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}
          >
            <div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                At WryClip, we believe that talent shouldn't have to search endlessly for the right opportunities, and casting decisions shouldn't be bogged down by unorganized spreadsheets and email attachments. We are democratizing the entertainment industry by connecting aspiring actors directly with casting directors, while empowering poets, scriptwriters, and storytellers to monetize their written stories, scripts, poetry, ghazals, and screenplays directly through a premium pay-to-unlock system, while all video reels and short series remain completely free for all viewers.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border backdrop-blur-md flex flex-col justify-between ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}
          >
            <div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M20 12v8H4v-8" /><path d="m4 12 8-8 8 8" /></svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                We envision a global, decentralized creative ecosystem where creative writing, free vertical video, and casting opportunities coexist. By removing traditional gatekeepers and providing writers with direct monetization tools and actors with native casting audition pathways, WryClip allows artistic talent to flourish and scale based on merit and audience appeal.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* What We Do Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6">

            <div className={`p-6 rounded-xl border flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                🚀
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">The Reels & Series Feed</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  An immersive, completely free vertical scrolling feed powered by a smart, personalized recommendation engine that showcases your performance and acting talent to the world.
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-xl border flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                🎬
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Studios & Casting Marketplace</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  A streamlined casting hub where producers post detailed roles (specifying gender, age, language, and dialogue tone) and actors submit audition tapes directly from their camera rolls.
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-xl border flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0">
                💎
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Pay-To-Unlock Written Content</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  A monetization channel for writers and poets. Lock high-value written concepts, complete screenplays, stories, thoughts, and ghazals behind a custom fee. Readers unlock posts, and creators receive 80% split payouts.
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-xl border flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                🔥
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Gamified Referrals</h3>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Share WryClip with friends, climb referral tiers, and earn permanent algorithmic boosts (like the "Viral Boost 🚀" or "Featured Creator ⭐" badge) to skyrocket your reach.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Leadership Team Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
              Leadership
            </span>
            <h2 className="text-3xl font-bold mt-3">Founding Team</h2>
            <p className={`text-sm mt-2 max-w-lg mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              The minds behind WryClip, building the next-generation casting and content monetization marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CEO: Kunj Shukla */}
            <div className={`p-6 rounded-2xl border flex flex-col items-center text-center backdrop-blur-md hover:scale-[1.03] transition-all duration-300 relative overflow-hidden ${darkMode ? "bg-white/5 border-white/10 shadow-lg" : "bg-gray-50 border-gray-200 shadow-sm"
              }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <span className="text-purple-400 font-semibold tracking-wider uppercase text-[10px] mb-4 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/15">Founder & CEO</span>
              <div
                className="w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500/30 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.35)] bg-gradient-to-tr from-purple-500 to-indigo-500 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedImage("/ceo-profile.png")}
              >
                <img src="/ceo-profile.png" alt="Kunj Shukla - CEO" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-lg font-bold mb-1">Kunj Shukla</h3>
              <p className={`text-xs font-medium mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Founder & Chief Executive Officer</p>
              <p className={`text-xs leading-relaxed mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Responsible for the overall vision, corporate strategy, business partnerships and growth of WryClip.
              </p>
              <div className="mt-auto flex flex-col gap-2 items-center">
                <a href="mailto:shriikunj@gmail.com" className="text-xs text-purple-400 font-semibold hover:underline flex items-center gap-1.5">
                  <span>📧</span> shriikunj@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/kunj-shukla-742493342?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 font-semibold hover:underline flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* CTO: Mayank */}
            <div className={`p-6 rounded-2xl border flex flex-col items-center text-center backdrop-blur-md hover:scale-[1.03] transition-all duration-300 relative overflow-hidden ${darkMode ? "bg-white/5 border-white/10 shadow-lg" : "bg-gray-50 border-gray-200 shadow-sm"
              }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <span className="text-blue-400 font-semibold tracking-wider uppercase text-[10px] mb-4 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/15">Co-Founder & CTO</span>
              <div
                className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-500/30 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.35)] bg-gradient-to-tr from-blue-500 to-indigo-500 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedImage("/cto-profile.png")}
              >
                <img src="/cto-profile.png" alt="Mayank - CTO" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-lg font-bold mb-1">Mayank</h3>
              <p className={`text-xs font-medium mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Chief Technology Officer</p>
              <p className={`text-xs leading-relaxed mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Responsible for technology strategy, product development, engineering resources and platform architecture.
              </p>
              <div className="mt-auto flex flex-col gap-2 items-center">
                <a href="mailto:mayank0522.s@gmail.com" className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1.5">
                  <span>📧</span> mayank0522.s@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/mayank-kumar-850255381?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* CMO: Anhad Satsangi */}
            <div className={`p-6 rounded-2xl border flex flex-col items-center text-center backdrop-blur-md hover:scale-[1.03] transition-all duration-300 relative overflow-hidden ${darkMode ? "bg-white/5 border-white/10 shadow-lg" : "bg-gray-50 border-gray-200 shadow-sm"
              }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <span className="text-pink-400 font-semibold tracking-wider uppercase text-[10px] mb-4 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/15">Co-Founder & CMO</span>
              <div
                className="w-28 h-28 rounded-full overflow-hidden border-2 border-pink-500/30 mb-4 shadow-[0_0_20px_rgba(236,72,153,0.35)] bg-gradient-to-tr from-pink-500 to-purple-500 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedImage("/cmo-profile.png")}
              >
                <img src="/cmo-profile.png" alt="Anhad Satsangi - CMO" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-lg font-bold mb-1">Anhad Satsangi</h3>
              <p className={`text-xs font-medium mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Chief Marketing Officer</p>
              <p className={`text-xs leading-relaxed mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Responsible for marketing operations, brand development, public relations and user acquisition.
              </p>
              <div className="mt-auto flex flex-col gap-2 items-center">
                <a href="mailto:anhadsatsangi05@gmail.com" className="text-xs text-pink-400 font-semibold hover:underline flex items-center gap-1.5">
                  <span>📧</span> anhadsatsangi05@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/anhadsatsangi?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pink-400 font-semibold hover:underline flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  LinkedIn Profile
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </main>

      <Footer darkMode={darkMode} />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors border border-white/10 text-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Full Preview"
              className="w-full h-auto max-h-[85vh] object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
