import { useSelector } from '@/content/observer';

import Button from '../button';
import Loading from '../../icons/loading';

import { chooseFile } from '@/content/lib/utils';
import { upload } from '@/content/lib/notion';

import { overflow } from './css';
import { useCallback, useState } from 'react';

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload?: (url:string, awsUrl:string) => void
}

const App:React.FC<UploadProps> = ({children, style, onUpload, ...props}) => {
  const [isLoading, setLoading] = useState(false);
  const pageId = useSelector(({pageId}) => pageId);
  const handleClick = useCallback(async () => {
    setLoading(true);
    try{
      const file = (await chooseFile()) as File;
      const data = await upload(pageId!, file);
      data && onUpload?.(data.url, data.signedGetUrl);
      setLoading(false);
    }catch(e){
      setLoading(false);
    }
  },[pageId])

  return (
    <div style={overflow}>
      <Button type="primary" onClick={handleClick} style={{...style}} {...props}>
        {isLoading ? <Loading/> : 'Upload'}
      </Button>
    </div>
  )
}

export default App;