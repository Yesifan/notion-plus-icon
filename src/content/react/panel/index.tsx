import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useSelector } from '@/content/store';

import Icon from '../components/icon';
import Hover from '../components/hover';
import Link from '../components/link';
import Upload from '../components/upload';

import { setPageIcon } from '@/content/lib/notion';

import * as style from './css';

const ROW_SIZE = 12;

export interface PanelProps {
  container:Element
}

const App:React.FC<PanelProps> = ({container}) => {
  const [icons, pageId] = useSelector(({icons, pageId}) => [icons, pageId]);
  const setIcon = useCallback(async (url:string, signedGetUrl?:string)=>{
    return pageId && setPageIcon(pageId, url, signedGetUrl);
  },[])
  const wrap = useMemo(()=>{
    return icons.reduce<string[][]>((acc, url)=>{
      const current = acc[acc.length-1];
      if(current.length >= ROW_SIZE) acc.push([url]);
      else current.push(url);
      return acc;
    },[[]])}, [icons]);

  return createPortal(
    <div style={style.columnFlex}>
      <div style={style.toolRow}>
        <Upload onUpload={setIcon}/>
        <Link onClick={setIcon}/>
      </div>
      <div style={{flexGrow: 1}}>
        <div style={style.padding}>
          <div style={style.iconContainer}>
            {wrap.map((row, index) => (
            <div style={{display:'flex'}} key={index}>
              {row.map(url => (
              <Hover key={url} style={style.icon} onClick={()=>setIcon(url)}>
                <Icon alt="img-url" aria-label="img-url" style={style.img} src={url}/>
              </Hover>))}
            </div>))}
          </div>
        </div>
        <div></div>
      </div>
    </div>,
    container
  )
}

export default App;