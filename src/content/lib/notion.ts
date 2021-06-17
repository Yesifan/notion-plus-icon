/* eslint-disable @typescript-eslint/naming-convention */
import { getStorage, setStorage, ICON_STORAGE_KEY } from '@/lib/storage';

import { getUUID } from '@/lib/utils';

import { uploadFile } from '@/api/notion/uoload';
import { loadCachedPageChunk, setIcon } from '@/api/notion';

import * as Notion from '@/interface/notion';

const chunkCache = new Map();
const AWS_NOTION_STATIC_URL = 's3-us-west-2.amazonaws.com/secure.notion-static.com';
export interface Icon {
  src:string,
  url:string,
  timestamp: number
}
export interface Icons {
  default:Icon[]
  [id:string]:Icon[]
}

export const ICONS_DEFAULT = { default: [] };

export async function cacheIconUrl(src:string, url:string, id:string = 'default') {
  const timestamp = new Date().valueOf();
  const icons = await getStorage<Icons>(ICON_STORAGE_KEY);
  if (icons) {
    if (icons[id]) {
      const filters = icons[id].filter((item) => url !== item.url);
      const newIdIcons = [{ src, url, timestamp }, ...filters];
      icons[id] = newIdIcons;
    } else {
      icons[id] = [{ src, url, timestamp }];
    }
    setStorage({ [ICON_STORAGE_KEY]: icons });
  } else setStorage({ [ICON_STORAGE_KEY]: { [id]: [{ src, url, timestamp }] } });
}

export async function removeIconUrl(src:string) {
  const icons = await getStorage<Icons>(ICON_STORAGE_KEY);
  if (icons) {
    const newIcons = Object.entries(icons).reduce<Icons>((acc, [key, value]) => {
      acc[key] = value ? value.filter((item) => item.src !== src) : [];
      return acc;
    }, { default: [] });
    setStorage({ [ICON_STORAGE_KEY]: newIcons });
  } else setStorage({ [ICON_STORAGE_KEY]: {} });
}

export async function getChunkCache(pageId:string) {
  if (chunkCache.has(pageId)) return chunkCache.get(pageId);
  const pageChunk = await loadCachedPageChunk(pageId);
  chunkCache.set(pageId, pageChunk);
  return pageChunk;
}

export async function setPageIcon(
  pageId:string, url:string, signedGetUrl:string, isUpload?:boolean,
) {
  if (pageId) {
    const pageChunk = await getChunkCache(pageId);
    const blockInfo = pageChunk?.recordMap.block[pageId];
    if (blockInfo) {
      const { space_id, collection_id } = pageChunk.recordMap.block[pageId].value;
      const cacheId = url.indexOf(AWS_NOTION_STATIC_URL) >= 0 ? pageId : 'default';
      if (isUpload) {
        const fileId = collection_id ? getUUID(url) : undefined;
        await setIcon(url, pageId, space_id, collection_id, fileId);
      } else {
        await setIcon(url, pageId, space_id, collection_id);
      }
      return cacheIconUrl(signedGetUrl, url, cacheId);
    }
  }
  return undefined;
}

export const upload = async (pageId:string, file:File):Promise<Omit<Notion.UploadFileUrl, 'signedPutUrl'> | null> => {
  const pageChunk = await getChunkCache(pageId);
  const blockInfo = pageChunk?.recordMap.block[pageId];
  if (blockInfo) {
    const { space_id } = pageChunk.recordMap.block[pageId].value;
    return uploadFile(pageId, space_id, file);
  }
  return null;
};
