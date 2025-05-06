import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./../css/DailyProgress.css";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

export default function DailyProgress({ completedTasks, todos }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  let value =
    completedTasks && todos.length
      ? ((completedTasks / todos.length) * 100).toFixed(0)
      : 0;

  return (
    <div className="dailyProgressSection">
      <div className="dailyProgressInfoSection">
        <h2 className="dailyProgressTitle">Daily Progress</h2>
        <div className="secondRow">
          <div className="completedTasksSection">
            <p className="formula">
              {todos.length === 0 ? (
                <>{todos.length}</>
              ) : (
                <>
                  {completedTasks}/{todos.length}
                </>
              )}
            </p>
            <p className="formulaText">Tasks were done</p>
          </div>
        </div>
        <div className="date">
          <p>
            {currentDate} - {time}
          </p>
        </div>
      </div>
      <div className="progressbar" style={{ width: 75, height: 75 }}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: "var(--fontColor)",
            textColor: "var(--fontColor)",
            trailColor: "var(--background)",
            backgroundColor: "var(--fontColor)",
          })}
        />
      </div>
    </div>
  );
}