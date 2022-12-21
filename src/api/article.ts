import { Request } from '@/service'
import {
  ArticleListResponseData,
  ArticleListParamsType,
  CreateArtitleDataType,
  ArticleListItem,
} from '@/types'

export const fetchArticleList = (params: ArticleListParamsType) => {
  return Request<any, ArticleListResponseData>({
    url: '/article',
    method: 'get',
    params,
  })
}

export const fetchArticleDetail = (articleId: string) => {
  return Request<any, ArticleListItem>({
    url: `/article/${articleId}`,
    method: 'get',
  })
}

export const createArticle = (data: CreateArtitleDataType) => {
  return Request({
    url: '/article',
    method: 'post',
    data,
  })
}

export const deleteArticle = (articleId: string) => {
  return Request({
    url: `/article/${articleId}`,
    method: 'delete',
  })
}

export const updateArticle = (articleId: string, data) => {
  return Request({
    url: `/article/${articleId}`,
    method: 'patch',
    data,
  })
}
