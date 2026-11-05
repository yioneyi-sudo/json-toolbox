
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

  // 初始化时读取之前保存的主题
  useEffect(() => {
    const savedTheme = localStorage.getItem("json-toolbox-theme");
    const shouldUseDark = savedTheme !== "light";

    setIsDark(shouldUseDark);
    document.body.classList.toggle("dark-mode", shouldUseDark);

    setIsInitialized(true);
  }, []);

  // 保存主题设置，并同步页面样式
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
