import { overflow } from './css';

import Button, { styles } from '../button';

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, style, ...props}) => {
  return (
    <div style={overflow}>
      <Button style={styles.block}>
        Choose
      </Button>
    </div>
  )
}

export default App;