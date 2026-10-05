import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function readSavedTheme() {
  try {
    const theme = window.localStorage.getItem("theme");
    return theme === "light" || theme === "dark" ? theme : null;
  } catch {
    return null;
  }
}

function readSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [savedTheme, setSavedTheme] = useState(readSavedTheme);
  const [systemTheme, setSystemTheme] = useState(readSystemTheme);
  const theme = savedTheme ?? systemTheme;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event) => setSystemTheme(event.matches ? "dark" : "light");
    preference.addEventListener("change", updateSystemTheme);
    return () => preference.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "light" ? "#f5f5f2" : "#111110",
    );

    if (savedTheme) {
      try {
        window.localStorage.setItem("theme", savedTheme);
      } catch {
        // The selected theme still applies for this page view if storage is blocked.
      }
    }
  }, [savedTheme, theme]);

  const toggleTheme = () => setSavedTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
