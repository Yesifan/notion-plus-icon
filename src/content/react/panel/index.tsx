import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from '@/content/observer';

import Icon from '../components/icon';
import Hover from '../components/hover';
import Link from '../components/link';
import Upload from '../components/upload';

import { setPageIcon, Icon as IconProps } from '@/content/lib/notion';

import * as styles from './css';

const ROW_SIZE = 12;

const SubTitle:React.FC = ({children}) => {
  return (
    <div style={styles.title}>
      <div style={styles.ellipsis}>{children}</div>
      <div style={{marginLeft: "auto"}}></div>
    </div>
  )
}

const App:React.FC = () => {
  const dispatch = useDispatch();
  const [tab, icons, pageId, container] = useSelector(state => [state.current, state.icons, state.pageId, state.panelContainer]);
  const setIcon = useCallback(async (url:string, signedGetUrl?:string)=>{
    dispatch('HIDE_NOTION_ICON_PANEL')
    return pageId && setPageIcon(pageId, url, signedGetUrl);
  },[])
  const wrap = useMemo(()=>{
    const iconreduce = [...(icons.default||[]),...(icons[pageId!]||[])];
    return iconreduce
    .sort((a, b)=> a.timestamp-b.timestamp)
    .reduce<IconProps[][]>((acc, url)=>{
      const current = acc[acc.length-1];
      if(current.length >= ROW_SIZE) acc.push([url]);
      else current.push(url);
      return acc;
    },[[]])
  }, [icons, pageId]);

  if(!container||tab!=='plus') return null;
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
              {row.map(({src, url}) => (
              <Hover key={url} style={styles.icon} onClick={()=>setIcon(url)}>
                <Icon alt="img-url" aria-label="img-url" style={styles.img} src={src}/>
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