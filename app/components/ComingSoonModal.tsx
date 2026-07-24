"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-md bg-[#0a0d18] border border-purple-500/30 rounded-3xl p-8 text-center text-white shadow-[0_0_50px_rgba(168,85,247,0.25)]"
          >
            
            {/* Pulsing Launching Icon */}
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative">
              <Rocket className="w-8 h-8 text-purple-400" />
              <div className="absolute inset-0 w-full h-full rounded-2xl border border-purple-400 animate-ping opacity-25"></div>
            </div>

            {/* Content text */}
            <h3 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Launching Soon!
            </h3>
            <p className="text-purple-300 font-medium text-xs tracking-wider uppercase mb-4">
              WryClip App is on the Way
            </p>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We are currently putting the finishing touches on WryClip for Google Play Store and iOS App Store. 
              <br />
              <span className="block mt-2 font-semibold text-purple-400/80">Stay tuned for the official releases!</span>
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] active:scale-95 transition font-semibold rounded-xl text-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white"
              >
                Awesome, Got It!
              </button>
              
              <p className="text-[10px] text-gray-500">
                Subscribe to casting alerts in the footer below to get notified instantly on launch!
              </p>
            </div>

            {/* Close Cross icon */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
