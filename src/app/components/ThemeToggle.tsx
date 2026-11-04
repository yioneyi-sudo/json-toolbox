
"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
