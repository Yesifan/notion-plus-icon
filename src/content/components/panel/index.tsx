import { createPortal } from 'react-dom';

import Hover from '../hover';
import Link from '../link';
import Upload from '../upload';

import { loadCachedPageChunk, setIcon } from '@/api/notion'

import * as style from './css';

export interface PanelProps {
  pageId: string
  container:Element
}

const setIcon4pageId = async (pageId:string, icon:string) =>{
  const pageChunk = await loadCachedPageChunk(pageId);
  const blockInfo = pageChunk?.recordMap.block[pageId];
  if(blockInfo){
    const { space_id, collection_id } = pageChunk.recordMap.block[pageId].value;
    return setIcon(icon, pageId, space_id, true, collection_id)
  }
}

const App:React.FC<PanelProps> = ({pageId, container}) => {
  return createPortal(
    <div style={style.columnFlex}>
      <div style={style.toolRow}>
        <Upload/>
        <Link/>
      </div>
      <div style={{flexGrow: 1}}>
        <div style={style.padding}>
          <div style={style.iconContainer} onClick={()=>setIcon4pageId(pageId, '😀')}>
            <Hover className="notion-focusable" role="button" tabIndex={-1} style={style.icon} >
              <img alt="😀" aria-label="😀"
                className="notion-emoji"
                style={style.img('/images/twitter-emoji-spritesheet-64.png')}
                src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
            </Hover>
          </div>
        </div>
        <div></div>
      </div>
    </div>,
    container
  )
}

export default App;