import { Request } from '@/service'
import { CategoryListResponseData } from '@/types'

export const fetchCategoryList = () => {
  return Request<any, CategoryListResponseData[]>({
    url: '/category',
    method: 'get',
  })
}

export const createCategory = (data) => {
  return Request({
    url: '/category',
    method: 'post',
    data,
  })
}

export const deleteCategory = (categoryId: Pick<CategoryListResponseData, 'id'>) => {
  return Request({
    url: `/category/${categoryId}`,
    method: 'delete',
  })
}

export const updateCategory = (
  title: Pick<CategoryListResponseData, 'title'>,
  categoryId: Pick<CategoryListResponseData, 'id'>,
) => {
  return Request({
    url: `/category/${categoryId}`,
    method: 'patch',
    data: {
      title,
    },
  })
}
