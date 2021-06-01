import { render } from 'react-dom';

import Observer, { Provider } from './observer';

import Tab from './react/tab';
import Panel from './react/panel';

import { getCurrentPageId } from './lib/utils';

const { runtime } = chrome;

const pageId = getCurrentPageId();
const observer = new Observer(pageId);

runtime.onMessage.addListener(()=>{
  const pageId = getCurrentPageId();
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