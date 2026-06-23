"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer({ darkMode = true }: { darkMode?: boolean }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });

      const result = await response.json();

      setLoading(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);

      if (!response.ok || !result.success) {
        console.warn("Subscription submission API error:", result.error || "Unknown error");
      }
    } catch (err) {
      console.error("Subscription submit error:", err);
      setLoading(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className={`border-t transition-colors duration-500 mt-20 ${
      darkMode 
        ? "bg-[#05070c] text-gray-400 border-white/10" 
        : "bg-gray-50 text-gray-600 border-black/10"
    } py-12 px-6 md:px-12`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <a href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              WryClip
            </span>
          </a>
          <p className="text-sm leading-relaxed">
            Creator Ecosystem for Actors, Writers, Filmmakers and Content Creators. Discover auditions, collaborations, creative opportunities and industry connections in one platform.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.instagram.com/wryclip?igsh=MWo2b2Y5emo5aWNsdA=="
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg border transition ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-purple-950/20 text-white hover:text-purple-400"
                  : "bg-white border-gray-200 hover:border-purple-500/50 hover:bg-purple-50 text-gray-800 hover:text-purple-600 shadow-sm"
              }`}
              title="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            
            <a
              href="https://www.linkedin.com/in/wryclip-504b03400?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg border transition ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-blue-950/20 text-white hover:text-blue-400"
                  : "bg-white border-gray-200 hover:border-blue-500/50 hover:bg-blue-50 text-gray-800 hover:text-blue-600 shadow-sm"
              }`}
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Platform Links Column */}
        <div className="flex flex-col gap-3 md:pl-6">
          <h4 className={`text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Platform</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a href="/" className="hover:text-purple-400 hover:underline transition">Home</a>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-400 hover:underline transition">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-400 hover:underline transition">Contact Us</Link>
            </li>
            <li>
              <a href="/#faq" className="hover:text-purple-400 hover:underline transition">FAQs</a>
            </li>
            <li>
              <Link href="/download" className="hover:text-purple-400 hover:underline transition font-semibold">Download App 🚀</Link>
            </li>
          </ul>
        </div>

        {/* Legal Links Column */}
        <div className="flex flex-col gap-3">
          <h4 className={`text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Legal & Safety</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/privacy-policy" className="hover:text-purple-400 hover:underline transition">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-purple-400 hover:underline transition">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/community-guidelines" className="hover:text-purple-400 hover:underline transition">Community Guidelines</Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-purple-400 hover:underline transition">Refund Policy</Link>
            </li>
            <li>
              <Link href="/delete-account" className="hover:text-purple-400 hover:underline transition text-red-400 hover:text-red-300">Delete Account</Link>
            </li>
            <li>
              <Link href="/copyright-policy" className="hover:text-purple-400 hover:underline transition">Copyright & DMCA Policy</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-3">
          <h4 className={`text-base font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Subscribe for Casting Alerts</h4>
          <p className="text-sm">Get notified about new projects, castings, and creator wallet feature releases.</p>
          
          <form onSubmit={handleSubscribe} className="flex gap-2 mt-2">
            <input
              type="email"
              required
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2.5 rounded-lg text-sm border outline-none transition duration-300 ${
                darkMode
                  ? "bg-[#0d111d] border-white/15 focus:border-purple-500 text-white placeholder-gray-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                  : "bg-white border-gray-300 focus:border-purple-600 text-black placeholder-gray-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg text-sm hover:scale-105 active:scale-95 transition flex items-center justify-center shrink-0 min-w-[70px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Join"
              )}
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-green-400 font-medium mt-1"
            >
              Successfully joined! We'll keep you in the loop. 🌟
            </motion.p>
          )}
        </div>

      </div>

      {/* Footer Bottom */}
      <div className={`max-w-6xl mx-auto border-t mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 ${
        darkMode ? "border-white/10" : "border-gray-200"
      }`}>
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} WryClip. All rights reserved. Designed for talent, built for creators.
        </p>
        <div className="flex flex-col sm:items-end gap-1 text-center sm:text-right">
          <p className="font-semibold text-purple-400">WryClip Founding Team | support.wryclip@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}