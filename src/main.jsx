import React from "react";
import ReactDOM from "react-dom/client";
import { PriorityProvider } from "./contexts/PriorityContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { TimeProvider } from "./contexts/TimeContext.jsx";
import { TodosProvider } from "./contexts/TodoContext.jsx";
import App from "./App.jsx";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TimeProvider>
      <ThemeProvider>
        <PriorityProvider>
            <TodosProvider>
                <App />
            </TodosProvider>
        </PriorityProvider>
      </ThemeProvider>
    </TimeProvider>
  </React.StrictMode>
);
