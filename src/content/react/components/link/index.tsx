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
        onChange={value => setValue(value)}
        placeholder="Paste an image link…"/>
      <Button type="primary" onClick={() => value && onClick(value)}>
        +
      </Button>
    </div>
  )
}

export default App;