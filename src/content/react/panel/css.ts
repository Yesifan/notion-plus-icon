import { CSSProperties } from 'react';

export const main:CSSProperties = {
  flexGrow: 1,
  minHeight: 0,
  transform: 'translateZ(0px)',
  zIndex: 1,
  overflow: 'hidden auto',
  marginRight: 0,
  marginBottom: 0
}

export const columnFlex:CSSProperties = {
  display: 'flex',
  flexDirection: 'column'
}

export const title:CSSProperties = {
  display: "flex",
  paddingLeft: "14px",
  paddingRight: "14px",
  marginTop: "6px",
  marginBottom: "8px",
  color: "rgba(55, 53, 47, 0.6)",
  fontSize: "11px",
  fontWeight: 500,
  lineHeight: "120%",
  userSelect: "none",
  textTransform: "uppercase"
}

export const ellipsis:CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

export const toolRow:CSSProperties = {
  display: 'flex',
  marginTop: '12px',
  marginBottom: '6px',
  padding: '0 12px'
}

export const padding:CSSProperties = {
  paddingTop: 6,
  paddingBottom: 6
}

export const iconContainer:CSSProperties = {
  display: 'flex',
  flexFlow: 'column wrap',
  alignItems: 'flex-start',
  background: 'transparent',
  padding: '0px 0px 0px 12px',
  marginBottom: '1px'
}

export const icon:CSSProperties = {
  userSelect: 'none',
  transition: 'background 20ms ease-in 0s',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '3px',
  width: '32px',
  height: '32px',
  fontSize: '24px',
}

export const img = {
  width: '24px',
  height: '24px'
}