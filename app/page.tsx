"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ComingSoonModal from "./components/ComingSoonModal";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PortfolioView from "./components/PortfolioView";

import { usePersistedTheme } from "./components/usePersistedTheme";

function HomeContent() {
  const navbarHeight = 64;
  const extraOffset = 20;
  const [darkMode, toggleDarkMode] = usePersistedTheme();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  // Track active tab for CSS phone mockups
  const [activeScreenTab, setActiveScreenTab] = useState(0);

  const phoneScreens = [
    {
      title: "Reels & Series Feed",
      badge: "Reels",
      desc: "Watch unlimited vertical reels and short-form series completely free. An open cinematic stream for matching castings and user engagement profiles.",
      image: "/reel-page.jpeg",
      ui: (
        <div className="w-full h-full bg-gradient-to-b from-purple-950/40 via-black to-black p-4 flex flex-col justify-between relative">
          <div className="absolute right-4 bottom-20 flex flex-col gap-4 text-white text-xs items-center">
            <div className="flex flex-col items-center">
              <span className="text-xl">❤️</span>
              <span className="text-[9px] text-gray-400">12.4K</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl">💬</span>
              <span className="text-[9px] text-gray-400">840</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl">✈️</span>
              <span className="text-[9px] text-gray-400">Share</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
            <span>🔴 Live Stream</span>
            <span>v1.2</span>
          </div>

          <div className="text-left text-white max-w-[80%] flex flex-col gap-1.5 mt-auto">
            <span className="text-xs font-bold text-purple-400">@acting_talents</span>
            <p className="text-[10px] text-gray-300 leading-tight">Audition snippet for casting calls. Click to view full series profile!</p>
            <div className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 p-1.5 rounded-lg w-fit">
              <span className="text-[9px]">Viral Boost Applied 🚀</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Writers & Poets Hub",
      badge: "Writers",
      desc: "Publish your scripts, poetry, stories, ghazals, screenplays, and thoughts. Protect high-value written content behind a custom Pay-To-Unlock fee to earn directly from readers.",
      image: "/writer-page.jpeg",
      ui: (
        <div className="w-full h-full bg-[#0d071d] p-4 flex flex-col justify-between text-left text-white overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none animate-pulse"></div>

          <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold border-b border-white/10 pb-2 flex justify-between items-center relative z-10">
            <span>Poetry & Script Library</span>
            <span className="text-[8px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/10">Monetized</span>
          </div>

          <div className="flex flex-col gap-2.5 my-auto relative z-10">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col gap-1 shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white">Khamosh Lab (Ghazal)</span>
                <span className="text-[9px] text-purple-300 font-bold">🔒 Lock: ₹29</span>
              </div>
              <p className="text-[9px] text-gray-300 italic">"Khaamosh labon par silsile hain, yaadon ke purane meley hain..."</p>
              <div className="w-full h-1 bg-white/10 rounded overflow-hidden mt-1">
                <div className="w-[45%] h-full bg-purple-500"></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col gap-1 opacity-70">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white">The Last Audition (Screenplay)</span>
                <span className="text-[9px] text-purple-300 font-bold">🔒 Lock: ₹99</span>
              </div>
              <p className="text-[9px] text-gray-400 leading-tight font-mono">SCENE 1 - INT. COFFEE SHOP - NIGHT</p>
            </div>
          </div>

          <div className="text-[9px] text-gray-400 flex justify-between items-center pt-2 border-t border-white/10 relative z-10">
            <span>124 reads today</span>
            <span className="text-purple-300 font-semibold hover:underline">Unlock Reader</span>
          </div>
        </div>
      )
    },
    {
      title: "Studios Casting Hub",
      badge: "Studios",
      desc: "Browse live projects posted by producers, view gender/age limits, and apply with native recordings instantly.",
      image: "/studio-page.jpeg",
      ui: (
        <div className="w-full h-full bg-[#0d111d] p-4 flex flex-col justify-between text-left text-white">
          <div className="text-[10px] text-blue-400 uppercase tracking-widest font-bold border-b border-white/10 pb-2 flex justify-between items-center">
            <span>Casting Dashboard</span>
            <span className="text-xs text-gray-500">Active</span>
          </div>

          <div className="flex flex-col gap-3 my-auto">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white">Feature Film Lead</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/20">Studio Pro</span>
              </div>
              <p className="text-[9px] text-gray-400">Gender: Female | Age: 18-25 | Tone: Dramatic</p>
              <button className="py-1 px-2.5 rounded bg-blue-600 text-[10px] font-bold text-white w-fit">Apply Now</button>
            </div>

            <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col gap-1.5 opacity-60">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-white">Ad Commercial Cast</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/20">Writer Pro</span>
              </div>
              <p className="text-[9px] text-gray-400">Gender: Male | Age: 22-30 | Tone: Corporate</p>
            </div>
          </div>

          <div className="text-[9px] text-gray-500 text-center">
            Scroll to view 14 matching roles
          </div>
        </div>
      )
    },
    {
      title: "Creator Wallet & Payouts",
      badge: "Wallet",
      desc: "Earn 80% split on premium written unlocks (poetry, scripts, stories, ghazals). Track your reader payout records and request instant UPI withdrawals.",
      image: "/wallet-page.jpeg",
      ui: (
        <div className="w-full h-full bg-[#05070c] p-4 flex flex-col justify-between text-left text-white">
          <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Creator Wallet</div>

          <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/20 border border-purple-500/20 p-4 rounded-2xl my-auto flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
            <div>
              <p className="text-[9px] text-purple-300 uppercase tracking-wider font-semibold">Withdrawable Balance</p>
              <h4 className="text-xl font-bold text-white mt-1">₹8,450.00</h4>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[8px] text-gray-400 font-semibold">Linked UPI ID</label>
              <input type="text" disabled value="mayank0522@okaxis" className="p-1.5 rounded bg-black/60 border border-white/10 text-[9px] text-white outline-none" />
            </div>

            <button className="py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-[10px] font-bold text-center text-white">
              Instant Payout Request
            </button>
          </div>

          <div className="flex justify-between items-center text-[9px] text-gray-500">
            <span>Payout split: 80% Creator</span>
            <span className="text-green-400">● UPI Verified</span>
          </div>
        </div>
      )
    }
  ];

  const searchParams = useSearchParams();
  const writer = searchParams ? searchParams.get("writer") : null;

  if (writer) {
    return (
      <div
        className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"
          } relative min-h-screen overflow-x-hidden overflow-y-auto transition-colors duration-500`}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <PortfolioView username={writer} darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  return (
    <div
      className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"
        } relative min-h-screen overflow-x-hidden overflow-y-auto transition-colors duration-500`}
    >

      {/* Shared Navbar */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* HERO */}
      <section
        id="hero"
        className="relative z-10 flex flex-col items-center text-center px-4 pt-36 pb-10"
      >
        {/* Brand Logo Above Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-4 relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.35)] bg-black"
        >
          <img src="/bg-logo.jpeg" alt="WryClip Logo" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 bg-clip-text text-transparent tracking-tight py-2"
        >
          WryClip Creator Ecosystem
        </motion.h1>

        {/* Subheading */}
        <p className={`mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Connect with actors, writers, filmmakers, casting directors and content creators. Discover auditions, collaborations and creative opportunities.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => setIsComingSoonOpen(true)}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 active:scale-95 transition font-semibold shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            Join WryClip
          </button>

          <a
            href="#why-wryclip"
            className="px-8 py-3 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition font-semibold text-sm flex items-center justify-center text-white cursor-pointer"
          >
            Explore Opportunities →
          </a>
        </div>

        {/* ─── Premium Portfolio Discovery Section ─── */}
        <div className="mt-14 w-full max-w-xl mx-auto px-4 relative z-20">
          {/* Glow halos */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-24 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-16 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Card */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_40px_rgba(139,92,246,0.18)] p-5 sm:p-7">
            {/* Top shimmer border */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70" />
            {/* Corner glow accents */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/20 border border-white/10 flex items-center justify-center text-sm sm:text-base shrink-0">
                  🔍
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-purple-400 leading-tight">Creator Portfolios</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium leading-tight">Discover verified WryClip writers</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-wider shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Live
              </span>
            </div>

            {/* Search Form — stacked on mobile, inline on sm+ */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = (form.elements.namedItem("hero-search") as HTMLInputElement).value.trim();
                if (input) {
                  window.location.search = `?writer=${encodeURIComponent(input)}`;
                }
              }}
              className="relative group mb-4"
            >
              {/* Focus glow ring */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-500/40 to-cyan-500/0 opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-[2px]" />

              <div className="relative rounded-2xl bg-black/40 border border-white/10 group-focus-within:border-purple-500/40 transition-all duration-300 backdrop-blur-xl overflow-hidden">
                {/* Input row */}
                <div className="flex items-center gap-1 px-3 pt-3 pb-2">
                  <span className="text-gray-500 text-sm font-bold shrink-0">@</span>
                  <input
                    type="text"
                    name="hero-search"
                    placeholder="username  (e.g. mayank9307)"
                    className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none font-semibold min-w-0"
                    required
                  />
                </div>
                {/* Submit button — full width below input on all screens */}
                <div className="px-2 pb-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-black rounded-xl tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_4px_16px_rgba(139,92,246,0.35)] cursor-pointer"
                  >
                    View Portfolio →
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Access Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">Try:</span>
              {[
                { username: "mayank9307", color: "purple" },
                { username: "kunjshukla", color: "cyan" },
                { username: "anhad", color: "pink" },
              ].map(({ username, color }) => (
                <button
                  key={username}
                  onClick={() => { window.location.search = `?writer=${username}`; }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border ${
                    color === "purple"
                      ? "bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20"
                      : color === "cyan"
                      ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20"
                      : "bg-pink-500/10 border-pink-500/20 text-pink-300 hover:bg-pink-500/20"
                  }`}
                >
                  @{username}
                </button>
              ))}
            </div>

            {/* Bottom shimmer */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </div>
      </section>

      {/* Why WryClip? Section */}
      <section id="why-wryclip" className="mt-24 max-w-5xl mx-auto px-4 text-center scroll-mt-28">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
          Key Benefits
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">Why WryClip?</h2>
        <p className={`text-sm max-w-xl mx-auto mb-12 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          WryClip bridges the gap between story and screen, bringing actors, writers, filmmakers, and casting directors together into a unified entertainment network.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              icon: "🤝",
              title: "Find Collaborators",
              desc: "Assemble your dream creative team of filmmakers, casting directors, and actors."
            },
            {
              icon: "🎬",
              title: "Discover Auditions",
              desc: "Apply directly to live casting calls and entertainment opportunities."
            },
            {
              icon: "📱",
              title: "Connect with Creators",
              desc: "Build connections with content creators, writers, and filmmakers in India's ecosystem."
            },
            {
              icon: "🌐",
              title: "Build Your Network",
              desc: "Establish your profile and presence within the entertainment industry network."
            },
            {
              icon: "✨",
              title: "Showcase Your Talent",
              desc: "Upload acting reels, poetry, ghazals, screenplays, and complete stories."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`p-6 rounded-2xl border flex flex-col items-center text-center justify-between transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-b from-white/5 to-transparent border-white/10 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                  : "bg-gradient-to-b from-black/5 to-transparent border-black/10 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.05)]"
              }`}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-base font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Screenshots Mockup Section */}
      <section className="mt-28 max-w-5xl mx-auto px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
          Mobile App Experience
        </span>
        <h2 className="text-3xl font-bold mt-4 mb-2">Interactive App Preview</h2>
        <p className={`text-sm max-w-xl mx-auto mb-10 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          WryClip matches native recording capabilities, casting marketplaces, and secure wallets. Select a screen below to preview:
        </p>

        {/* Tab Selection */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {phoneScreens.map((screen, index) => (
            <button
              key={index}
              onClick={() => setActiveScreenTab(index)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${activeScreenTab === index
                  ? "bg-purple-500 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : (darkMode ? "bg-white/5 border-white/10 text-gray-400 hover:text-white" : "bg-gray-100 border-gray-200 text-gray-600 hover:text-black")
                }`}
            >
              {screen.badge}
            </button>
          ))}
        </div>

        {/* Display Active phone */}
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-3xl mx-auto border border-white/10 rounded-3xl p-8 backdrop-blur-md bg-black/30">

          {/* Left: Phone frame */}
          <div className="shrink-0 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-56 h-[445px] border-4 border-gray-800 rounded-[30px] bg-black shadow-2xl relative overflow-hidden flex flex-col justify-between p-2">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-gray-800 rounded-full z-20"></div>
              <div className="w-full h-full rounded-[24px] overflow-hidden bg-black relative pt-5">
                {phoneScreens[activeScreenTab].image ? (
                  <img
                    src={phoneScreens[activeScreenTab].image}
                    alt={phoneScreens[activeScreenTab].title}
                    className="w-full h-[calc(100%-20px)] object-contain object-top"
                    loading="lazy"
                  />
                ) : (
                  phoneScreens[activeScreenTab].ui
                )}
              </div>
            </div>
          </div>

          {/* Right: Info details */}
          <div className="text-left flex flex-col gap-4">
            <h3 className="text-xl font-bold text-purple-400">{phoneScreens[activeScreenTab].title}</h3>
            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {phoneScreens[activeScreenTab].desc}
            </p>
            <div className="flex gap-2.5 mt-2">
              <button
                onClick={() => setIsComingSoonOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-xs font-semibold hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                Get App Access
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Explore Sections */}
      <section id="sections" className="mt-32 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {[
          {
            title: "For Writers & Poets",
            desc: "Publish your scripts, poetry, stories, ghazals, and screenplays. Set custom Pay-To-Unlock fees to monetize your written content directly from readers."
          },
          {
            title: "For Video Creators",
            desc: "Stream your creative reels and vertical micro-series completely free, upload acting auditions, and grow your audience."
          },
          {
            title: "Talent Discovery",
            desc: "Browse live casting projects, rate applicants, and discover next-generation acting stars and original written scripts."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-2xl border border-white/10 cursor-pointer backdrop-blur-lg ${darkMode ? "bg-white/5" : "bg-black/5"
              }`}
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm leading-relaxed`}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* About Us Preview */}
      <section className="mt-32 max-w-4xl mx-auto px-4 text-center">
        <div className={`p-8 md:p-12 rounded-2xl border backdrop-blur-md relative overflow-hidden ${darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/50 border-gray-200"
          }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">WryClip Story</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Shifting The World Of Entertainment</h2>
          <p className={`text-sm leading-relaxed max-w-2xl mx-auto mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            We are democratizing the entertainment industry by connecting aspiring actors directly with casting directors, while empowering writers and poets to monetize premium scripts, poetry, and screenplays directly.
          </p>

          <Link
            href="/about"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition font-semibold text-sm text-white inline-block shadow-md"
          >
            Read Our Full Story & Vision
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mt-32 max-w-5xl mx-auto px-4 text-center">
        <h2 className={`text-3xl font-bold mb-10 ${darkMode ? "text-white" : "text-black"}`}>What People Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "~ Mansi",
              handle: "@mansi.hihihi_",
              link: "https://www.instagram.com/mansi.hihihi_?igsh=ZzhxOGlqbzU1bjRk",
              feedback: "Social media feels so filtered lately, so this concept is a breath of fresh air! We really needed a platform like this. Can’t wait for the launch! something big is brewing! The idea is super fresh and honestly, game-changing. Can't wait for the launch, counting down the days!"
            },
            {
              name: "~ Aakanksha Bhat (Author)",
              handle: "",
              link: "",
              bookTitle: "How To Read When You Hate Reading",
              bookLink: "https://amzn.in/d/05m16rck",
              feedback: "An app that thoughtfully bridges the gap between story writer and story teller. Can't wait for the launch! honestly that's a great initiative. What’s particularly compelling is the underlying philosophy valuing originality as an asset rather than a byproduct. Looking forward to seeing this platform come to life."
            },
            {
              name: "~ Dhruv",
              handle: "@why_should.i_care",
              link: "https://www.instagram.com/why_should.i_care?igsh=MTgyazUxeXhnZWN4ag==",
              feedback: "Bringing writers, creators, and the audience together in one place, that’s where the real magic happens. If the execution is strong, this could seriously change how we consume stories. Honestly, this feels like something new and meaningful. Definitely excited to see how this turns out. Waiting for the launch! 🚀✨"
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl border border-white/10 cursor-pointer backdrop-blur-lg flex flex-col justify-between ${darkMode ? "bg-white/5" : "bg-black/5"
                }`}
            >
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} italic leading-relaxed text-sm`}>
                "{t.feedback}"
              </p>
              <div className="mt-4 flex flex-col items-center text-center">
                <h4 className="font-semibold">{t.name}</h4>
                {t.handle && (
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-medium hover:opacity-80 transition inline-flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    {t.handle}
                  </a>
                )}
                {t.bookTitle && t.bookLink && (
                  <a
                    href={t.bookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent font-medium hover:opacity-80 transition inline-flex items-center gap-1.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                    {t.bookTitle}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="mt-32 max-w-4xl mx-auto px-4 scroll-mt-28">
        <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-black"}`}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: "What is WryClip?", a: "WryClip connects actors, writers, creators, filmmakers and casting professionals. Discover auditions, collaborations and creative opportunities in one ecosystem." },
            { q: "Can I monetize my reels or series episodes?", a: "No. On WryClip, video reels, audition clips, and vertical series episodes are completely free to view for all users. Direct Pay-To-Unlock monetization applies exclusively to written materials like poetry, ghazals, scripts, screenplays, and stories." },
            { q: "How does the Pay-To-Unlock written monetization work?", a: "Poets and writers can set a custom INR unlock fee when uploading their written works (poetry, screenplays, scripts, stories, or thoughts). Readers pay this fee to instantly unlock the text, and earnings credit to the writer's wallet." },
            { q: "What is the wallet commission split?", a: "We credit 80% of all written content unlocking fees directly to the creator's wallet, retaining only a 20% platform commission split." },
            { q: "How do I withdraw my earnings?", a: "You can withdraw your earnings directly to your bank account by linking and verifying a valid UPI ID inside your creator wallet dashboard." }
          ].map((item, i) => (
            <details key={i} className={`p-4 rounded-lg cursor-pointer transition ${darkMode ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"}`}>
              <summary className="font-semibold select-none">{item.q}</summary>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-700"} mt-2 text-sm leading-relaxed`}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="mt-32 max-w-4xl mx-auto px-4 text-center pb-12">
        <div className={`p-8 rounded-2xl border backdrop-blur-md ${darkMode ? "bg-black/45 border-white/10 shadow-lg" : "bg-gray-50 border-gray-200"
          }`}>
          <h3 className="text-2xl font-bold mb-2">Need direct assistance?</h3>
          <p className={`text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Our support desk is ready to answer questions about Creator Wallet balances, Pro Subscriptions, or casting calls.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold text-sm hover:bg-purple-500/20 transition"
            >
              📧 Open Support Ticket
            </Link>
            <a
              href="mailto:support.wryclip@gmail.com"
              className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-purple-500/30 text-sm font-semibold transition"
            >
              Contact support.wryclip@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is WryClip?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "WryClip connects actors, writers, creators, filmmakers and casting professionals. Discover auditions, collaborations and creative opportunities in one ecosystem."
                }
              },
              {
                "@type": "Question",
                "name": "Can I monetize my reels or series episodes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. On WryClip, video reels, audition clips, and vertical series episodes are completely free to view for all users. Direct Pay-To-Unlock monetization applies exclusively to written materials like poetry, ghazals, scripts, screenplays, and stories."
                }
              },
              {
                "@type": "Question",
                "name": "How does the Pay-To-Unlock written monetization work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Poets and writers can set a custom INR unlock fee when uploading their written works (poetry, screenplays, scripts, stories, or thoughts). Readers pay this fee to instantly unlock the text, and earnings credit to the writer's wallet."
                }
              },
              {
                "@type": "Question",
                "name": "What is the wallet commission split?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We credit 80% of all written content unlocking fees directly to the creator's wallet, retaining only a 20% platform commission split."
                }
              },
              {
                "@type": "Question",
                "name": "How do I withdraw my earnings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can withdraw your earnings directly to your bank account by linking and verifying a valid UPI ID inside your creator wallet dashboard."
                }
              }
            ]
          })
        }}
      />

      {/* Shared Footer */}
      <Footer darkMode={darkMode} />

      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-purple-400">Loading WryClip...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
