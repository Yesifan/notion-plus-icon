import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from '@/content/observer';

import Icon from './components/icon';
import Link from './components/link';
import Button from './components/button';
import Upload from './components/upload';

import { Panel, Ellipsis, Flex, ColumnFlex } from '@/content/react/styled';

import { setPageIcon, Icon as IconProps } from '@/content/lib/notion';

const ROW_SIZE = 12;

const icon:React.CSSProperties = {
  width: '32px',
  height: '32px',
  fontSize: '24px',
  borderRadius: '3px',
  justifyContent: 'center'
}

const SubTitle:React.FC = ({children}) => {
  return (
    <Panel.Title>
      <Ellipsis>{children}</Ellipsis>
    </Panel.Title>
  )
}

const App:React.FC = () => {
  const dispatch = useDispatch();
  const [tab, icons, pageId, container] = useSelector(state => [state.current, state.icons, state.pageId, state.panelContainer]);
  const setIcon = useCallback(async (url:string, signedGetUrl:string, isUpload = false)=>{
    dispatch('HIDE_NOTION_ICON_PANEL')
    return pageId && setPageIcon(pageId, url, signedGetUrl, isUpload);
  },[pageId])
  const wrap = useMemo(()=>{
    const linkIcons = icons.default||[];
    const pageIcons = icons[pageId!]||[];
    
    return [...linkIcons, ...pageIcons]
    .sort((a, b)=> b.timestamp-a.timestamp)
    .reduce<IconProps[][]>((acc, url)=>{
      const current = acc[acc.length-1];
      if(current.length >= ROW_SIZE) acc.push([url]);
      else current.push(url);
      return acc;
    },[[]])
  }, [icons, pageId]);

  if(!container||tab!=='plus') return null;
  return createPortal(
    <ColumnFlex>
      <Flex style={{ margin:'12px 0 6px 0', padding:'0 12px'}}>
        <Upload style={{width:'70px'}} onUpload={(url, src)=>setIcon(url, src, true)}/>
        <Link onClick={(url)=>setIcon(url, url)}/>
      </Flex>
      <div style={{flexGrow: 1}}>
        <div style={{ padding:'6px 0' }}>
          <SubTitle>Recent</SubTitle>
          <ColumnFlex style={{padding:'0 12px', marginBottom:'1px'}}>
            {wrap.map((row, index) => (
            <Flex key={index}>
              {row.map(({src, url}) => (
              <Button key={url} style={icon} onClick={()=>setIcon(url, src)}>
                <Icon size={24} alt="img-url" aria-label="img-url" src={src}/>
              </Button>))}
            </Flex>))}
          </ColumnFlex>
        </div>
        <div></div>
      </div>
    </ColumnFlex>,
    container
  )
}

export default App;