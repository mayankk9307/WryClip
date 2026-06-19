"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function ContactPage() {
  const [darkMode, toggleDarkMode] = usePersistedTheme();
  const [formData, setFormData] = useState({ name: "", email: "", topic: "Casting & Auditions Support", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const currentName = formData.name;
    const currentEmail = formData.email;
    const currentTopic = formData.topic;
    const currentMessage = formData.message;

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
          name: currentName,
          email: currentEmail,
          subject: `[WryClip Support] ${currentTopic}`,
          message: currentMessage,
          reply_to: currentEmail,
          from_name: "WryClip Website Support Hub"
        })
      });

      const result = await response.json();

      setIsSubmitting(false);

      if (response.ok && result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", topic: "Casting & Auditions Support", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.warn("Form submission API error: Web3Forms contact request failed. Redirecting to mailto fallback.", result);
        window.location.href = `mailto:support.wryclip@gmail.com?subject=${encodeURIComponent(`[WryClip Support] ${currentTopic}`)}&body=${encodeURIComponent(`Hi WryClip Support,\n\nName: ${currentName}\nEmail: ${currentEmail}\n\nMessage:\n${currentMessage}`)}`;
      }
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      window.location.href = `mailto:support.wryclip@gmail.com?subject=${encodeURIComponent(`[WryClip Support] ${currentTopic}`)}&body=${encodeURIComponent(`Hi WryClip Support,\n\nName: ${currentName}\nEmail: ${currentEmail}\n\nMessage:\n${currentMessage}`)}`;
    }
  };

  return (
    <div className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"} relative min-h-screen transition-colors duration-500`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto relative z-10">

        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Contact WryClip Support
          </h1>
          <p className={`mt-4 text-base max-w-2xl mx-auto leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Have questions about your Creator Wallet, need technical support with your audition videos, or want to discuss casting calls? Reach out to our team.
          </p>
        </div>

        {/* 2-Column Section */}
        <div className="grid md:grid-cols-5 gap-12 items-stretch">

          {/* Column 1: Info and Support Channels */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-bold mb-2">Support Channels</h2>

            <div className={`p-5 rounded-xl border flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <span className="text-2xl shrink-0">📧</span>
              <div>
                <h3 className="font-semibold text-sm">General Support & Feedback</h3>
                <p className={`text-xs mt-1 mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>For app issues, registration problems, or feedback</p>
                <a href="mailto:support.wryclip@gmail.com" className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition font-medium">support.wryclip@gmail.com</a>
              </div>
            </div>

            <div className={`p-5 rounded-xl border flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <span className="text-2xl shrink-0">💳</span>
              <div>
                <h3 className="font-semibold text-sm">Creator Wallet & Payout Support</h3>
                <p className={`text-xs mt-1 mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>For UPI payouts, wallet balance, or commissions splits</p>
                <a href="mailto:billing.wryclip@gmail.com" className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition font-medium">billing.wryclip@gmail.com</a>
              </div>
            </div>

            <div className={`p-5 rounded-xl border flex gap-4 ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <span className="text-2xl shrink-0">⚖️</span>
              <div>
                <h3 className="font-semibold text-sm">DMCA & Copyright Legal</h3>
                <p className={`text-xs mt-1 mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>For reporting copyright violations or content removal requests</p>
                <a href="mailto:legal.wryclip@gmail.com" className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition font-medium">legal.wryclip@gmail.com</a>
              </div>
            </div>

            <div className={`p-5 rounded-xl border relative overflow-hidden bg-gradient-to-r ${darkMode ? "from-purple-950/20 to-indigo-950/10 border-white/15 animate-pulse-slow" : "from-purple-50 to-indigo-50/50 border-purple-200"
              }`}>
              <h3 className="font-bold text-sm text-purple-400 mb-1">Escalation & Partnerships</h3>
              <p className={`text-xs mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Direct administrator escalations and official business collaborations:</p>
              <div className="flex flex-col gap-2 text-xs">
                <div>
                  <span className="font-semibold">👤 Kunj Shukla (Co-Founder & CEO)</span>
                  <span className="block text-gray-400">📧 <a href="mailto:shriikunj@gmail.com" className="text-purple-400 hover:underline">shriikunj@gmail.com</a></span>
                </div>
                <div>
                  <span className="font-semibold">👤 Mayank Kumar (Co-Founder & CTO)</span>
                  <span className="block text-gray-400">📧 <a href="mailto:mayank0522.s@gmail.com" className="text-purple-400 hover:underline">mayank0522.s@gmail.com</a></span>
                </div>
                <div>
                  <span className="font-semibold">👤 Anhad Satsangi (Co-Founder & CMO)</span>
                  <span className="block text-gray-400">📧 <a href="mailto:anhadsatsangi05@gmail.com" className="text-purple-400 hover:underline">anhadsatsangi05@gmail.com</a></span>
                </div>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              * Standard response window is **Monday to Saturday, 10:00 AM to 6:00 PM (IST)**. Typical response time is 24 to 48 business hours.
            </p>
          </div>

          {/* Column 2: Contact Form */}
          <div className="md:col-span-3">
            <div className={`h-full p-8 rounded-2xl border backdrop-blur-xl flex flex-col justify-center ${darkMode ? "bg-black/45 border-white/15 shadow-2xl" : "bg-gray-50/50 border-gray-200 shadow-sm"
              }`}>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                      <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </motion.svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                    <p className={`text-sm max-w-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Thank you for contacting WryClip. A support representative will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <h2 className="text-2xl font-bold mb-2">Send a Message</h2>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`p-3 rounded-lg border outline-none text-sm transition duration-300 ${darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                          }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`p-3 rounded-lg border outline-none text-sm transition duration-300 ${darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                          }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="topic" className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Topic</label>
                      <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className={`p-3 rounded-lg border outline-none text-sm transition duration-300 ${darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                          }`}
                      >
                        <option value="Casting & Auditions Support">Casting & Auditions Support</option>
                        <option value="Creator Payout / UPI Inquiry">Creator Payout / UPI Inquiry</option>
                        <option value="Pro Subscription Query">Pro Subscription Query</option>
                        <option value="Bug Report / Technical Issue">Bug Report / Technical Issue</option>
                        <option value="Other">Other</option>

                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`p-3 rounded-lg border outline-none text-sm transition duration-300 resize-none ${darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                          }`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] active:scale-95 transition-all font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-h-[50px] text-white text-sm"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : "Send Message 🚀"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
