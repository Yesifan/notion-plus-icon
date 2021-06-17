import styled from '@emotion/styled';

const Loading:React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 1024 1024" {...props}>
    <path d="M864 323.2c-9.6 0-22.4-6.4-25.6-16C764.8 195.2 643.2 128 512 128c-19.2 0-32-12.8-32-32s12.8-32 32-32c153.6 0 297.6 76.8 377.6 208 9.6 16 6.4 35.2-9.6 44.8-3.2 3.2-9.6 6.4-16 6.4z" />
  </svg>
);

const App = styled(Loading)<{ size?:number }>(({ size = 14 }) => `
  fill:#fff;
  width: ${`${size}px`};
  height: ${`${size}px`};
`);

export default App;
