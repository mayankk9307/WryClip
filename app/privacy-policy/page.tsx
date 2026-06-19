"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold mt-4">Privacy Policy</h1>
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Last Updated: June 18, 2026</p>
        </div>

        {/* Content Box */}
        <div className={`p-8 md:p-12 rounded-2xl border backdrop-blur-xl ${
          darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/50 border-gray-200 shadow-sm"
        }`}>
          
          <div className={`space-y-8 text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            
            <section>
              <p>
                WryClip ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the WryClip mobile application and website. Please read this policy carefully.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>1. Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us through the registration, profile set up, written upload, and audition flows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Account Information:</strong> Name, email address, username, phone number, password, profile photo, and your custom invite or referral code.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Creator Profile Details:</strong> Actor portfolios, writer resumes, external links, location, resume details, gender, age range, and professional background.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>User Content:</strong> Written materials (poetry, stories, ghazals, screenplays, scripts, thoughts), video reels, series clips, comments, messages, and audition videos that you record, upload, or transmit on the platform.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Financial Information:</strong> UPI IDs, account holder names, and transaction history for written content locks, subscriptions, and payout requests.</li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>2. System Permissions We Request</h2>
              <p className="mb-4">To support video creations, recordings, castings, and written document uploads, WryClip requests native access on your mobile device:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Camera:</strong> To allow you to record reels, series, and audition videos directly in the app.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Microphone:</strong> To record high-quality audio for your audition tapes and clips.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Photo/Video Gallery & Files:</strong> To browse and upload existing reels, series videos, scripts, and written documents.</li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>3. How We Use Your Information</h2>
              <p className="mb-4">We process your personal information for the following specific purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To personalize your content feed using our recommendation score engine.</li>
                <li>To facilitate the casting and script-selection processes (sharing your audition tapes, roles applied, scripts submitted, and portfolio details with the specific producers managing those projects).</li>
                <li>To process transactions, manage your Creator Wallet balance for written unlocks, and verify UPI withdrawal requests.</li>
                <li>To enforce security, check referral milestone fraud, and manage automated report sweeps (content flagged more than 5 times is automatically hidden).</li>
                <li>To send system notifications (warnings, subscription renewal alerts, and casting/writing updates).</li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>4. Sharing of Information</h2>
              <p className="mb-4">We do not sell your personal data. We only share information under these conditions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Public Profile:</strong> Your public profile details, reels, comments, and public audition tapes are visible to all users.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Producers:</strong> When you apply for a casting call, your audition tape, portfolio links, and application status are fully shared with the project’s producer.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Service Providers:</strong> We share necessary data with secure hosting services (Supabase, Cloudinary) to store your account data and compress/stream video files.</li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>5. Data Security and Account Deletion</h2>
              <p className="mb-4">
                We implement secure technical protocols to safeguard your transactions and user data against unauthorized access, loss, or disclosure.
              </p>
              <p className="mb-4">
                You can delete your account at any time. When you select <strong className={darkMode ? "text-white" : "text-gray-900"}>Delete Account</strong> inside the app settings, the system triggers a cascading wipe that permanently deletes all your profile information, posts, auditions, wallet details, and comments from our database, ensuring no residue data remains on our servers.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>6. Third-Party Services</h2>
              <p className="mb-4">
                WryClip utilizes trusted third-party service providers to power specific app functionalities:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Supabase:</strong> For secure database management, user authentication, and profile metadata storage.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Cloudinary:</strong> For hosting, compressing, and delivering rich media assets like vertical video reels, audition clips, and images.</li>
              </ul>
              <p className="mt-4">
                These third-party services maintain their own independent privacy policies governing how they handle data. We recommend reviewing their policies to understand their data processing practices.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>7. Children's Privacy</h2>
              <p className="mb-4">
                WryClip is not intended for use by children under the age of 13. We do not knowingly collect or solicit personal information from anyone under 13. If we discover that we have accidentally collected personal data from a child under 13, we will take immediate steps to delete that information permanently from our servers.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>8. User Rights</h2>
              <p className="mb-4">
                We believe in giving you complete control over your data. As a WryClip user, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access, review, or update your personal account information and creator profile details at any time inside the app settings.</li>
                <li>Request a manual export or copy of the personal data we hold about you.</li>
                <li>Delete your account and all associated personal data using our native in-app deletion button or by contacting our support desk.</li>
              </ul>
              <p className="mt-4">
                For any data-related requests or inquiries, please contact us at <a href="mailto:support.wryclip@gmail.com" className="text-purple-400 hover:underline">support.wryclip@gmail.com</a>.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>9. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time to reflect changes in our practices, services, or legal obligations. When updates are made, we will revise the "Last Updated" date at the top of this page. Your continued use of WryClip after a revised policy is posted constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>10. Contact Information</h2>
              <p className="mb-4">
                For questions, feedback, or concerns regarding this Privacy Policy or our data practices, please contact us:
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
