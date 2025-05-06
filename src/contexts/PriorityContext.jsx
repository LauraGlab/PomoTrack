import { useState, createContext, useContext } from "react";

const PriorityContext = createContext();

const PriorityProvider = ({children}) => {
    const [priority, setPriority] = useState("");

    return(
        <PriorityContext.Provider value={{priority, setPriority}}>
            {children}
        </PriorityContext.Provider>
    )
}

function usePriorityChange() {
  const context = useContext(PriorityContext);
  if (context === undefined)
    throw new Error("Context was used outside of Provider");
  return context;
}

export {PriorityProvider, usePriorityChange}