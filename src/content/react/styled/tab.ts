import styled from '@emotion/styled';

export const Container = styled.div(({theme})=>`
  padding-top: 6px;
  white-space: nowrap;
  min-width: 0px;
  flex-shrink: 0;
  color: ${theme.color};
  position: relative;
`)

export const Underline = styled.div(({theme})=>`
  border-bottom: ${`2px solid ${theme.color}`};
  position: absolute;
  bottom: -7px;
  left: 8px;
  right: 8px;
`)

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`