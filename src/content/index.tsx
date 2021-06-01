import { render } from 'react-dom';

import Observer, { Provider } from './observer';

import Tab from './react/tab';
import Panel from './react/panel';

import { getUUID } from './lib/utils';

const { runtime } = chrome;

const pageId = getUUID(location.href);
const observer = new Observer(pageId);

runtime.onMessage.addListener(()=>{
  const pageId = getUUID(location.href);
  observer.dispatch("PAGE_CHANGE", pageId);
});

const App = () => {
  return (
    <Provider observer={observer}>
      <Tab/>
      <Panel/>
    </Provider>
  )
}

const container = document.createElement('div');
document.body.appendChild(container);

render(<App/>, container);