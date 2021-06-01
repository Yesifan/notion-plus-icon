import { createContext } from "react";
import Observer from "../observer";

export const ObserverContext = createContext<Observer|null>(null);

const Provider:React.FC<{observer:Observer}> = ({children, observer}) => {
  return (
    <ObserverContext.Provider value={observer}>
      {children}
    </ObserverContext.Provider>
  );
}

export default Provider