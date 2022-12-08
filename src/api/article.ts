import { Request } from '@/service'
import { ArticleListResponseData, ArticleListParamsType } from '@/types'

export const fetchArticleList = (params: ArticleListParamsType) => {
  return Request<any, ArticleListResponseData>({
    url: '/article',
    method: 'get',
    params,
  })
}

export const deleteArticle = (articleId: string) => {
  return Request({
    url: `/article/${articleId}`,
    method: 'delete',
  })
}
