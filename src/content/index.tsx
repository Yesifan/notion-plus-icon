import { render } from 'react-dom';

import Observer, { Provider } from './observer';

import Tab from './react/tab';

import { getUUID } from './lib/utils';
import { useEffect } from 'react';

const { runtime } = chrome;

const pageId = (getUUID(location.href) as string);
const observer = new Observer(pageId);

const changeId = () => {
  const pageId = (getUUID(location.href) as string);
  observer.dispatch("PAGE_CHANGE", pageId);
}

const App = () => {
  useEffect(()=>{
    runtime.onMessage.addListener(changeId);
    return () => runtime.onMessage.removeListener(changeId);
  }, [])
  return (
    <Provider observer={observer}>
      <Tab/>
    </Provider>
  )
}

render(<App/>, document.createElement('div'));