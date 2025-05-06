import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage.jsx";

const TodosContext = createContext(); 

const TodosProvider = ({ children }) => {

  const [todos, setTodos] = useLocalStorage("todos", []);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};


function useTodosChange() {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export { TodosProvider, useTodosChange };
