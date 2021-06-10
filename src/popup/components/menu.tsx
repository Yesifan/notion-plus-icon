import styled from '@emotion/styled';

const Menu = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.menu.background};
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
`

const A = styled.a`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  font-size: 12px;
  color: ${({theme}) => theme.menu.color};
  border-radius: 4px;
  text-decoration: none;
  font-weight: 400;
  overflow: hidden;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background: ${({theme}) => theme.menu.hoverColor};
  }
`

const Img = styled.img`
  width: 18px;
  height: 18px;
  padding-right: 6px;
`

type AProps = Parameters<typeof A>[0]

interface ItemProps {
  icon?: string
}

export const Item:React.FC<ItemProps&AProps> = ({children, icon, ...props}) => {
  return <A {...props}>
    <Img src={icon}/>
    {children}
  </A>
}

export default Menu;