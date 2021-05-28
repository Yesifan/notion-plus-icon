import { createPortal } from 'react-dom';

import Hover from '../hover';

import * as style from './css';

export interface PanelProps {
  pageId: string
  container:Element
}

const App:React.FC<PanelProps> = ({container}) => {
  return createPortal(
    <div style={style.columnFlex}>
      <div style={{flexGrow: 1}}>
        <div style={style.padding}>
          <div style={style.iconContainer}>
          <Hover className="notion-focusable" role="button" tabIndex={-1} style={style.icon} >
            <img alt="😀" aria-label="😀"
              className="notion-emoji"
              style={style.img('/images/twitter-emoji-spritesheet-64.png')}
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
            </Hover>
          </div>
        </div>
        <div></div>
      </div>
    </div>,
    container
  )
}

export default App;