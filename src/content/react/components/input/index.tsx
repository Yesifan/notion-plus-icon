import { useRef } from 'react';
import Button from '../button';
import ClearIcon from '@/content/react/icons/clear';

import * as styles from './css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value:string) => void
}

const colors = ['transparent', 'rgba(55, 53, 47, 0.08)', 'rgba(55, 53, 47, 0.16)'];

const App:React.FC<InputProps> = ({value, onChange, style, className, ...props}) => {
  const input = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    onChange('');
    input.current?.focus();
  }
  return (
    <div className="notion-focusable-within" style={{...styles.focusable, ...style}}>
      <input ref={input} value={value} onChange={e => onChange(e.target.value)} style={styles.input} {...props}/>
      {value&&<Button style={styles.clear} backgroundColors={colors} onClick={handleClear}>
        <ClearIcon className="clearInput" style={styles.svg}/>
      </Button>}
    </div>
  )
}

export default App;