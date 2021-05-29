import * as styles from './css';

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({style, className, ...props}) => {
  return (
    <div className="notion-focusable-within" style={{...styles.focusable, ...style}}>
      <input style={styles.input} {...props}></input>
    </div>
  )
}

export default App;