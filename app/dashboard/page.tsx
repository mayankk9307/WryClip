"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.phone) return;

    setPhoneError("");
    const strippedPhone = formData.phone.replace(/\D/g, "");
    if (strippedPhone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number!");
      return;
    }

    setIsSubmitting(true);
    
    const params = new URLSearchParams();
    params.append('name', "Dashboard User");
    params.append('email', formData.email);
    params.append('phone', formData.phone);
    
    try {
      await fetch("https://script.google.com/macros/s/AKfycby4M8nyS0fkpE9sNfkUWSJmtOkhyCm3fPDtiUSKk4-9ytuO-o4JFcyhQGkzjnsdM-EptQ/exec", {
        method: "POST",
        body: params,
      });
      setIsSuccess(true);
      setFormData({ email: "", phone: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-x-hidden">


      {/* Navbar */}
      <Navbar />



      {/* Hero */}
      <section id="about" className="relative z-10 text-center pt-32 pb-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 bg-clip-text text-transparent tracking-tight"
        >
          WryClip
        </motion.h1>
        <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
          Shifting the world of content creation
        </p>
        <button
          onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
        >
          Join WryClip
        </button>
      </section>

      {/* Sections */}
      <section id="sections" className="mt-32 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {["For Writers", "For Creators", "Talent Discovery"].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">{item}</h3>
            <p className="text-gray-400">Build, create and grow with next-gen tools.</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mt-32 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-center">What People Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              name: "Mansi", 
              handle: "@mansi.hihihi_", 
              link: "https://www.instagram.com/mansi.hihihi_?igsh=ZzhxOGlqbzU1bjRk", 
              feedback: "Social media feels so filtered lately, so this concept is a breath of fresh air! We really needed a platform like this. Can’t wait for the launch! something big is brewing! The idea is super fresh and honestly, game-changing. Can't wait for the launch, counting down the days!" 
            },
            { 
              name: "Aakanksha Bhat (Author)", 
              handle: "", 
              link: "", 
              bookTitle: "How To Read When You Hate Reading",
              bookLink: "https://amzn.in/d/05m16rck",
              feedback: "An app that thoughtfully bridges the gap between story writer and story teller. Can't wait for the launch! honestly that's a great initiative. What’s particularly compelling is the underlying philosophy valuing originality as an asset rather than a byproduct. Looking forward to seeing this platform come to life." 
            },
            { 
              name: "Dhruv", 
              handle: "@why_should.i_care", 
              link: "https://www.instagram.com/why_should.i_care?igsh=MTgyazUxeXhnZWN4ag==", 
              feedback: "Bringing writers, creators, and the audience together in one place, that’s where the real magic happens. If the execution is strong, this could seriously change how we consume stories. Honestly, this feels like something new and meaningful. Definitely excited to see how this turns out. Waiting for the launch!" 
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
            >
              <p className="text-gray-400 italic leading-relaxed text-sm">
                "{t.feedback}"
              </p>
              <div className="mt-4 flex flex-col items-center">
                <h4 className="text-sm text-gray-300 font-semibold text-center">{t.name}</h4>
                {t.handle && (
                  <a 
                    href={t.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-1 text-xs bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-medium hover:opacity-80 transition inline-flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    {t.handle}
                  </a>
                )}
                {t.bookTitle && t.bookLink && (
                  <a 
                    href={t.bookLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-2 text-xs bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent font-medium hover:opacity-80 transition inline-flex items-center gap-1 text-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                    <span>{t.bookTitle}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="mt-32 max-w-md mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Register</h2>
        
        <div className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden min-h-[250px] flex flex-col justify-center">
          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-4"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </motion.svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Successfully Submitted!</h3>
              <p className="text-gray-400 text-sm">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="Email" className="p-3 rounded-lg bg-black border border-gray-600 outline-none focus:border-purple-500 transition-all duration-300 [&:not(:placeholder-shown)]:border-purple-500 [&:not(:placeholder-shown)]:bg-purple-900/40" />
                <input 
                  required 
                  value={formData.phone} 
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    if (phoneError) setPhoneError("");
                  }} 
                  type="tel" 
                  placeholder="Phone" 
                  className="p-3 rounded-lg bg-black border border-gray-600 outline-none focus:border-purple-500 transition-all duration-300 [&:not(:placeholder-shown)]:border-purple-500 [&:not(:placeholder-shown)]:bg-purple-900/40" 
                />
                {phoneError && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm font-medium px-1 text-left">
                    {phoneError}
                  </motion.div>
                )}
                <button disabled={isSubmitting} type="submit" className="py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] active:scale-95 transition flex items-center justify-center min-h-[50px] shadow-[0_0_15px_rgba(168,85,247,0.3)] disabled:opacity-70 disabled:hover:scale-100">
                  {isSubmitting ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Submit"}
                </button>
              </form>
              <p className="text-gray-400 mt-6 text-sm">Or register using Google</p>
              <button className="mt-2 flex items-center justify-center gap-2 p-3 rounded-lg bg-white text-black font-medium hover:scale-105 transition mx-auto w-full">
                <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /> Google
              </button>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-32 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <p className="font-semibold">How does WryClip work?</p>
            <p className="text-gray-400 mt-2">You upload stories, creators pick, and videos are created easily.</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <p className="font-semibold">Is it free?</p>
            <p className="text-gray-400 mt-2">Basic version is free, premium features coming soon.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}