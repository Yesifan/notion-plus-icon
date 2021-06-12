import { createContext } from 'react';
import Observer from '.';

export const ObserverContext = createContext<Observer | null>(null);

const Provider:React.FC<{ observer:Observer }> = ({ children, observer }) => (
  <ObserverContext.Provider value={observer}>
    {children}
  </ObserverContext.Provider>
);

export default Provider;
