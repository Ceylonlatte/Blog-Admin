import { ListItemMetaType } from '../common'

export interface ArticleListResponseData {
  meta: ListItemMetaType
  data: {
    id: string
    title: string
    content: string
    thumb: string
    createdAt: string
    updatedAt: string
    categoryId: string
  }[]
}

export interface ArticleListParamsType {
  page: number
  pageSize?: number
}
