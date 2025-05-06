import { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { useTimerChange } from "../../contexts/TimeContext.jsx";
import lBreakIcon from "./../../assets/images/tea.svg";
import sBreakIcon from "./../../assets/images/coffee.svg";
import pomodoroIcon from "./../../assets/images/clock.svg";
import "./../../css/Controls.css";
import "./../../css/index.css";

export default function Controls() {
  const { setCurrentTimer, currentTimer } = useTimerChange();
  const [activeTimer, setActiveTimer] = useState({
    pomodoro: false,
    shortBreak: false,
    longBreak: false,
  });

  useEffect(() => {
    setActiveTimer((prev) => ({
      ...prev,
      pomodoro: currentTimer === "pomodoro",
      shortBreak: currentTimer === "shortBreak",
      longBreak: currentTimer === "longBreak",
    }));
  }, [currentTimer]);

  const handleClick = (timer) => {
    setCurrentTimer(timer);
  };

  return (
    <div className="controlsSection">
      <button
        className={`controlBtn ${activeTimer.pomodoro ? "active" : ""}`}
        onClick={() => handleClick("pomodoro")}
      >
        <SVG
          className={`pomodoroSvg ${activeTimer.pomodoro ? "activeSVG" : ""}`}
          src={pomodoroIcon}
          alt="pomodoro icon"
        />
        pomodoro
      </button>
      <button
        className={`controlBtn ${activeTimer.shortBreak ? "active" : ""}`}
        onClick={() => handleClick("shortBreak")}
      >
        <SVG
          className={`sBreakSvg ${activeTimer.shortBreak ? "activeSVG" : ""}`}
          src={sBreakIcon}
          alt="short break icon"
        />
        short break
      </button>
      <button
        className={`controlBtn ${activeTimer.longBreak ? "active" : ""}`}
        onClick={() => handleClick("longBreak")}
      >
        <SVG
          className={`lBreakSvg ${activeTimer.longBreak ? "activeSVG" : ""}`}
          src={lBreakIcon}
          alt="long break icon"
        />
        long break
      </button>
    </div>
  );
}