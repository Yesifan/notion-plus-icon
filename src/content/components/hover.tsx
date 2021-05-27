import * as React from 'react';

const isHover = (isHover:boolean):React.CSSProperties => {
  return isHover ?
    { background:'rgba(55, 53, 47, 0.08)' }:
    {}
}

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, style, ...props}) => {
  const [ hover, setHover ] = React.useState(false);

  const handleHover = (isHover:boolean) => {
    setHover(isHover)
  }

  return (
    <div {...props}
    style={{...style, ...isHover(hover)}}
    onMouseOver={()=>handleHover(true)}
    onMouseOut={()=>handleHover(false)}>
      {children}
    </div>
  )
}

export default App;