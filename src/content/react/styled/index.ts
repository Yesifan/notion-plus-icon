import styled from '@emotion/styled';

export * as Tab from './tab';
export * as Panel from './panel';
export { default as Hover } from './hover';

export const Flex = styled.div`
  display: flex;
`

export const ColumnFlex = styled(Flex)`
  flex-direction: column;
`

export const Ellipsis = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`