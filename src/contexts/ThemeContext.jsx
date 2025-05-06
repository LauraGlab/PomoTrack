import { useState, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.jsx";
import { useTimerChange } from "./TimeContext";

const ThemeContext = createContext();

const themes = {
  red: { background: "var(--red)", fontColor: "var(--font-red)" },
  black: { background: "var(--black)", fontColor: "var(--font-black)" },
  pink: { background: "var(--pink)", fontColor: "var(--font-pink)" },
  blue: { background: "var(--blue)", fontColor: "var(--font-blue)" },
  beige: { background: "var(--beige)", fontColor: "var(--font-beige)" },
  white: { background: "var(--white)", fontColor: "var(--font-white)" },
};

const initialState = {
  pomodoroTheme: themes.red,
  shortBreakTheme: themes.blue,
  longBreakTheme: themes.green,
  isDarkWhilePlaying: false,
};

function ThemeProvider({ children }) {
  const [pomodoroTheme, setPomodoroTheme] = useState(
    localStorage.getItem("pomodoroTheme")
      ? JSON.parse(localStorage.getItem("pomodoroTheme"))
      : themes.red
  );
  const [shortBreakTheme, setShortBreakTheme] = useState(
    localStorage.getItem("shortBreakTheme")
      ? JSON.parse(localStorage.getItem("shortBreakTheme"))
      : themes.blue
  );
  const [longBreakTheme, setLongBreakTheme] = useState(
    localStorage.getItem("longBreakTheme")
      ? JSON.parse(localStorage.getItem("longBreakTheme"))
      : themes.green
  );

  const [isDarkWhilePlaying, setIsDarkWhilePlaying] = useLocalStorage(
    "isDarkWhilePlaying",
    false
  );

  const { currentTimer } = useTimerChange();

  useEffect(() => {
    let currentTheme;
    if (currentTimer === "pomodoro") {
      currentTheme = pomodoroTheme;
    } else if (currentTimer === "shortBreak") {
      currentTheme = shortBreakTheme;
    } else if (currentTimer === "longBreak") {
      currentTheme = longBreakTheme;
    } else {
      currentTheme = pomodoroTheme;
    }

    if (currentTheme) {
      document.documentElement.style.setProperty(
        "--background",
        currentTheme.background
      );
      document.documentElement.style.setProperty(
        "--fontColor",
        currentTheme.fontColor
      );
    }
  }, [currentTimer, pomodoroTheme, shortBreakTheme, longBreakTheme]);

  const changePomodoroTheme = (themeName) => {
    setPomodoroTheme(themes[themeName]);
    localStorage.setItem("pomodoroTheme", JSON.stringify(themes[themeName]));
  };

  const changeShortBreakTheme = (themeName) => {
    setShortBreakTheme(themes[themeName]);
    localStorage.setItem("shortBreakTheme", JSON.stringify(themes[themeName]));
  };

  const changeLongBreakTheme = (themeName) => {
    setLongBreakTheme(themes[themeName]);
    localStorage.setItem("longBreakTheme", JSON.stringify(themes[themeName]));
  };

  return (
    <ThemeContext.Provider
      value={{
        changePomodoroTheme,
        changeShortBreakTheme,
        changeLongBreakTheme,
        themes,
        isDarkWhilePlaying,
        setIsDarkWhilePlaying,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeChange() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeChange must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useThemeChange };
