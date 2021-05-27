import * as React from 'react';

import { useDispatch, useSelector, tabPluse } from '@/content/store';

import Hover from '../hover';
import Panel from '../panel';

import { container, tab, underline } from './css';

export interface TabProps {
  panelContainer:Element
}

const App:React.FC<TabProps> = props => {
  const {panelContainer} = props;
  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(tabPluse());
  }

  return (
    <div style={container}>
      <Hover className="notion-focusable" role="button" onClick={handleClick} tabIndex={-1} style={tab}>
        Plus
      </Hover>
      {selected === "plus" && <div style={underline}/>}
      {selected === "plus" && <Panel container={panelContainer}/>}
    </div>
  )
}

export default App;