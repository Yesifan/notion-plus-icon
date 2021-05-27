import * as React from 'react';

import { useDispatch, useSelector, tabPluse } from '@/content/store';

import Panel from '../panel';

import { container, tab, underline } from './css';

export interface TabProps {
  onClick?: () => void,
  panelContainer:Element
}

const App:React.FC<TabProps> = props => {
  const {onClick, panelContainer} = props;
  const [ hover, setHover ] = React.useState(false);
  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(tabPluse());
    onClick?.()
  }

  const handleHover = (isHover:boolean) => {
    setHover(isHover)
  }

  return (
    <div onClick={handleClick} style={container}>
      <div role="button"  tabIndex={-1}
        style={tab(hover)}
        className="notion-focusable"
        onMouseOver={()=>handleHover(true)}
        onMouseOut={()=>handleHover(false)}>
        Plus
      </div>
      {selected === "plus" && <div style={underline}/>}
      {selected === "plus" && <Panel container={panelContainer}/>}
    </div>
  )
}

export default App;