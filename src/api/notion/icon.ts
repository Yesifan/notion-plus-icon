import store from '@/content/store';

import { loadCachedPageChunk, setIcon } from './index';

const { storage } = chrome;

export const ICON_STORAGE_KEY = "NOTION_PLUS_ICON_URLS";
export const ICON_URL_LIMIT = 48;

function putIconUrl(url:string){
  storage.sync.get(ICON_STORAGE_KEY, (items) => {
    const urls:string[] = items[ICON_STORAGE_KEY];
    if(urls){
      const _urls = urls.filter(_url => _url !== url);
      if(_urls.length >= ICON_URL_LIMIT){
        const newUrls = [url, ..._urls.slice(0, -1)];
        storage.sync.set({[ICON_STORAGE_KEY]: newUrls});
      }else{
        const newUrls = [url, ..._urls];
        storage.sync.set({[ICON_STORAGE_KEY]: newUrls});
      }
    }else{
      storage.sync.set({[ICON_STORAGE_KEY]:[url]});
    }
  })
}

export default async function setIcon4pageId(icon:string){
  const pageId = store.getState().pageId;
  if(pageId){
    const pageChunk = await loadCachedPageChunk(pageId);
    const blockInfo = pageChunk?.recordMap.block[pageId];
    if(blockInfo) {
      const { space_id, collection_id } = pageChunk.recordMap.block[pageId].value;
      await setIcon(icon, pageId, space_id, true, collection_id);
      putIconUrl(icon);
    }
  }
}

