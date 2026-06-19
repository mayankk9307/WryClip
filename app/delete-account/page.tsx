"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function DeleteAccountPage() {
  const [darkMode, toggleDarkMode] = usePersistedTheme();
  const [emailInput, setEmailInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setLoading(true);

    const currentEmail = emailInput;
    const currentReason = reasonInput;

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "038a7e54-cb6f-4108-a01b-b1b233e47f1b";
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: "WryClip User Deletion Request",
          email: currentEmail,
          subject: `[WryClip Deletion Request] Account Deletion for ${currentEmail}`,
          message: `User with email ${currentEmail} has requested account deletion.\n\nReason:\n${currentReason || "No reason specified."}`,
          reply_to: currentEmail,
          from_name: "WryClip Deletion Hub"
        })
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok && result.success) {
        setSubmitted(true);
        setEmailInput("");
        setReasonInput("");
      } else {
        console.warn("Form submission API error: Web3Forms contact request failed. Redirecting to mailto fallback.", result);
        window.location.href = `mailto:support.wryclip@gmail.com?subject=WryClip Account Deletion Request&body=${encodeURIComponent(`Hi WryClip Support,\n\nPlease delete my WryClip account associated with this email.\n\nRegistered Email: ${currentEmail}\nReason: ${currentReason || "No reason specified."}`)}`;
      }
    } catch (err) {
      console.error("Submission error:", err);
      setLoading(false);
      window.location.href = `mailto:support.wryclip@gmail.com?subject=WryClip Account Deletion Request&body=${encodeURIComponent(`Hi WryClip Support,\n\nPlease delete my WryClip account associated with this email.\n\nRegistered Email: ${currentEmail}\nReason: ${currentReason || "No reason specified."}`)}`;
    }
  };

  return (
    <div className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"} relative min-h-screen transition-colors duration-500`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-500 bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
            Account Management
          </span>
          <h1 className="text-4xl font-bold mt-4">Delete My Account</h1>
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>WryClip User Data Deletion & Privacy Center</p>
        </div>

        {/* Info & Request form grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left Column: Details on Cascading Delete */}
          <div className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl flex flex-col justify-between ${
            darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/50 border-gray-200 shadow-sm"
          }`}>
            <div className={`space-y-6 text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>What happens when you delete?</h2>
              
              <p>
                Deleting your account triggers an automatic, secure cascading wipe. WryClip is designed with data privacy at its core, meaning **we do not retain residue data**.
              </p>

              <div className="space-y-3.5 mt-4">
                <div className="flex gap-3">
                  <span className="text-red-500 shrink-0">🗑️</span>
                  <div>
                    <h4 className={`font-semibold text-xs uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>Database Cleanup</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Your profile name, biography, verified phone number, email, and referral codes are permanently purged from our database.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-red-500 shrink-0">🎬</span>
                  <div>
                    <h4 className={`font-semibold text-xs uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>Media Files Erased</h4>
                    <p className="text-xs text-gray-400 mt-0.5">All your uploaded vertical reels, series clips, audition tape video files, and screenplays are completely deleted from Cloudinary storage.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-red-500 shrink-0">💳</span>
                  <div>
                    <h4 className={`font-semibold text-xs uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>Wallet & Financial Wipe</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Linked UPI IDs, withdrawal logs, transaction records, and wallet history are deleted.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-6 text-xs text-red-400">
                <strong>⚠️ Warning:</strong> Account deletion is permanent and cannot be undone. Once deleted, your custom referral score, unlocked written library, and badges are lost forever.
              </div>
            </div>
          </div>

          {/* Right Column: Deletion Request Form */}
          <div className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${
            darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/50 border-gray-200 shadow-sm"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Submit Deletion Request</h2>
            <p className={`text-xs mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              The fastest way to delete your account is inside the mobile app settings. If you cannot access the app, enter your details below to submit a deletion ticket:
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center text-green-400"
              >
                <span className="text-3xl mb-2 block">✅</span>
                <h4 className="font-bold text-sm">Request Submitted Successfully</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Our administrative support team has received your ticket. We will process your cascading database wipe within 48 hours and send a confirmation email.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-400">Registered Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter account email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className={`w-full p-2.5 rounded-lg text-sm border outline-none transition duration-300 ${
                      darkMode
                        ? "bg-[#0d111d] border-white/15 focus:border-red-500 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 focus:border-red-500 text-black placeholder-gray-400"
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-400">Reason for Deletion (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us why you are leaving..."
                    value={reasonInput}
                    onChange={(e) => setReasonInput(e.target.value)}
                    className={`w-full p-2.5 rounded-lg text-sm border outline-none transition duration-300 resize-none ${
                      darkMode
                        ? "bg-[#0d111d] border-white/15 focus:border-red-500 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 focus:border-red-500 text-black placeholder-gray-400"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg text-sm hover:scale-[1.02] active:scale-95 transition flex items-center justify-center min-h-[40px]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Delete My Account"
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 border-t border-white/10 pt-4 text-center">
              <p className="text-xs text-gray-500">
                Have question or direct request? Email us at: <a href="mailto:support.wryclip@gmail.com" className="text-purple-400 hover:underline">support.wryclip@gmail.com</a>
              </p>
            </div>
          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
