import { useState } from 'react';

import { Flex } from '@/content/styled';
import styled from '@emotion/styled';
import Input from './input';
import Button from './button';

export interface LinkProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>{
  onClick:(value:string)=>void
}

const FlexCenter = styled(Flex)`
  flex: 1;
  align-items: 'center';
`;

const App:React.FC<LinkProps> = ({ onClick, ...props }) => {
  const [value, setValue] = useState<string>('');

  return (
    <FlexCenter {...props}>
      <Input
        type="url"
        value={value}
        style={{ margin: '0 2px 0 8px' }}
        onChange={setValue}
        placeholder="Paste an image link…"
      />
      <Button type="primary" onClick={() => value && onClick(value)}>
        +
      </Button>
    </FlexCenter>
  );
};

export default App;
