import { loadCachedPageChunk, setIcon } from './index';

export default async function setIcon4pageId(pageId:string, icon:string){
  const pageChunk = await loadCachedPageChunk(pageId);
  const blockInfo = pageChunk?.recordMap.block[pageId];
  if(blockInfo){
    const { space_id, collection_id } = pageChunk.recordMap.block[pageId].value;
    setIcon(icon, pageId, space_id, true, collection_id)
  }
}

