import { useState, useEffect, useMemo } from "react";
import { useTodosChange } from "./contexts/TodoContext.jsx"; 
import DailyProgress from "./components/DailyProgress.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/header-components/Header.jsx";
import Loading from "./components/Loading.jsx";
import Timer from "./components/timer-components/Timer.jsx";
import ToDo from "./components/todolist-components/ToDo.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { todos } = useTodosChange();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3300);
    console.log.apply(console, [
      "%c Designed and Coded by Laura Głąb",
      "color: white" +
        "; background: padding:5px 0; border-radius: 5px; font-weight: bold; background-color: #ff7dde;",
    ]);

    return () => clearTimeout(timer);
  }, []);
  
  const completedTasks = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );
  
  if (loading) {
    return <Loading />;
  }

 
  return (
    <div className="app">
      <Header />
      <div className="main">
        <div className="mainSection">
          <div className="firstSection">
            <Timer />
            <DailyProgress completedTasks={completedTasks} todos={todos} />
          </div>
          <div className="secondSection">
            <ToDo />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

