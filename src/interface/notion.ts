export type CreateType = "notion_user";
export type UserType = "bot_permission"|"space_permission";
export type PageType = "collection_view_page"|"page"|"space";
export type RoleType = "editor"|"comment_only"|"read_and_write";

export interface PublicPageData {
  spaceName: string,
  spaceId: string,
  spaceDomain: string,
  canJoinSpace: boolean,
  icon: string,
  userHasExplicitAccess: boolean,
  hasPublicAccess: boolean,
  betaEnabled: boolean,
  canRequestAccess: boolean
}

export interface Chunk {
  recordMap:{
    block:{
      [pageId:string]:ChunkInfo
    }
  }
}

export interface ChunkInfo {
  role: RoleType,
  value: {
    id: string,
    version: number,
    type: PageType,
    view_ids: string[],
    collection_id: string,
    format: {
      page_icon: string
    },
    permissions: {
      role: RoleType,
      type: UserType,
      bot_id?: string
    }[],
    created_time: number,
    last_edited_time: number,
    parent_id: string,
    parent_table: PageType,
    alive: true,
    file_ids: string[],
    created_by_table: CreateType,
    created_by_id: string,
    last_edited_by_table: CreateType,
    last_edited_by_id: string,
    space_id: string
  }
}

export interface UploadFileUrl {
  url:string
  signedGettUrl:string
  signedPutUrl:string
}