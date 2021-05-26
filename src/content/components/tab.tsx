import * as React from 'react';
import { Provider } from 'react-redux';

import store, { useDispatch, useSelector } from '../store';

import { container, tab, underline } from './css';

interface TabProps {
  onClick?: () => void
}

const Tab:React.FC<TabProps> = ({onClick}) => {
  const [ hover, setHover ] = React.useState(false)
  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: 'SELECTED' })
    onClick?.()
  }

  const handleHover = (isHover:boolean) => {
    setHover(isHover)
  }

  return <Provider store={store}>
    <div
      onClick={handleClick}
      style={container}>
      <div 
        style={tab(hover)}
        className="notion-focusable"
        role="button" tabIndex={-1}
        onMouseOver={()=>handleHover(true)}
        onMouseOut={()=>handleHover(false)}>
        Plus
      </div>
      {selected && <div style={underline}/>}
    </div>
  </Provider>
}

export default Tab;