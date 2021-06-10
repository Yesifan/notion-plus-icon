import { render } from 'react-dom';
import { ThemeProvider } from '@emotion/react'

import Observer, { Provider } from './observer';

import Tab from './react/tab';
import Panel from './react/panel';

import { getCurrentPageId, getTheme } from './lib/utils';

import { light, dark } from '@/theme';

const { runtime } = chrome;

const pageId = getCurrentPageId();
const observer = new Observer(pageId);

runtime.onMessage.addListener(()=>{
  const pageId = getCurrentPageId();
  observer.dispatch("PAGE_CHANGE", pageId);
});

const App = () => {
  const { mode } = getTheme();
  const theme = mode === 'dark' ? dark : light;
  return (
    <Provider observer={observer}>
      <ThemeProvider theme={theme}>
        <Tab/>
        <Panel/>
      </ThemeProvider>
    </Provider>
  )
}

const container = document.createElement('div');
document.body.appendChild(container);

render(<App/>, container);