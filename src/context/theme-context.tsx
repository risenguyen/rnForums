import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";

const validThemes = new Set<Theme>(["dark", "light"]);

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  defaultTheme?: Theme;
  storageKey?: string;
  children: ReactNode;
};

function ThemeProvider({
  defaultTheme = "dark",
  storageKey = "theme",
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);

    if (storedTheme && validThemes.has(storedTheme as Theme)) {
      return storedTheme as Theme;
    }

    return defaultTheme;
  });

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, newTheme);
      return newTheme;
    });
  }, [storageKey]);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("disable-transitions");
    root.setAttribute("data-theme", theme);

    setTimeout(() => {
      root.classList.remove("disable-transitions");
    }, 100);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export { ThemeProvider, useTheme };
