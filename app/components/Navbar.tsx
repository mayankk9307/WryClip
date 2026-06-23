"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function Navbar({ darkMode = true, toggleDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navbarHeight = 64;
  const extraOffset = 20;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleScroll();
    handleResize();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  const handleNavClick = (id: string, path: string) => {
    setMenuOpen(false);
    
    const hasWriterParam = typeof window !== "undefined" && window.location.search.includes("writer=");
    const isHomepageWithoutQuery = pathname === "/" && !hasWriterParam;

    if (isHomepageWithoutQuery) {
      // If we are on the homepage, scroll directly to the section
      const el = document.getElementById(id);
      if (el) {
        const elementPosition = el.offsetTop - navbarHeight - extraOffset;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    } else {
      // Otherwise, navigate to homepage with hash
      if (typeof window !== "undefined") {
        window.location.href = `/${path}`;
      } else {
        router.push(`/${path}`);
      }
    }
  };

  const navLinks = [
    { type: "scroll", id: "hero", path: "#hero", label: "Home" },
    { type: "scroll", id: "sections", path: "#sections", label: "Explore" },
    { type: "page", path: "/about", label: "About Us" },
    { type: "page", path: "/contact", label: "Contact" },
    { type: "scroll", id: "faq", path: "#faq", label: "FAQs" },
  ];

  const isFloating = scrolled && isMobile;

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          top: isFloating ? 16 : 0,
          width: isFloating ? "92%" : "100%",
          maxWidth: isFloating ? 1200 : "100%",
          borderRadius: isFloating ? 100 : 0,
          paddingLeft: isFloating ? 32 : 24,
          paddingRight: isFloating ? 32 : 24,
          paddingTop: isFloating ? 10 : 16,
          paddingBottom: isFloating ? 10 : 16,
          scale: isFloating ? 0.98 : 1,
          x: isFloating ? "-50%" : "0%",
          left: isFloating ? "50%" : "0%",
          backgroundColor: darkMode 
            ? (scrolled ? "rgba(5, 7, 12, 0.85)" : "rgba(0, 0, 0, 0.2)") 
            : (scrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.8)"),
          borderColor: darkMode 
            ? (scrolled ? "rgba(139, 92, 246, 0.2)" : "rgba(255, 255, 255, 0.05)") 
            : "rgba(0, 0, 0, 0.1)",
          boxShadow: isFloating 
            ? "0 30px 60px rgba(0,0,0,0.5)" 
            : scrolled 
              ? "0 4px 20px rgba(0,0,0,0.15)" 
              : "0 1px 2px rgba(0,0,0,0.05)",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.6
        }}
        className={`fixed z-50 flex justify-between items-center backdrop-blur-xl border-b`}
      >
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            WryClip
          </span>
        </a>

        {/* Desktop Links */}
        <div className={`hidden md:flex gap-6 items-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {navLinks.map((link, i) => (
            link.type === "scroll" ? (
              <span
                key={i}
                onClick={() => handleNavClick(link.id!, link.path)}
                className={`cursor-pointer hover:underline transition ${darkMode ? "hover:text-white" : "hover:text-black"} ${pathname === "/" ? "font-normal" : "opacity-80"}`}
              >
                {link.label}
              </span>
            ) : (
              <Link
                key={i}
                href={link.path}
                className={`transition hover:underline ${darkMode ? "hover:text-white" : "hover:text-black"} ${pathname === link.path ? (darkMode ? "text-purple-400 font-semibold" : "text-purple-600 font-semibold") : ""}`}
              >
                {link.label}
              </Link>
            )
          ))}

          {/* Premium Theme Toggle - Desktop */}
          {toggleDarkMode && (
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className={`ml-4 relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none group
                ${darkMode
                  ? "bg-white/5 border border-purple-500/40 shadow-[0_0_14px_rgba(168,85,247,0.35)] hover:shadow-[0_0_22px_rgba(168,85,247,0.6)] hover:border-purple-400"
                  : "bg-amber-50 border border-amber-400/60 shadow-[0_0_14px_rgba(251,191,36,0.4)] hover:shadow-[0_0_22px_rgba(251,191,36,0.7)] hover:border-amber-300"
                }`}
            >
              <motion.div
                key={darkMode ? "moon" : "sun"}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {!darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </motion.div>
            </button>
          )}
        </div>

        <div className="hidden md:flex gap-4">
          <Link
            href="/download"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 active:scale-95 transition font-medium text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] text-sm"
          >
            Download App
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center gap-4">
          {/* Premium Theme Toggle - Mobile */}
          {toggleDarkMode && (
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none
                ${darkMode
                  ? "bg-white/5 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                  : "bg-amber-50 border border-amber-400/60 shadow-[0_0_12px_rgba(251,191,36,0.4)] hover:shadow-[0_0_20px_rgba(251,191,36,0.7)]"
                }`}
            >
              <motion.div
                key={darkMode ? "moon-m" : "sun-m"}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {!darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </motion.div>
            </button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`focus:outline-none ${darkMode ? "text-white" : "text-black"}`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              top: scrolled ? 80 : 70,
              width: scrolled ? "92%" : "100%",
              left: scrolled ? "4%" : "0%",
              borderRadius: scrolled ? 24 : "0 0 24px 24px",
            }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed backdrop-blur-2xl border z-40 flex flex-col items-center py-8 px-6 gap-4 md:hidden 
              ${darkMode 
                ? "bg-black/90 border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                : "bg-white/95 border-black/10 text-black shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              }`}
          >
            <div className="w-full flex flex-col gap-3">
              {navLinks.map((link, i) => (
                link.type === "scroll" ? (
                  <span
                    key={i}
                    onClick={() => handleNavClick(link.id!, link.path)}
                    className={`cursor-pointer text-lg font-medium tracking-wide py-3 rounded-xl transition text-center w-full shadow-sm ${darkMode ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-300" : "bg-black/5 border border-black/10 hover:bg-black/10 hover:border-purple-500/50 hover:text-purple-600"}`}
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    key={i}
                    href={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-lg font-medium tracking-wide py-3 rounded-xl transition text-center w-full shadow-sm border ${darkMode ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-300" : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-purple-500/50 hover:text-purple-600"} ${pathname === link.path ? "border-purple-500 text-purple-400" : ""}`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
            <Link
              href="/download"
              onClick={() => setMenuOpen(false)}
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] active:scale-95 transition-all font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white text-center"
            >
              Download App
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}