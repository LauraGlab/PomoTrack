import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";
import { useLocalStorage } from "../../contexts/useLocalStorage.jsx";
import { useTimerChange } from "../../contexts/TimeContext.jsx";
import { useThemeChange } from "../../contexts/ThemeContext.jsx";
import Controls from "./Controls.jsx";
import endSound from "../../assets/sounds/success-221935.mp3";
import nextIcon from "../../assets/images/icon-next.svg";
import pauseIcon from "../../assets/images/icon-pause.svg";
import restartIcon from "../../assets/images/icon-restart.svg";
import startIcon from "../../assets/images/icon-play.svg";
import whiteNoiseAudio from "../../assets/sounds/white-noise.wav";
import brownNoiseAudio from "../../assets/sounds/brown-noise.wav";
import pinkNoiseAudio from "../../assets/sounds/pink-noise.wav";
import "../../css/Timer.css";

const TIMER_POMODORO = "pomodoro";
const TIMER_SHORT_BREAK = "shortBreak";
const TIMER_LONG_BREAK = "longBreak";

export default function Timer() {
  const [isActive, setIsActive] = useState(false);
  const [noiseType, setNoiseType] = useLocalStorage("noiseType", "none");
  const {
    currentTimer,
    setCurrentTimer,
    pomodoro,
    shortBreak,
    longBreak,
    longBreakInterval,
    timeLeft,
    setTimeLeft,
  } = useTimerChange();
  const { isDarkWhilePlaying, setIsDarkWhilePlaying } = useThemeChange();
  const audioPlayer = useRef(null);
  const noisePlayer = useRef(new Audio());
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    let duration;
    let title = "Pomodoro Timer";

    switch (currentTimer) {
      case TIMER_POMODORO:
        duration = pomodoro * 60;
        title = "Work Time! 🚀 | Pomotrack";
        break;
      case TIMER_SHORT_BREAK:
        duration = shortBreak * 60;
        title = "Break Time! ☕ | Pomotrack";
        break;
      case TIMER_LONG_BREAK:
        duration = longBreak * 60;
        title = "Break Time! 🍵 | Pomotrack";
        break;
      default:
        duration = 0;
    }

    setTimeLeft(duration);
    document.title = title; 
  }, [currentTimer, pomodoro, shortBreak, longBreak]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      playAudio();
      nextTimer();
    }
  }, [timeLeft, isActive]);

  useEffect(() => {
    if (currentTimer === TIMER_POMODORO && isActive) {
      playNoise();
    } else {
      stopNoise();
    }
  }, [isActive, currentTimer, noiseType]);

  useEffect(() => {
    if (isDarkWhilePlaying && currentTimer === TIMER_POMODORO && isActive) {
      document.body.classList.add("darkTheme");
    } else {
      document.body.classList.remove("darkTheme");
    }
  }, [isDarkWhilePlaying, currentTimer]);

  const playAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play().catch((error) => {
        console.log("Autoplay blocked, user must interact first", error);
      });
    }
  };

  const nextTimer = () => {
    if (currentTimer === TIMER_POMODORO) {
      setCompletedPomodoros((prev) => prev + 1);
      if ((completedPomodoros + 1) % longBreakInterval === 0) {
        setCurrentTimer(TIMER_LONG_BREAK);
      } else {
        setCurrentTimer(TIMER_SHORT_BREAK);
      }
    } else {
      setCurrentTimer(TIMER_POMODORO);
    }
  };

  const toggleNoise = () => {
    const newNoise =
      noiseType === "none"
        ? "white"
        : noiseType === "white"
        ? "brown"
        : noiseType === "brown"
        ? "pink"
        : "none";
    setNoiseType(newNoise);
  };

  const playNoise = () => {
    stopNoise();

    if (noiseType === "white") {
      noisePlayer.current.src = whiteNoiseAudio;
    } else if (noiseType === "brown") {
      noisePlayer.current.src = brownNoiseAudio;
    } else if (noiseType === "pink") {
      noisePlayer.current.src = pinkNoiseAudio;
    } else {
      return;
    }

    noisePlayer.current.loop = true;
    noisePlayer.current.play();
  };

  const stopNoise = () => {
    noisePlayer.current.pause();
    noisePlayer.current.currentTime = 0;
    noisePlayer.current.src = "";
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      secs < 10 ? "0" + secs : secs
    }`;
  };

  const resetTimer = () => {
    let resetTime;
    switch (currentTimer) {
      case "pomodoro":
        resetTime = pomodoro * 60;
        break;
      case "shortBreak":
        resetTime = shortBreak * 60;
        break;
      case "longBreak":
        resetTime = longBreak * 60;
        break;
      default:
        resetTime = 0;
    }
    setTimeLeft(resetTime);
  }

  return (
    <div
      className={`${
        isDarkWhilePlaying && currentTimer === TIMER_POMODORO && isActive
          ? "darkMode"
          : "timerSection "
      }`}
    >
      <Controls />
      <div className="timer">{formatTime(timeLeft)}</div>
      <audio ref={audioPlayer} src={endSound} />
      <div className="menuSection">
        <button className="timerBtn" onClick={resetTimer}>
          <SVG className="timerIcon" src={restartIcon} alt="Restart Timer" />
        </button>
        <button
          className="playPauseBtn"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <SVG
            className="playPauseImg"
            src={isActive ? pauseIcon : startIcon}
            alt={isActive ? "Pause Timer" : "Start Timer"}
          />
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="timerBtn" onClick={nextTimer}>
          <SVG className="timerIcon" src={nextIcon} alt="Next Timer" />
        </button>
        <button className="noiseToggleBtn" onClick={toggleNoise}>
          {noiseType === "none" ? "🔇" : noiseType === "white" ? "🎵" : noiseType === "brown" ? "🎶" : "🎧"}
        </button>
      </div>
    </div>
  );
}
