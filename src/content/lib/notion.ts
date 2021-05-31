import store, { setIcons } from '@/content/store';

import { loadCachedPageChunk, setIcon as setIcon4id } from '@/api/notion';
import { uploadFile } from '@/api/notion/uoload'

import { getUUID } from '@/content/lib/utils';

import * as Notion from '@/interface/notion';

export const ICON_STORAGE_KEY = "NOTION_PLUS_ICON_URLS";
export const ICON_URL_LIMIT = 48;

const { storage } = chrome;

storage.sync.get(ICON_STORAGE_KEY, (items) => {
  const urls:string[] = items[ICON_STORAGE_KEY];
  if(urls){
    store.dispatch(setIcons(urls));
  }
})

storage.onChanged.addListener((changes)=>{
  if(changes[ICON_STORAGE_KEY]){
    const { newValue } = changes[ICON_STORAGE_KEY];
    store.dispatch(setIcons(newValue));
  }
})

export function cacheIconUrl(url:string){
  storage.sync.get(ICON_STORAGE_KEY, (items) => {
    const urls:string[] = items[ICON_STORAGE_KEY];
    if(urls){
      const _urls = urls.filter(_url => _url !== url);
      if(_urls.length >= ICON_URL_LIMIT){
        const newUrls = [url, ..._urls.slice(0, ICON_URL_LIMIT-1)];
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

export function removeIconUrl(url:string){
  storage.sync.get(ICON_STORAGE_KEY, (items) => {
    const urls:string[] = items[ICON_STORAGE_KEY];
    if(urls){
      const _urls = urls.filter(_url => _url !== url);
      storage.sync.set({[ICON_STORAGE_KEY]: _urls});
    }
  })
}

export async function setIcon(url:string, signedGettUrl?:string){
  const pageId = store.getState().pageId;
  if(pageId){
    const pageChunk = await loadCachedPageChunk(pageId);
    const blockInfo = pageChunk?.recordMap.block[pageId];
    if(blockInfo) {
      const { space_id, collection_id } = pageChunk.recordMap.block[pageId].value;
      if(signedGettUrl){
        const fileId = collection_id ? getUUID(url) : undefined;
        await setIcon4id(url, pageId, space_id, collection_id, fileId);
        cacheIconUrl(signedGettUrl);
      }else{
        await setIcon4id(url, pageId, space_id, collection_id);
        cacheIconUrl(url);
      }
    }
  }
}

export const upload = async (file:File):Promise<Omit<Notion.UploadFileUrl,'signedPutUrl'>|void> => {
  const pageId = store.getState().pageId;
  if(pageId){
    const pageChunk = await loadCachedPageChunk(pageId);
    const blockInfo = pageChunk?.recordMap.block[pageId];
    if(blockInfo) {
      const { space_id } = pageChunk.recordMap.block[pageId].value;
      return uploadFile(pageId, space_id, file);
    }
  }
}