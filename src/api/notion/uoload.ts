import store from '@/content/store';

import { fetcher } from '../request';

import { loadCachedPageChunk } from './index';

import * as Notion from '@/interface/notion';

export const getUploadFileUrl = (pageId:string, spaceId:string, filename:string, mimetype:string) => {
  return fetcher<Notion.UploadFileUrl>('/api/v3/getUploadFileUrl', {
    method:'POST',
    body:{
      bucket: "secure",
      name: filename,
      contentType: mimetype,
      record: {
        table:"block",
        id: pageId,
        spaceId
      }
    }
  })
}

export const uploadFile = async (pageId:string, spaceId:string, file:File) => {
  const { name, type } = file;
  const { url, signedPutUrl, signedGetUrl } = await getUploadFileUrl(pageId, spaceId, name, type);
  await fetcher(signedPutUrl, {
    method:'PUT',
    headers:{
      'content-type': type
    },
    body:file
  });
  return {url, signedGetUrl};
}