import * as React from 'react';
import { createPortal } from 'react-dom';

import { useDispatch, useSelector, tabPluse } from '@/content/store';

import * as style from './css';

interface TabProps {
  container:Element
}

const App:React.FC<TabProps> = ({container}) => {
  return createPortal(
    <div style={style.columnFlex}>
      <div style={{flexGrow: 1}}>
        <div style={style.padding}>
          <div style={style.iconContainer}>
          <div role="button" tabIndex={-1} style={style.icon} className="notion-focusable" >
            <img alt="😀" aria-label="😀"
              className="notion-emoji"
              style={style.img('/images/twitter-emoji-spritesheet-64.png')}
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>,
    container
  )
}

export default App;