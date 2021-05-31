import { setStorage4prev, ICON_STORAGE_KEY } from '@/lib/storage';

import store from '@/content/store';

import { getUUID } from '@/content/lib/utils';

import { loadCachedPageChunk, setIcon as setIcon4id } from '@/api/notion';
import { uploadFile } from '@/api/notion/uoload'

import * as Notion from '@/interface/notion';

const ICON_URL_LIMIT = 60;

export function cacheIconUrl(url:string){
  return setStorage4prev<string[]>(ICON_STORAGE_KEY, urls => {
    if(urls){
      const newUrls = [url, ...urls.filter(item => item!==url)];
      return newUrls.slice(0, ICON_URL_LIMIT);
    }
    return [url]
  })
}

export function removeIconUrl(url:string){
  return setStorage4prev<string[]>(ICON_STORAGE_KEY, urls => {
    return urls ? urls.filter(_url => _url !== url) : [];
  });
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
        return cacheIconUrl(signedGettUrl);
      }else{
        await setIcon4id(url, pageId, space_id, collection_id);
        return cacheIconUrl(url);
      }
    }
  }
  return undefined;
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