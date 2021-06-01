import { useSelector } from '@/content/observer';

import Button, { styles } from '../button';

import { chooseFile } from '@/content/lib/utils';
import { upload } from '@/content/lib/notion';

import { overflow } from './css';
import { useCallback } from 'react';

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload?: (url:string, awsUrl:string) => void
}

const App:React.FC<UploadProps> = ({children, style, onUpload, ...props}) => {
  const pageId = useSelector(({pageId}) => pageId);
  const handleClick = useCallback(async () => {
    if(pageId){
      const file = (await chooseFile()) as File;
      const data = await upload(pageId, file);
      data && onUpload?.(data.url, data.signedGetUrl);
    }
  },[pageId])

  return (
    <div style={overflow}>
      <Button onClick={handleClick} style={styles.block} {...props}>
        Choose
      </Button>
    </div>
  )
}

export default App;