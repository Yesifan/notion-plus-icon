/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';

import { parseClassName } from '@/content/lib/utils';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const Button:React.FC<DivProps> = ({ children, className, ...props }) => (
  <div role="button" tabIndex={-1} className={parseClassName('notion-focusable', className)} {...props}>
    {children}
  </div>
);

interface ButtonProps{
  type?: 'primary' | 'radius' | 'default'
}
const primarySytle = `
  justify-content: center;
  padding: 0 12px;
  color:#fff;
  font-weight: 500;
  background: rgb(46, 170, 220);
  &:hover {
    background: rgb(6, 156, 205);
    &:active{
      background: rgb(0, 141, 190);
    }
  }
  &:active {
    background: rgb(6, 156, 205);
  }
`;
const radiusStyle = `
  height: auto;
  border-radius: 20px;
`;
export default styled(Button)<ButtonProps>(({ theme: { button }, type = 'default' }) => `
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;
  height: 28px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 1.2;
  min-width: 0px;
  transition: background 20ms ease-in 0s;
  &:hover {
    background: ${button.color};
    &:active{
      background: ${button.color2};
    }
  }
  &:active {
    background: ${button.color};
  }
  ${type === 'primary' ? primarySytle : type === 'radius' ? radiusStyle : null}
`);
