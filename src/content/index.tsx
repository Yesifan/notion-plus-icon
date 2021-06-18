import { render } from 'react-dom';
import { ThemeProvider } from '@emotion/react';

import { light, dark } from '@/theme';
import Observer, { Provider } from './observer';

import Tab from './tab';
import Panel from './panel';
import Loading from './icon-loading';

import { getCurrentPageId, getTheme } from './lib/utils';

const { runtime } = chrome;

const pageId = getCurrentPageId();
const observer = new Observer(pageId);

runtime.onMessage.addListener(() => {
  const pageId = getCurrentPageId();
  observer.dispatch('PAGE_CHANGE', pageId);
});

const App = () => {
  const { mode } = getTheme();
  const theme = mode === 'dark' ? dark : light;
  return (
    <Provider observer={observer}>
      <ThemeProvider theme={theme}>
        <Tab />
        <Panel />
        <Loading />
      </ThemeProvider>
    </Provider>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

render(<App />, container);
