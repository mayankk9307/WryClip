"use client";
import { useState, useEffect } from "react";

export function usePersistedTheme() {
  const [darkMode, setDarkMode] = useState(true);

  // Load theme from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "dark");
    } else {
      // Default to dark mode if not set
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  return [darkMode, toggleDarkMode] as const;
}
