import { useState } from 'react';

const isHover = (isHover:boolean):React.CSSProperties => {
  return isHover ?
    { background:'rgba(55, 53, 47, 0.08)' }:
    {}
}

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, style, ...props}) => {
  const [ hover, setHover ] = useState(false);

  const handleHover = (isHover:boolean) => {
    setHover(isHover)
  }

  return (
    <div role="button" tabIndex={-1}
      className="notion-focusable"
      style={{...style, ...isHover(hover)}}
      onMouseOver={()=>handleHover(true)}
      onMouseOut={()=>handleHover(false)}
      {...props}>
      {children}
    </div>
  )
}

export default App;