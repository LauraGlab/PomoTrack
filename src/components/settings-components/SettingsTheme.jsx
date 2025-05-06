import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Toggle from "react-toggle";
import { useThemeChange } from "../../contexts/ThemeContext.jsx";
import "react-toggle/style.css";
import "./../../css/header/Toggle.css";

export default function SettingsTheme({ onClose }) {
  const [menuState, setMenuState] = useState({
    longBreak: false,
    pomodoro: false,
    shortBreak: false,
  });
  const {
    changePomodoroTheme,
    changeShortBreakTheme,
    changeLongBreakTheme,
    setIsDarkWhilePlaying,
    isDarkWhilePlaying,
    themes,
  } = useThemeChange();
  const [selectedPomodoroTheme, setSelectedPomodoroTheme] = useState("red");
  const [selectedShortBreakTheme, setSelectedShortBreakTheme] = useState("blue");
  const [selectedLongBreakTheme, setSelectedLongBreakTheme] = useState("white");
  const themeNames = ["red", "black", "pink", "blue", "beige", "white"];
  const toggleMenu = (menu) => {
    setMenuState((prev) => ({
      longBreak: false,
      pomodoro: false,
      shortBreak: false,
      [menu]: !prev[menu],
    }));
  };
  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".windowTheme")) {
        toggleMenu()
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [toggleMenu]);

  const handleThemeChange = (mode, theme) => {
    if (mode === "pomodoro") {
      setSelectedPomodoroTheme(theme);
      changePomodoroTheme(theme);
    } else if (mode === "shortBreak") {
      setSelectedShortBreakTheme(theme);
      changeShortBreakTheme(theme);
    } else if (mode === "longBreak") {
      setSelectedLongBreakTheme(theme);
      changeLongBreakTheme(theme);
    }
  };

  return (
    <section className="settingThemeSection">
      <div>
        <h2 className="title">THEME</h2>
      </div>
      <div className="modeSection">
        <h3 className="subtitle">Dark Mode when running</h3>
        <Toggle
          checked={isDarkWhilePlaying}
          onChange={({ target }) => setIsDarkWhilePlaying(target.checked)}
          icons={{ checked: "", unchecked: "" }}
          aria-label="Dark mode toggle, when playing"
        />
      </div>
      <div className="themeSection">
        <h3 className="subtitle">Pick a Theme:</h3>
        <div className="themeBtns">
          <button
            className="themeBtn"
            id="pomodoro"
            style={{
              backgroundColor: themes[selectedPomodoroTheme].background,
            }}
            onClick={() => toggleMenu("pomodoro")}
          ></button>
          {menuState.pomodoro && (
            <div className="backgroundBlur">
              <AnimatePresence>
                <motion.div
                  key="modal"
                  className="window windowTheme"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="themeOptionBtnTitle">Change Pomodoro Theme</h3>
                  <hr />
                  <div className="themeOptionBtn__section">
                    {themeNames.map((theme) => (
                      <button
                        className="themeOptionBtn"
                        key={theme}
                        style={{
                          backgroundColor: themes[theme].background,
                          color: themes[theme].fontColor,
                          border:
                            selectedPomodoroTheme === theme
                              ? `3px solid ${themes[theme].fontColor}`
                              : "3px solid transparent",
                        }}
                        onClick={() => handleThemeChange("pomodoro", theme)}
                      ></button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          <button
            className="themeBtn"
            id="shortBreak"
            style={{
              backgroundColor: themes[selectedShortBreakTheme].background,
            }}
            onClick={() => toggleMenu("shortBreak")}
          ></button>
          {menuState.shortBreak && (
            <div className="backgroundBlur">
              <AnimatePresence>
                <motion.div
                  key="modal"
                  className="window windowTheme"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="themeOptionBtnTitle">
                    Change Short Break Theme
                  </h3>
                  <hr />
                  <div className="themeOptionBtn__section">
                    {themeNames.map((theme) => (
                      <button
                        className="themeOptionBtn"
                        key={theme}
                        style={{
                          backgroundColor: themes[theme].background,
                          color: themes[theme].fontColor,
                          border:
                            selectedShortBreakTheme === theme
                              ? `3px solid ${themes[theme].fontColor}`
                              : "3px solid transparent",
                        }}
                        onClick={() => handleThemeChange("shortBreak", theme)}
                      ></button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          <button
            className="themeBtn"
            id="longBreak"
            style={{
              backgroundColor: themes[selectedLongBreakTheme].background,
            }}
            onClick={() => toggleMenu("longBreak")}
          ></button>
          {menuState.longBreak && (
            <div className="backgroundBlur">
              <AnimatePresence>
                <motion.div
                  key="modal"
                  className="window windowTheme"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="themeOptionBtnTitle">
                    Change Long Break Theme
                  </h3>
                  <hr />
                  <div className="themeOptionBtn__section">
                    {themeNames.map((theme) => (
                      <button
                        className="themeOptionBtn"
                        key={theme}
                        style={{
                          backgroundColor: themes[theme].background,
                          color: themes[theme].fontColor,
                          border:
                            selectedLongBreakTheme === theme
                              ? `3px solid ${themes[theme].fontColor}`
                              : "3px solid transparent",
                        }}
                        onClick={() => handleThemeChange("longBreak", theme)}
                      ></button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
