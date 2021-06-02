import { useState } from 'react';
import { useSelector } from '@/content/observer';

const isHover = (isHover:boolean, mode:string):React.CSSProperties => {
  return isHover ?
    { background:mode==="dark"?'rgb(71, 76, 80)':'rgba(55, 53, 47, 0.08)' }:
    {}
}

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, style, ...props}) => {
  const mode = useSelector(state => state.theme.mode);
  const [ hover, setHover ] = useState(false);

  const handleHover = (isHover:boolean) => {
    setHover(isHover)
  }

  return (
    <div role="button" tabIndex={-1}
      className="notion-focusable"
      style={{...style, ...isHover(hover, mode)}}
      onMouseOver={()=>handleHover(true)}
      onMouseOut={()=>handleHover(false)}
      {...props}>
      {children}
    </div>
  )
}

export default App;