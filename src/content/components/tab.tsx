import * as React from 'react';
import { Provider } from 'react-redux';

import store, { useDispatch, useSelector, tabPluse } from '../store';

import { container, tab, underline } from './css';

interface TabProps {
  onClick?: () => void
}

const Tab:React.FC<TabProps> = ({onClick}) => {
  const [ hover, setHover ] = React.useState(false)
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
      <div
        role="button"
        tabIndex={-1}
        style={tab(hover)}
        className="notion-focusable"
        onMouseOver={()=>handleHover(true)}
        onMouseOut={()=>handleHover(false)}>
        Plus
      </div>
      {selected === "plus" && <div style={underline}/>}
    </div>
  )
}

const App = () => <Provider store={store}><Tab/></Provider>

export default App;