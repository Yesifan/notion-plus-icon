import styled from "@emotion/styled";

export const Title = styled.div(({theme})=>`
  display: flex;
  padding-left: 14px;
  padding-right: 14px;
  margin-top: 6px;
  margin-bottom: 8px;
  color: ${theme.subColor};
  font-size: 11px;
  font-weight: 500;
  line-height: 120%;
  user-select: none;
  text-transform: uppercase;
`)