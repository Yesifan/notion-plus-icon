import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from '@/content/observer'

import Hover from '../components/hover';
import Panel from '../panel';

import { container as contanerStyle, tab as tabStyle, underline } from './css';

const App:React.FC = () => {
  const dispatch = useDispatch();
  const [ tab, tabContainer, panelContainer ] = useSelector(state => [state.current, state.tab, state.panelContainer]);
  const handleClick = () => {
    dispatch('TAB_CHANGE', 'plus');
  }
  if(!tabContainer) return null;
  return createPortal(
    <div style={contanerStyle}>
      <Hover onClick={handleClick} style={tabStyle}>
        Plus
      </Hover>
      {tab === "plus" && <div style={underline}/>}
      {tab === "plus" && <Panel container={panelContainer}/>}
    </div>,
    tabContainer
  )
}

export default App;