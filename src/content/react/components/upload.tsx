import { useCallback, useState } from 'react';

import { useSelector } from '@/content/observer';

import Button from './button';
import { Loading } from '@/icons';
import { Ellipsis } from '@/content/react/styled';

import { upload } from '@/content/lib/notion';
import { chooseFile } from '@/content/lib/utils';

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload?: (url:string, awsUrl:string) => void
}

const App:React.FC<UploadProps> = ({children, onUpload, ...props}) => {
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
    <Ellipsis>
      <Button type="primary" onClick={handleClick} {...props}>
        {isLoading ? <Loading className="loading-spinner"/> : 'Upload'}
      </Button>
    </Ellipsis>
  )
}

export default App;