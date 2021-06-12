import { useEffect, useRef } from 'react';

import { Clear } from '@/icons';
import Button from '../button';

import { Container, Input } from './styled';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value:string) => void
}

const App:React.FC<InputProps> = ({
  value, onChange, style, ...props
}) => {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
  }, [input]);
  const handleClear = () => {
    onChange('');
    input.current?.focus();
  };
  return (
    <Container className="notion-focusable-within" style={style}>
      <Input ref={input} value={value} onChange={(e) => onChange(e.target.value)} {...props} />
      {value && (
      <Button type="radius" onClick={handleClear}>
        <Clear className="clearInput" />
      </Button>
      )}
    </Container>
  );
};

export default App;
