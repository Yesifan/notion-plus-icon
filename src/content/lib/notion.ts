import { setStorage4prev, ICON_STORAGE_KEY } from '@/lib/storage';

import { getUUID } from '@/content/lib/utils';

import { uploadFile } from '@/api/notion/uoload'
import { loadCachedPageChunk, setIcon } from '@/api/notion';

import * as Notion from '@/interface/notion';

const ICON_URL_LIMIT = 60;

const chunkCache = new Map();
export interface Icon {
  src:string,
  url:string,
}

export function cacheIconUrl(src:string, url:string){
  return setStorage4prev<Icon[]>(ICON_STORAGE_KEY, icons => {
    if(icons){
      const newUrls = [{src, url}, ...icons.filter(item => url!==item.url)];
      return newUrls.slice(0, ICON_URL_LIMIT);
    }
    return [{src, url}]
  })
}

export function removeIconUrl(src:string){
  return setStorage4prev<Icon[]>(ICON_STORAGE_KEY, icons => {
    return icons ? icons.filter(item => item.src !== src) : [];
  });
}

export async function getChunkCache(pageId:string){
  if(chunkCache.has(pageId)) return chunkCache.get(pageId);
  const pageChunk = await loadCachedPageChunk(pageId);
  chunkCache.set(pageId, pageChunk);
  return pageChunk;
}

export async function setPageIcon(pageId:string, url:string, signedGetUrl?:string){
  if(pageId){
    const pageChunk = await getChunkCache(pageId);
    const blockInfo = pageChunk?.recordMap.block[pageId];
    if(blockInfo) {
      const { space_id, collection_id } = pageChunk.recordMap.block[pageId].value;
      if(signedGetUrl){
        const fileId = collection_id ? getUUID(url) : undefined;
        await setIcon(url, pageId, space_id, collection_id, fileId);
        return cacheIconUrl(signedGetUrl, url);
      }else{
        await setIcon(url, pageId, space_id, collection_id);
        return cacheIconUrl(url, url);
      }
    }
  }
  return undefined;
}

export const upload = async (pageId:string, file:File):Promise<Omit<Notion.UploadFileUrl,'signedPutUrl'>|void> => {
  const pageChunk = await getChunkCache(pageId);
  const blockInfo = pageChunk?.recordMap.block[pageId];
  if(blockInfo) {
    const { space_id } = pageChunk.recordMap.block[pageId].value;
    return uploadFile(pageId, space_id, file);
  }
}