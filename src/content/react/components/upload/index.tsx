import Button, { styles } from '../button';

import upload from '@/api/notion/uoload';

import { chooseFile } from '@/content/lib/utils';

import { overflow } from './css';

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload?: (file:File|undefined) => void
}

const App:React.FC<UploadProps> = ({children, style, onUpload, ...props}) => {
  const handleClick = async () => {
    const file = (await chooseFile()) as File;
    onUpload?.(file);
    console.log(file, file.name, file.type);
  }

  return (
    <div style={overflow}>
      <Button onClick={handleClick} style={styles.block} {...props}>
        Choose
      </Button>
    </div>
  )
}

export default App;