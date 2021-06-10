import styled from "@emotion/styled";

interface HoverProps {
  button?: 'button'|'default'
}

const Hover = styled.div<HoverProps>(({theme:{hover}, button="default"})=>`
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
  padding-left: 8px;
  padding-right: 8px;
  transition: background 20ms ease-in 0s;
  &:hover {
    background: ${hover.color[button]};
    &:active{
      background: ${hover.color2[button]};
    }
  }
  &:active {
    background: ${hover.color[button]};
  }
`)

export default Hover;