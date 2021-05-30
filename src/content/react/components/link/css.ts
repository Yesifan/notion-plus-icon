import { CSSProperties } from "react"

import { block } from '../button/block.css';

export const wrap:CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flex: 1
}

export const link:CSSProperties = {
  margin: '0 2px 0 8px'
}

export const button:CSSProperties = {
  ...block
}