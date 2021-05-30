import { createPortal } from 'react-dom';

import { useGetStorage } from '../hooks';

import Hover from '../hover';
import Link from '../link';
import Upload from '../upload';

import setIcon4pageId from '@/api/notion/icon'

import * as style from './css';
import { useCallback } from 'react';

export interface PanelProps {
  pageId: string
  container:Element
}

const App:React.FC<PanelProps> = ({pageId, container}) => {
  const urls = useGetStorage();
  const setIcon = useCallback((icon:string)=>setIcon4pageId(pageId, icon), [pageId]);

  return createPortal(
    <div style={style.columnFlex}>
      <div style={style.toolRow}>
        <Upload/>
        <Link onClick={url => setIcon(url)}/>
      </div>
      <div style={{flexGrow: 1}}>
        <div style={style.padding}>
          <div style={style.iconContainer}>
            {urls.map(url => (
              <Hover key={url} className="notion-focusable" role="button" tabIndex={-1} style={style.icon} onClick={()=>setIcon(url)}>
                <img alt="img-url" aria-label="img-url"
                  className="notion-emoji"
                  style={style.img}
                  src={url} />
              </Hover>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>,
    container
  )
}

export default App;