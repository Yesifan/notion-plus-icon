import { CSSProperties } from 'react';

export const container:CSSProperties = {
  paddingTop: '6px',
  paddingBottom: '',
  whiteSpace: 'nowrap',
  minWidth: 0,
  flexShrink: 0,
  color: 'rgb(55, 53, 47)',
  position: 'relative'
}

export const tab:CSSProperties = {
  userSelect: 'none',
  transition: 'background 20ms ease-in 0s',
  cursor: 'pointer', display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  height: '28px',
  borderRadius: '3px',
  fontSize: '14px',
  lineHeight: 1.2,
  minWidth: 0,
  paddingLeft: '8px',
  paddingRight: '8px',
  color: 'rgb(55, 53, 47)',
}

export const underline:CSSProperties = {
  borderBottom: '2px solid rgb(55, 53, 47)', 
  position: 'absolute', 
  bottom: '-7px', 
  left: '8px', 
  right: '8px'
}