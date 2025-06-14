import { useState, useEffect } from "react";
import { Line } from "rc-progress"; 
import SVG from "react-inlinesvg";
import { useTimerChange } from "../../contexts/TimeContext.jsx";
import Settings from "./Settings.jsx";
import TomatoLogo from "./../../assets/images/tomato.svg";
import "./../../css/header/Header.css";

export default function Header() {
  const { timeLeft, currentTimer, pomodoro, shortBreak, longBreak } =
    useTimerChange();

  const totalDuration =
    currentTimer === "pomodoro"
      ? pomodoro * 60
      : currentTimer === "shortBreak"
      ? shortBreak * 60
      : longBreak * 60;

  const progress = (timeLeft / totalDuration) * 100;

  const [debouncedProgress, setDebouncedProgress] = useState(progress);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedProgress(progress);
    }, 300);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div>
      <header>
        <div className="headerSection">
          <div className="logoSection">
            <SVG className="tomatoLogo" src={TomatoLogo} />
            <h1 className="logo">
              pomo<span style={{ fontStyle: "italic" }}>track</span>
            </h1>
          </div>
          <div className="headerBtnSection">
            <Settings />
          </div>
        </div>
      </header>
      <Line
        percent={debouncedProgress}
        strokeWidth={0.3}
        strokeColor="var(--fontColor)"
        trailWidth={3}
        trailColor="rgba(255,255,255,0.2)" 
        style={{
          position: "absolute",
          top: "55px",
          left: 0,
          width: "100%",
          zIndex: 9,
        }}
      />
    </div>
  );
}
