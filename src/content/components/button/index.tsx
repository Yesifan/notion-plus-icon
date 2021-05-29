import * as styles from './css';
import { parseClassName } from '@/content/lib/utils'

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, style, className, ...props}) => {
  return (
    <div 
      role="button"
      tabIndex={-1}
      className={parseClassName("notion-focusable", className)}
      style={{...styles.button, ...style}}
      {...props}>
      {children}
    </div>
  )
}

export default App;