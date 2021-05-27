import * as React from 'react';
import { Provider } from 'react-redux';

import Tab, { TabProps } from './components/tab';

import store from '@/content/store';

const App = (props:TabProps) => (
  <Provider store={store}>
    <Tab {...props}/>
  </Provider>
  )

export default App;