/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';

export * as Tab from './tab';
export * as Panel from './panel';

export const Flex = styled.div<{ row?:boolean, column?:boolean }>(({ row, column }) => `
  display: flex;
  ${column ? 'flex-direction: column;' : row ? 'flex-direction: row;' : ''}
`);

export const ColumnFlex = styled(Flex)`
  flex-direction: column;
`;

export const Ellipsis = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
