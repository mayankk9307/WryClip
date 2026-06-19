"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function CopyrightPolicyPage() {
  const [darkMode, toggleDarkMode] = usePersistedTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    targetUsername: "",
    reason: "Copyright Issue (DMCA Request)",
    details: "",
    declaration: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.targetUsername || !formData.details || !formData.declaration) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isLegal: true,
          name: "WryClip Copyright Report Hub",
          email: formData.email,
          subject: `[WryClip DMCA/Copyright] ${formData.reason} from ${formData.name}`,
          message: `Reporter Details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nReported Profile Username: ${formData.targetUsername}\nReason: ${formData.reason}\n\nProof & Details:\n${formData.details}\n\nAuthorized Declaration Checked: ${formData.declaration ? "YES" : "NO"}`,
          replyto: formData.email,
          from_name: "WryClip Copyright Shield"
        })
      });

      const result = await response.json();
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        targetUsername: "",
        reason: "Copyright Issue (DMCA Request)",
        details: "",
        declaration: false
      });

      if (!response.ok || !result.success) {
        console.warn("Form submission API error: Web3Forms DMCA submission failed. Redirecting to mailto fallback.");
        window.location.href = `mailto:legal.wryclip@gmail.com?subject=${encodeURIComponent(`[WryClip DMCA/Copyright] ${formData.reason}`)}&body=${encodeURIComponent(`Hi WryClip Legal,\n\nI want to report copyright infringement/violation on WryClip.\n\nReporter Name: ${formData.name}\nReporter Email: ${formData.email}\nReporter Phone: ${formData.phone || "Not provided"}\n\nReported Username: ${formData.targetUsername}\nReason: ${formData.reason}\n\nDetails & Proof:\n${formData.details}`)}`;
      }

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        targetUsername: "",
        reason: "Copyright Issue (DMCA Request)",
        details: "",
        declaration: false
      });
      window.location.href = `mailto:legal.wryclip@gmail.com?subject=${encodeURIComponent(`[WryClip DMCA/Copyright] ${formData.reason}`)}&body=${encodeURIComponent(`Hi WryClip Legal,\n\nI want to report copyright infringement/violation on WryClip.\n\nReporter Name: ${formData.name}\nReporter Email: ${formData.email}\nReporter Phone: ${formData.phone || "Not provided"}\n\nReported Username: ${formData.targetUsername}\nReason: ${formData.reason}\n\nDetails & Proof:\n${formData.details}`)}`;
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <div className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"} relative min-h-screen transition-colors duration-500`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Intellectual Property & Moderation
          </span>
          <h1 className="text-4xl font-bold mt-4">Copyright & Content Reporting</h1>
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>WryClip DMCA Policy and Report Hub</p>
        </div>

        {/* Content Box */}
        <div className="grid md:grid-cols-5 gap-8 items-stretch mb-12">
          
          {/* Info Side */}
          <div className="md:col-span-2 flex flex-col gap-6 text-sm">
            <div className={`p-6 rounded-xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
              <h2 className="text-base font-bold mb-3">Copyright & DMCA</h2>
              <p className={`leading-relaxed mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                If you believe that any content hosted on WryClip violates your intellectual property rights, copyright, or platform community guidelines, please submit a formal report.
              </p>
              <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                We act swiftly on valid DMCA takedowns. Legal notifications can be sent directly to:
              </p>
              <a href="mailto:legal.wryclip@gmail.com" className="text-purple-400 font-semibold hover:underline block mt-2">legal.wryclip@gmail.com</a>
            </div>

            <div className={`p-6 rounded-xl border border-yellow-500/20 ${darkMode ? "bg-yellow-500/5 text-yellow-200" : "bg-yellow-50 text-yellow-800"}`}>
              <h3 className="font-bold text-sm mb-2">⚠️ Important Disclaimer</h3>
              <p className="text-xs leading-relaxed">
                Under DMCA and platform rules, submitting false or bad-faith copyright claims can result in legal liability, damage awards, and immediate termination of your WryClip account.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-3">
            <div className={`p-8 rounded-xl border backdrop-blur-xl ${
              darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/55 border-gray-200 shadow-sm"
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
                    <h3 className="text-2xl font-bold mb-2">Report Submitted!</h3>
                    <p className={`text-sm max-w-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Your report has been successfully logged. WryClip moderation team will review the claim and act within 24 to 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 text-sm"
                  >
                    <h3 className="text-lg font-bold mb-2">Submit standard report</h3>
                    
                    <div className="flex flex-col gap-1">
                      <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`p-2.5 rounded-lg border outline-none transition duration-300 ${
                          darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Email</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`p-2.5 rounded-lg border outline-none transition duration-300 ${
                            darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`p-2.5 rounded-lg border outline-none transition duration-300 ${
                            darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Reported Profile Username</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. @acting_talents"
                        value={formData.targetUsername}
                        onChange={(e) => setFormData({ ...formData, targetUsername: e.target.value })}
                        className={`p-2.5 rounded-lg border outline-none transition duration-300 ${
                          darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Reason for Report</label>
                      <select 
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className={`p-2.5 rounded-lg border outline-none transition duration-300 ${
                          darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                        }`}
                      >
                        <option value="Copyright Issue (DMCA Request)">Copyright Issue (DMCA Request)</option>
                        <option value="Spam Content">Spam Content</option>
                        <option value="Fake Profile / Impersonation">Fake Profile / Impersonation</option>
                        <option value="Abusive Content or Harassment">Abusive Content or Harassment</option>
                        <option value="Inappropriate Content">Inappropriate Content</option>
                        <option value="Scam / Payment Fraud">Scam / Payment Fraud</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className={`text-xs font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Report Details & Proof Link</label>
                      <textarea 
                        rows={4}
                        required 
                        placeholder="Please describe why this content is infringing or violating community guidelines. Add links to original works if applicable."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className={`p-2.5 rounded-lg border outline-none transition duration-300 resize-none ${
                          darkMode ? "bg-black/90 border-gray-600 focus:border-purple-500 text-white" : "bg-white border-gray-300 focus:border-purple-600 text-black"
                        }`}
                      />
                    </div>

                    <div className="flex items-start gap-2.5 mt-2">
                      <input 
                        type="checkbox" 
                        id="decl"
                        checked={formData.declaration}
                        onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                        className="mt-1 accent-purple-500 rounded"
                      />
                      <label htmlFor="decl" className={`text-xs leading-relaxed select-none ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        I declare that the information in this report is accurate and I am authorized to act on behalf of the owner. I understand false reports carry legal consequences.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting || !formData.declaration}
                      className="py-3 mt-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] active:scale-95 transition-all font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center min-h-[50px] text-white text-sm"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : "Submit Legal Report 🚨"}
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
