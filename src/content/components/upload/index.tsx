import * as styles from './css';

import Button from '../button';

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, style, ...props}) => {
  return (
    <div style={styles.overflow}>
      <Button>
        Choose
      </Button>
    </div>
  )
}

export default App;