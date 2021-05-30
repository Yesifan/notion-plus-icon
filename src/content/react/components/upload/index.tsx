import Button, { styles } from '../button';

import upload from '@/api/notion/uoload';

import { chooseFile } from '@/content/lib/utils';

import { overflow } from './css';

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload?: (url:string, awsUrl:string) => void
}

const App:React.FC<UploadProps> = ({children, style, onUpload, ...props}) => {
  const handleClick = async () => {
    const file = (await chooseFile()) as File;
    const data = await upload(file);
    data && onUpload?.(data.url, data.signedGetUrl);
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