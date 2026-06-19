"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function TermsAndConditionsPage() {
  const [darkMode, toggleDarkMode] = usePersistedTheme();

  return (
    <div className={`${darkMode ? "bg-transparent text-white" : "bg-white text-black"} relative min-h-screen transition-colors duration-500`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
            Legal
          </span>
          <h1 className="text-4xl font-bold mt-4">Terms and Conditions</h1>
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Last Updated: June 18, 2026</p>
        </div>

        {/* Content Box */}
        <div className={`p-8 md:p-12 rounded-2xl border backdrop-blur-xl ${
          darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/50 border-gray-200 shadow-sm"
        }`}>
          
          <div className={`space-y-8 text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            
            <section>
              <p>
                Please read these Terms and Conditions carefully before using the WryClip mobile application and website. By accessing or using our platform, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>1. Platform Participation and Roles</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Creators & Actors:</strong> 
                  You must provide authentic credentials, portfolio details, and contact numbers. Impersonation of other talents, actors, or public figures will lead to immediate profile ban. Severe or repeated violations may result in permanent account suspension and restriction from creating new accounts.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Writers & Poets:</strong> 
                  You may upload original poetry, scripts, stories, ghazals, screenplays, and thoughts. You must hold full copyright ownership of any written material you publish. Plagiarism, copyright infringement, or posting others' work without authorization will result in an immediate account ban.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Producers & Casting Agents:</strong> 
                  You must publish legitimate projects and role descriptions. Posting fake casting calls, charging actors application fees outside the platform, or violating hiring ethics is strictly prohibited and will lead to profile suspension and legal reports.
                </li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>2. Revenue Sharing and Creator Wallet</h2>
              <p className="mb-4">WryClip supports direct content monetization through digital wallets:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Pay-To-Unlock Written Content:</strong> 
                  Writers and poets can charge a custom fee (in INR) to unlock premium written works, scripts, poetry, screenplays, and stories. **Video reels, auditions, and short-form series episodes cannot be locked and are completely free to view for all users.**
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Revenue Split:</strong> 
                  All paid written content unlocks are split **80/20**—80% is credited directly to the writer's/poet's wallet, and 20% is retained by WryClip as a platform hosting commission.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Withdrawals:</strong> 
                  Wallet balances can be withdrawn directly using a valid UPI ID. Withdrawal requests are processed manually by our administrative team after checking for potential referral fraud or content violations, usually within 24 to 48 hours.
                </li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>3. Pro Subscriptions and Demotion</h2>
              <p className="mb-4">WryClip offers tiered monthly subscriptions to access advanced features:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Subscription Tiers:</strong> 
                  We offer <strong className={darkMode ? "text-white" : "text-gray-900"}>Writer Pro</strong> (₹199/mo), <strong className={darkMode ? "text-white" : "text-gray-900"}>Creator Pro</strong> (₹499/mo), and <strong className={darkMode ? "text-white" : "text-gray-900"}>Studio Pro</strong> (₹999/mo).
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Expiry Warnings:</strong> 
                  The platform marks accounts as expiring and sends system warnings 24 hours prior to subscription expiration.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Demotion:</strong> 
                  If a subscription is not renewed by the expiration date, your account is automatically demoted to the Free tier, and all pro benefits (custom profile customizers, glowing auras, and detailed dashboard analytics charts) will be removed or hidden.
                </li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>4. Content Licensing & IP Rights</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>Ownership:</strong> 
                  You retain 100% ownership of the content (written works, scripts, poetry, stories, ghazals, screenplays, reels, series, audition videos) you upload to WryClip.
                </li>
                <li>
                  <strong className={darkMode ? "text-white" : "text-gray-900"}>License Grant:</strong> 
                  By uploading content (written material or video files), you grant WryClip a worldwide, non-exclusive, royalty-free, transferable license to host, display, stream, render, compress, distribute, and promote your uploaded works on our platform and connected promotional channels.
                </li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>5. Community Guidelines</h2>
              <p className="mb-4">
                To maintain a safe, creative, and professional ecosystem for everyone, all users must adhere to our Community Guidelines. You agree not to upload, post, or share any content that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Is illegal, hateful, abusive, harassing, violent, or defamatory.</li>
                <li>Is sexually explicit or contains pornography.</li>
                <li>Is misleading, fraudulent, or promotes scams (including false job or casting postings).</li>
                <li>Violates copyright, trademark, or any other intellectual property rights of others.</li>
              </ul>
              <p className="mt-4">
                Violation of these guidelines will result in immediate removal of the offending content and may lead to temporary suspension or permanent ban from the WryClip platform.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>6. Content Moderation & Reviews</h2>
              <p className="mb-4">
                WryClip employs automated checks as well as manual review processes to moderate content uploaded on the platform. Content that is reported multiple times by other users will be automatically hidden from public feeds temporarily while our administration team reviews it. We reserve the right to remove any content at our sole discretion without prior notice.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>7. Account Suspension & Termination</h2>
              <p className="mb-4">
                We reserve the right to suspend or permanently terminate your account, delete your profile, and restrict your access to WryClip if we suspect or verify that you have:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Engaged in fraud, phishing, or referral milestone manipulation.</li>
                <li>Infringed copyrights or plagiarized others' scripts, poetry, or vertical videos.</li>
                <li>Posted fake casting calls, solicited unauthorized payments from actors, or misused the hiring dashboard.</li>
                <li>Otherwise violated these Terms & Conditions or our Community Guidelines.</li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>8. Subscription Billing and Refund Policy</h2>
              <p className="mb-4">
                WryClip offers Pro Subscriptions (Writer Pro, Creator Pro, Studio Pro) on a recurring monthly billing cycle. 
              </p>
              <p className="mb-4">
                All subscriptions are **non-refundable**. WryClip does not provide refunds, credits, or prorated billing for partially used subscription periods or inactive accounts, except where required by applicable local law or in the case of verified double-billing or technical billing errors.
              </p>
            </section>

            <section className="border-t pt-6 border-white/15">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>9. Limitation of Liability</h2>
              <p className="mb-4">
                WryClip acts solely as a listing and sharing platform connecting creators, actors, writers, and producers. 
              </p>
              <p className="mb-4">
                We do not employ, verify, or background-check producers, casting directors, actors, or writers. WryClip is not a party to, and will not be held liable or responsible for, any agreements, disputes, hiring decisions, audition ratings, offline interactions, payments, or contracts entered into between users of our platform. You assume all risks associated with your interactions with other users.
              </p>
            </section>

            <section className="border-t pt-6 border-white/15">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>10. Changes to Terms</h2>
              <p className="mb-4">
                WryClip reserves the right, at our sole discretion, to modify or replace these Terms & Conditions at any time. When we make updates, we will revise the "Last Updated" date at the top of this page. Your continued use of the platform after any such changes are published constitutes your binding acceptance of the updated Terms.
              </p>
            </section>

            <section className="border-t pt-6 border-white/15">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>11. Contact Information</h2>
              <p className="mb-4">
                For questions, clarifications, or feedback regarding these Terms and Conditions, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:support.wryclip@gmail.com" className="text-purple-400 hover:underline">support.wryclip@gmail.com</a></li>
                <li><strong>Website:</strong> <a href="https://wryclip.in" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">WryClip (wryclip.in)</a></li>
              </ul>
            </section>

          </div>

        </div>

      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
