import styled from '@emotion/styled';

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

const Title = styled.div`
  color:${({ theme }) => theme.subColor};
  margin-bottom: 2px;
`;

const GroupApp:React.FC<GroupProps> = ({ children, title, ...props }) => (
  <div {...props}>
    <Title>
      {title}
    </Title>
    { children }
  </div>
);

export const Group = styled(GroupApp)`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

const Img = styled.img`
  width: 18px;
  height: 18px;
  padding-right: 6px;
`;

interface ItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: string
}

const ItemElement:React.FC<ItemProps> = ({ children, icon, ...props }) => (
  <a {...props}>
    <Img src={icon} />
    {children}
  </a>
);

export const Item = styled(ItemElement)`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.menu.color};
  border-radius: 4px;
  text-decoration: none;
  font-weight: 400;
  overflow: hidden;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background: ${({ theme }) => theme.menu.hoverColor};
  }
`;

const Menu = styled.div`
  width: 160px;
  display: flex;
  padding: 6px 8px;
  flex-direction: column;
  background: ${({ theme }) => theme.menu.background};
`;

export default Menu;
