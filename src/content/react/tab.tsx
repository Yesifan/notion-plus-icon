import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from '@/content/observer'

import Button from '@/content/react/components/button'
import { Tab } from '@/content/react/styled'

const icon = chrome.runtime.getURL('/icon@48.png');

const App:React.FC = () => {
  const dispatch = useDispatch();
  const [tab, tabContainer] = useSelector(state => [state.current, state.tab]);

  const handleClick = () => {
    dispatch('TAB_CHANGE', 'plus');
  }
  if(!tabContainer) return null;
  return createPortal(
    <Tab.Container>
      <Button onClick={handleClick} style={{padding:'0 6px'}}>
        <Tab.Icon src={icon}/> Plus
      </Button>
      {tab === "plus" && <Tab.Underline/>}
    </Tab.Container>,
    tabContainer
  )
}

export default App;