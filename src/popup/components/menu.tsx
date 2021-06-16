import styled from '@emotion/styled';
import Switch from './switch';

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

interface ItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: string
}

interface SwitchItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checkd?: boolean
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

const Item = styled.div<{ hover?:boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.menu.color};
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${({ theme, hover }) => (hover ? `
    &:hover {
      background: ${theme.menu.hoverColor};
    } 
  ` : '')}
`;

export const SwitchItem:React.FC<SwitchItemProps> = ({ checkd, children, ...props }) => (
  <Item {...props}>
    {children}
    <Switch checked={checkd} style={{ marginLeft: 'auto' }} />
  </Item>
);

const Link = Item.withComponent('a');

const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 6px;
`;

export const LinkItem:React.FC<ItemProps> = ({
  children, icon, href, ...props
}) => (
  <Link hover href={href} {...props}>
    {icon && <Icon src={icon} />}
    {children}
  </Link>
);

const Menu = styled.div`
  width: 160px;
  display: flex;
  padding: 6px 8px;
  flex-direction: column;
  background: ${({ theme }) => theme.menu.background};
`;

export default Menu;
