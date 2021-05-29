import * as styles from './css';

import Input from '../input';
import Button from '../button';

const App:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, style, ...props}) => {
  return (
    <div style={styles.wrap}>
      <Input style={styles.link}/>
      <Button style={styles.button}>
        +
      </Button>
    </div>
  )
}

export default App;