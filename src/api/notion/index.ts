import { v4 as uuid } from 'uuid';

import { fetcher } from '../request';

import * as Notion from '@/interface/notion';

export function getPublicPageData(id:string){
  return fetcher<Notion.PublicPageData>('/api/v3/getPublicPageData', { 
    method:'post',
    body:{
      blockId: id,
      name: "page",
      saveParent: false,
      showMoveTo: false,
      type: "block-space"
    }
  })
}

export function loadCachedPageChunk(id:string){
  return fetcher<Notion.Chunk>('/api/v3/loadCachedPageChunk', {
    method:'post',
    body:{
      pageId: id,
      limit: 1,
      chunkNumber: 0,
      verticalColumns: false
    }
  })
}

export function setIcon(icon:string, pageId:string, spaceId:string, isLastEditedTime = false, collectionId?:string){
  const requestId = uuid();
  const transactionId = uuid();

  const timestamp = new Date().valueOf();

  const operations = [
    collectionId ? createOperation(collectionId, 'collection', [ "icon" ], icon) :
      createOperation(pageId, 'block', [ "format", "page_icon" ], icon),
    isLastEditedTime && createOperation(pageId, 'block', [ "last_edited_time" ], timestamp)
  ].filter(Boolean);

  function createOperation (id:string, table:string, path:string[], args:any) {
    return {
      pointer: { id, table, spaceId },
      path,
      command: "set",
      args
    }
  }

  return fetcher('/api/v3/saveTransactions', {
    method:'post',
    body: {
      requestId,
      transactions: [
        {
          id: transactionId,
          spaceId,
          operations
        }
      ]
    }
  });
}
