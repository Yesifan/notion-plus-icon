import { Provider } from 'react-redux';

import Tab, { TabProps } from './react/tab';

import store from '@/content/store';

const App = (props:TabProps) => {
  return (
    <Provider store={store}>
      <Tab {...props}/>
    </Provider>
  )
}

export default App;