import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export const Container = styled.div`
  padding-top: 6px;
  white-space: nowrap;
  min-width: 0px;
  flex-shrink: 0;
  color: rgb(55, 53, 47);
  position: relative;
`

export const container:CSSProperties = {
  paddingTop: '6px',
  paddingBottom: '',
  whiteSpace: 'nowrap',
  minWidth: 0,
  flexShrink: 0,
  color: 'rgb(55, 53, 47)',
  position: 'relative'
}

export const tab = (mode:string):CSSProperties => ({
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
  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgb(55, 53, 47)'
})

export const underline = (mode:string):CSSProperties => ({
  borderBottom: `2px solid ${mode==="dark"?'rgba(255, 255, 255, 0.9)':'rgb(55, 53, 47)'}`, 
  position: 'absolute', 
  bottom: '-7px', 
  left: '8px', 
  right: '8px'
})