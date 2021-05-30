import { parseClassName } from '@/content/lib/utils'
import { useState } from 'react';

import * as styles from './css';
export * as styles from './block.css';

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColors?: string[]
}

const colors = ["rgb(46, 170, 220)", "rgb(6, 156, 205)", "rgb(0, 141, 190)"];

const App:React.FC<ButtonProps> = ({children, style, className, backgroundColors = colors, ...props}={}) => {
  const { onMouseOver, onMouseOut, onMouseUp, onMouseDown, ..._props } = props;
  const [ state, setState ] = useState<number>(0);

  const handleInOut = (inOut:-1|1, event?:React.MouseEvent, callback?:Function) => {
    setState(state => state + inOut);
    callback?.(event);
  }

  return (
    <div
      role="button" tabIndex={-1}
      style={{...styles.button, background:backgroundColors[state],...style}}
      className={parseClassName("notion-focusable", className)}
      onMouseOut={e => handleInOut(-1, e, onMouseOut)}
      onMouseOver={e => handleInOut(1, e, onMouseOver)}
      onMouseUp={e => handleInOut(-1, e, onMouseUp)}
      onMouseDown={e => handleInOut(1, e, onMouseDown)}
      {..._props}>
      {children}
    </div>
  )
}

export default App;