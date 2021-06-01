import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useSelector } from '@/content/observer';

import Icon from '../components/icon';
import Hover from '../components/hover';
import Link from '../components/link';
import Upload from '../components/upload';

import { getPanelMask } from '@/content/lib/dom';
import { setPageIcon } from '@/content/lib/notion';

import * as styles from './css';

const ROW_SIZE = 12;

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  container?:Element
}

const SubTitle:React.FC = ({children}) => {
  return (
    <div style={styles.title}>
      <div style={styles.ellipsis}>{children}</div>
      <div style={{marginLeft: "auto"}}></div>
    </div>
  )
}

const App:React.FC<PanelProps> = ({container}) => {
  const [icons, pageId] = useSelector(({icons, pageId}) => [icons, pageId]);
  const setIcon = useCallback(async (url:string, signedGetUrl?:string)=>{
    const mask = getPanelMask();
    if(mask) mask.click();
    return pageId && setPageIcon(pageId, url, signedGetUrl);
  },[])
  const wrap = useMemo(()=>{
    return icons.reduce<string[][]>((acc, url)=>{
      const current = acc[acc.length-1];
      if(current.length >= ROW_SIZE) acc.push([url]);
      else current.push(url);
      return acc;
    },[[]])}, [icons]);
  if(!container) return null;
  return createPortal(
    <div style={styles.columnFlex}>
      <div style={styles.toolRow}>
        <Upload onUpload={setIcon}/>
        <Link onClick={setIcon}/>
      </div>
      <div style={{flexGrow: 1}}>
        <div style={styles.padding}>
          <SubTitle>Recent</SubTitle>
          <div style={styles.iconContainer}>
            {wrap.map((row, index) => (
            <div style={{display:'flex'}} key={index}>
              {row.map(url => (
              <Hover key={url} style={styles.icon} onClick={()=>setIcon(url)}>
                <Icon alt="img-url" aria-label="img-url" style={styles.img} src={url}/>
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