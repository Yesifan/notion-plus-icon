import { CSSProperties } from 'react';

export const focusable:CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  fontSize: "14px",
  lineHeight: "20px",
  padding: "3px 6px",
  position: "relative",
  borderRadius: "3px",
  boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  background: "rgba(242, 241, 238, 0.6)",
  cursor: "text",
  height: "28px"
}

export const input:CSSProperties = {
  fontSize: "inherit",
  lineHeight: "inherit",
  border: "none",
  background: "none",
  width: "100%",
  display: "block",
  resize: "none",
  padding: "0px"
}