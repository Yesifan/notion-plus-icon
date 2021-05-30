import Input from '../input';
import Button from '../button';

import * as styles from './css';
import { useState } from 'react';

export interface LinkProps extends Omit<React.HTMLAttributes<HTMLDivElement>,'onClick'>{
  onClick:(value:string)=>void
}

const App:React.FC<LinkProps> = ({style, onClick, ...props}) => {
  const [value, setValue] = useState<string>('');
  return (
    <div style={{...styles.wrap, ...style}} {...props}>
      <Input
        type="url"
        value={value}
        style={styles.link}
        onChange={e => setValue(e.target.value)}
        placeholder="Paste an image link…"/>
      <Button style={styles.button} onClick={() => value && onClick(value)}>
        +
      </Button>
    </div>
  )
}

export default App;