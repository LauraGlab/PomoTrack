import SVG from "react-inlinesvg";
import { useTimerChange } from "../../contexts/TimeContext.jsx";
import ArrowUp from "./../../assets/images/icon-arrow-up.svg";
import ArrowDown from "./../../assets/images/icon-arrow-down.svg";

export default function SettingsTimer() {
  const {
    pomodoro,
    shortBreak,
    longBreak,
    longBreakInterval,
    setTimer,
    incrementTimer,
    decrementTimer,
  } = useTimerChange();

  const timerSettings = [
    { label: "Pomodoro", value: pomodoro, type: "pomodoro" },
    { label: "Short Break", value: shortBreak, type: "shortBreak" },
    { label: "Long Break", value: longBreak, type: "longBreak" },
  ];

  return (
    <section className="timerSettings">
      <h2 className="title">TIMER</h2>

      <h3 className="subtitle">Time (minutes)</h3>
      <div className="timerOptions">
        {timerSettings.map(({ label, value, type }) => (
          <TimerSetting key={type} label={label} value={value} type={type} />
        ))}
      </div>

      <LongBreakInterval
        value={longBreakInterval}
        setTimer={setTimer}
        incrementTimer={incrementTimer}
        decrementTimer={decrementTimer}
      />
    </section>
  );
}

function TimerSetting({ label, value, type }) {
  const { setTimer, incrementTimer, decrementTimer } = useTimerChange();

  return (
    <div className="timerSetting">
      <p className="timerLabel">{label}</p>
      <div className="timerControls">
        <input
          className="timerInput"
          type="number"
          value={value}
          min="1"
          onChange={(event) => setTimer(type, event.target.value)}
        />
        <div className="timerButtons">
          <SVG
            src={ArrowUp}
            onClick={() => incrementTimer(type)}
            className="arrowIcon"
          />
          <SVG
            src={ArrowDown}
            onClick={() => decrementTimer(type)}
            className="arrowIcon"
          />
        </div>
      </div>
    </div>
  );
}

function LongBreakInterval({
  value,
  setTimer,
  incrementTimer,
  decrementTimer,
}) {
  return (
    <div className="longBreakInterval">
      <h3 className="subtitle">Long Break Interval</h3>
      <div className="intervalControls">
        <input
          className="intervalInput"
          type="number"
          value={value}
          onChange={(event) =>
            setTimer("longBreakInterval", event.target.value)
          }
        />
        <div className="intervalButtons">
          <SVG
            src={ArrowUp}
            onClick={() => incrementTimer("longBreakInterval")}
            className="arrowIcon"
          />
          <SVG
            src={ArrowDown}
            onClick={() => decrementTimer("longBreakInterval")}
            className="arrowIcon"
          />
        </div>
      </div>
    </div>
  );
}
