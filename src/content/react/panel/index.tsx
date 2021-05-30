import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useGetStorage } from '../hooks';

import Icon from '../components/icon';
import Hover from '../components/hover';
import Link from '../components/link';
import Upload from '../components/upload';

import setIcon from '@/api/notion/icon'

import * as style from './css';

const ROW_SIZE = 12;

export interface PanelProps {
  container:Element
}

const App:React.FC<PanelProps> = ({container}) => {
  const urls = useGetStorage();

  const wrap = useMemo(()=>{
    return urls.reduce<string[][]>((acc, url)=>{
      const current = acc[acc.length-1];
      if(current.length >= ROW_SIZE) acc.push([url]);
      else current.push(url);
      return acc;
    },[[]])}, [urls]);

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
              <Hover key={url} className="notion-focusable" role="button" tabIndex={-1} style={style.icon} onClick={()=>setIcon(url)}>
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