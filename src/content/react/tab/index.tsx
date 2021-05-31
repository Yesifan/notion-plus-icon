import { useDispatch, useSelector, changeTab } from '@/content/store';

import Hover from '../components/hover';
import Panel, { PanelProps } from '../panel';

import { container, tab, underline } from './css';

export interface TabProps extends Omit<PanelProps,'container'> {
  panelContainer: Element
}

const App:React.FC<TabProps> = props => {
  const { panelContainer, ..._props } = props;

  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeTab('plus'));
  }

  return (
    <div style={container}>
      <Hover onClick={handleClick} style={tab}>
        Plus
      </Hover>
      {selected === "plus" && <div style={underline}/>}
      {selected === "plus" && <Panel container={panelContainer} {..._props}/>}
    </div>
  )
}

export default App;