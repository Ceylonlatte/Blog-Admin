import { ListItemMetaType } from '../common'

export type ArticleListItem = {
  id: string
  title: string
  content: string
  thumb: string
  createdAt: string
  updatedAt: string
  categoryId: string
}
export interface ArticleListResponseData {
  meta: ListItemMetaType
  data: ArticleListItem[]
}

export interface ArticleListParamsType {
  page: number
  pageSize?: number
}

export interface CreateArtitleDataType {
  title: string
  content: string
}
