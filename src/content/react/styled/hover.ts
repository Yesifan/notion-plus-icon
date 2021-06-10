import styled from "@emotion/styled";

interface HoverProps {
  button?: boolean
}

const Hover = styled.div<HoverProps>`
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
  color: rgb(55, 53, 47);
  transition: background 20ms ease-in 0s;
  &:hover {
    background: ${({button}) => button ? 'hotpink' : 'rgba(55, 53, 47, 0.08)'};
    &:active{
      background: ${({button}) => button ? 'hotpink' : 'rgba(55, 53, 47, 0.16)'};
    }
  }
  &:active {
    background: ${({button}) => button ? 'hotpink' : 'rgba(55, 53, 47, 0.08)'};
  }
`

export default Hover;