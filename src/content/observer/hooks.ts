import { useContext, useEffect, useState } from 'react';
import { ObserverContext } from './provider';

import Observer from './index'

export const useObserverContext = () => {
  const observer = <Observer>useContext(ObserverContext);
  return observer;
}

export interface ObserverSelectorHook {
  <TSelected>(
      selector: (state: Observer) => TSelected
  ): TSelected;
}

export const useSelector:ObserverSelectorHook = (selector) => {
  const observer = useObserverContext();
  const newState = selector(observer);
  let [state, setState] = useState<any>(newState);
  useEffect(()=>{
    return observer.subscribe((observer)=>{
      const newState = selector(observer);
      if(newState !== state) {
        state = newState;
        setState(newState);
      }
    })
  }, [observer])
  return state;
}

export const useDispatch = () => {
  const observer = useObserverContext();
  return (type:string, payload?:any) => observer.dispatch(type, payload)
}