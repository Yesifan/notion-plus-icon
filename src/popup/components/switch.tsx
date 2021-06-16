import styled from '@emotion/styled';

interface SwitchProps {
  checked?:boolean
}

const Container = styled.div<SwitchProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 14px;
  border-radius: 44px;
  cursor: pointer;
  background: ${({ checked }) => (checked ? 'rgb(46, 170, 220)' : 'rgba(202, 204, 206, 0.3)')};
  transition: background 200ms ease 0s, box-shadow 200ms ease 0s;
`;

const Dot = styled.div<SwitchProps>`
  width: 10px;
  height: 10px;
  border-radius: 44px;
  background: white;
  transform: translateX(${({ checked }) => (checked ? `${11}px` : `${3}px`)}) translateY(0px);
  transition: transform 200ms ease-out 0s, background 200ms ease-out 0s;
`;

export default function Switch({ checked, ...props }:Parameters<typeof Container>[0]) {
  return (
    <Container checked={checked} {...props}>
      <Dot checked={checked} />
    </Container>
  );
}
