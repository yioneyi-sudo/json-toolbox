
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // 读取用户之前保存的主题
  useEffect(() => {
    const savedTheme = localStorage.getItem("json-toolbox-theme");

    if (savedTheme === "dark") {
      setIsDark(true);
    }

    setIsInitialized(true);
  }, []);

  // 同步主题并保存用户选择
  useEffect(() => {
    if (!isInitialized) return;

    document.body.classList.toggle("dark-mode", isDark);

    localStorage.setItem(
      "json-toolbox-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark, isInitialized]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
