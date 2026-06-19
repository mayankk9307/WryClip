"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function CommunityGuidelinesPage() {
  const [darkMode, toggleDarkMode] = usePersistedTheme();

  return (
    <div className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"} relative min-h-screen transition-colors duration-500`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Safety
          </span>
          <h1 className="text-4xl font-bold mt-4">Community Guidelines</h1>
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Last Updated: June 18, 2026</p>
        </div>

        {/* Content Box */}
        <div className={`p-8 md:p-12 rounded-2xl border backdrop-blur-xl ${
          darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/50 border-gray-200 shadow-sm"
        }`}>
          
          <div className={`space-y-8 text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            
            <section>
              <p>
                WryClip is a professional casting platform and short-form entertainment community. To maintain a safe, welcoming, and productive workspace for creators, actors, and producers, all users must follow these guidelines.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>1. Professional Casting Environment</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Respectful Applications:</strong> 
                  Actors must apply only to roles matching their actual profile, skills, and gender/age constraints. Spamming producers with irrelevant submissions is prohibited.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Feedback Decency:</strong> 
                  Producers and casting directors must maintain a professional and constructive tone in audition feedback. Abusive comments, threats, or demanding inappropriate activities will result in immediate account deletion.
                </li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>2. Prohibited Content</h2>
              <p className="mb-4">We maintain strict control over the content uploaded to our public feeds:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Explicit Content:</strong> 
                  Nudity, sexually explicit videos, pornography, or excessive, gore-filled violence will be instantly deleted.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Harassment and Hate Speech:</strong> 
                  We have zero tolerance for hate speech, cyber-bullying, discrimination, defamation, or targeting of individuals based on race, religion, gender, or orientation.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Plagiarism & Unauthorized Uploads:</strong> 
                  Do not upload clips, trailers, reels, scenes, poetry, scripts, stories, screenplays, ghazals, or any copyright-protected media or written work that you do not own or have written yourself. Originality is our key asset.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Financial Scams:</strong> 
                  Advertising get-rich-quick schemes, spam links, multi-level marketing, or attempting to bypass WryClip's internal payment systems is strictly prohibited.
                </li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>3. Moderation and Enforcement</h2>
              <p className="mb-4">We employ a robust, community-assisted and automated reporting system:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Report System:</strong> 
                  Users can flag content (reels, auditions, profiles, comments) for reasons including *Spam, Fake Profile, Abusive Content, Copyright Issues, Inappropriate Content,* or *Scam/Payment Fraud*.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>5-Report Threshold:</strong> 
                  Any reel, post, comment, or audition that accumulates **5 reports or more** is automatically swept and hidden from public feeds until reviewed and cleared by WryClip administrators.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Consequences:</strong> 
                  Violating community guidelines may result in content removal, warnings, account suspension, role demotions, or permanent hardware-level IP bans for repeat offenders.
                </li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10 text-center">
              <p className="text-xs">
                To report violations of these guidelines directly to our moderation team, please email: <a href="mailto:support.wryclip@gmail.com" className="text-purple-400 hover:underline">support.wryclip@gmail.com</a>
              </p>
            </section>

          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
