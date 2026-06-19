"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { usePersistedTheme } from "../components/usePersistedTheme";

export default function RefundPolicyPage() {
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
          <h1 className="text-4xl font-bold mt-4">Refund Policy</h1>
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Last Updated: June 19, 2026</p>
        </div>

        {/* Content Box */}
        <div className={`p-8 md:p-12 rounded-2xl border backdrop-blur-xl ${darkMode ? "bg-black/45 border-white/10 shadow-2xl" : "bg-gray-50/50 border-gray-200 shadow-sm"
          }`}>

          <div className={`space-y-8 text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>

            <section>
              <p>
                Thank you for subscribing to WryClip Pro. This Refund Policy outlines the terms and conditions regarding payments, subscription cancellations, and refunds for products and services purchased on or through the WryClip platform.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>1. Subscription Billing Cycles</h2>
              <p className="mb-4">
                WryClip offers Pro Subscriptions (including Writer Pro at ₹199/month, Creator Pro at ₹499/month, and Studio Pro at ₹999/month) on a recurring monthly billing cycle.
              </p>
              <p className="mb-4">
                Your subscription fee is charged in full at the beginning of each billing cycle using the payment method verified during checkout.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>2. Non-Refundable Payments</h2>
              <p className="mb-4">
                All purchases and recurring subscription fees on WryClip are **non-refundable**.
              </p>
              <p className="mb-4">
                We do not offer cash refunds, credits, or prorated adjustments for partially used subscription periods, unused creator features, or account demotions due to early cancellation.
              </p>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>3. Subscription Cancellation</h2>
              <p className="mb-4">
                You can cancel your subscription renewal at any time. When you cancel:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You will continue to have full access to your Pro plan features (such as glowing auras, custom profile customizing, and detailed analytics charts) until the end of your current active billing period.</li>
                <li>At the expiration date of your current billing period, your account will be automatically demoted to the Free tier, and no further billing charges will be made.</li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/10">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>4. Billing Discrepancies and Exceptions</h2>
              <p className="mb-4">
                Refund exceptions are evaluated only on a case-by-case basis under the following verified conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Double Billing:</strong> If our system accidentally double-charges your payment method in a single billing period.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Technical Error:</strong> If a technical outage prevented you from accessing Pro features for a significant portion of your subscription cycle, and our support team is unable to resolve the issue within a reasonable timeframe.</li>
                <li><strong className={darkMode ? "text-white" : "text-gray-900"}>Legal Obligation:</strong> Under specific refund rules mandated by local consumer laws in your region.</li>
              </ul>
            </section>

            <section className="border-t pt-6 border-white/15">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>5. How to Submit a Refund Claim</h2>
              <p className="mb-4">
                If you believe you qualify for a refund exception based on a billing issue, please contact us within **7 business days** of the transaction date:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:billing.wryclip@gmail.com" className="text-purple-400 hover:underline">billing.wryclip@gmail.com</a></li>
                <li><strong>Required Info:</strong> Please provide your registered mobile number, email address, transaction reference/ID, and a screenshot or description of the billing discrepancy.</li>
              </ul>
              <p className="mt-4 text-xs italic">
                Our support team will review your request and get back to you within 3 to 5 business days. Approved refunds will be credited back to the original payment source.
              </p>
            </section>

            <section className="border-t pt-6 border-white/15">
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>6. Contact Information</h2>
              <p className="mb-4">
                For questions or support regarding subscriptions, cancellations, and billing, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:billing.wryclip@gmail.com" className="text-purple-400 hover:underline">billing.wryclip@gmail.com</a></li>
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
