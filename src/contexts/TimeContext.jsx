import { createContext, useContext, useState, useEffect } from "react";

const TimeContext = createContext();

function TimeProvider({ children }) {
  const [pomodoro, setPomodoro] = useState(
    localStorage.getItem("pomodoro")
      ? JSON.parse(localStorage.getItem("pomodoro"))
      : 45
  );
  const [shortBreak, setShortBreak] = useState(
    localStorage.getItem("shortBreak")
      ? JSON.parse(localStorage.getItem("shortBreak"))
      : 5
  );
  const [longBreak, setLongBreak] = useState(
    localStorage.getItem("longBreak")
      ? JSON.parse(localStorage.getItem("longBreak"))
      : 15
  );
  const [longBreakInterval, setLongBreakInterval] = useState(
    localStorage.getItem("longBreakInterval")
      ? JSON.parse(localStorage.getItem("longBreakInterval"))
      : 4
  );
  const [currentTimer, setCurrentTimer] = useState(
    localStorage.getItem("currentTimer")
      ? JSON.parse(localStorage.getItem("currentTimer"))
      : "pomodoro"
  );

  // NEW: Time Left State (default to pomodoro time)
  const [timeLeft, setTimeLeft] = useState(pomodoro * 60);

  // Update timeLeft when timer type changes
  useEffect(() => {
    let duration;
    switch (currentTimer) {
      case "pomodoro":
        duration = pomodoro * 60;
        break;
      case "shortBreak":
        duration = shortBreak * 60;
        break;
      case "longBreak":
        duration = longBreak * 60;
        break;
      default:
        duration = 0;
    }
    setTimeLeft(duration);
  }, [currentTimer, pomodoro, shortBreak, longBreak]);

  useEffect(() => {
    localStorage.setItem("pomodoro", JSON.stringify(pomodoro));
    localStorage.setItem("shortBreak", JSON.stringify(shortBreak));
    localStorage.setItem("longBreak", JSON.stringify(longBreak));
    localStorage.setItem(
      "longBreakInterval",
      JSON.stringify(longBreakInterval)
    );
    localStorage.setItem("currentTimer", JSON.stringify(currentTimer));
  }, [pomodoro, shortBreak, longBreak, longBreakInterval, currentTimer]);

  const setTimer = (identifier, value) => {
    const numValue = parseInt(value, 10); // Ensure the value is a number
    if (identifier === "pomodoro") setPomodoro(numValue);
    if (identifier === "shortBreak") setShortBreak(numValue);
    if (identifier === "longBreak") setLongBreak(numValue);
    if (identifier === "longBreakInterval") setLongBreakInterval(numValue);
  };

  const incrementTimer = (identifier) => {
    if (identifier === "pomodoro") setPomodoro((prev) => prev + 1);
    if (identifier === "shortBreak") setShortBreak((prev) => prev + 1);
    if (identifier === "longBreak") setLongBreak((prev) => prev + 1);
    if (identifier === "longBreakInterval")
      setLongBreakInterval((prev) => prev + 1);
  };

  const decrementTimer = (identifier) => {
    if (identifier === "pomodoro") setPomodoro((prev) => Math.max(1, prev - 1));
    if (identifier === "shortBreak") setShortBreak((prev) => Math.max(1, prev - 1));
    if (identifier === "longBreak") setLongBreak((prev) => Math.max(1, prev - 1));
    if (identifier === "longBreakInterval")
      setLongBreakInterval((prev) => Math.max(1, prev - 1));
  };

  return (
    <TimeContext.Provider
      value={{
        pomodoro,
        shortBreak,
        longBreak,
        longBreakInterval,
        setTimer,
        incrementTimer,
        decrementTimer,
        currentTimer,
        setCurrentTimer,
        timeLeft, 
        setTimeLeft, 
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}

function useTimerChange() {
  const context = useContext(TimeContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export { TimeProvider, useTimerChange };
