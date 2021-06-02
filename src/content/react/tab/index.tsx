import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from '@/content/observer'

import Hover from '../components/hover';

import { container as contanerStyle, tab as tabStyle, underline } from './css';

const App:React.FC = () => {
  const dispatch = useDispatch();
  const [tab, mode, tabContainer] = useSelector(state => [state.current, state.theme.mode, state.tab]);
  const handleClick = () => {
    dispatch('TAB_CHANGE', 'plus');
  }
  if(!tabContainer) return null;
  return createPortal(
    <div style={contanerStyle}>
      <Hover onClick={handleClick} style={tabStyle(mode)}>
        Plus
      </Hover>
      {tab === "plus" && <div style={underline(mode)}/>}
    </div>,
    tabContainer
  )
}

export default App;