import { Navigate, useLocation } from 'react-router-dom'
import { rootRouter } from '@/routers/index'
import { LocalCache, searchRoute } from '@/utils'
import { Token } from '@/constant'

const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()

  const route = searchRoute(pathname, rootRouter)

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children

  // * 判断是否有Token
  const token = LocalCache.getItem(Token.ACCESS_TOKEN)
  if (!token) return <Navigate to='/login' replace />

  // * 当前账号有权限返回 Router，正常访问页面
  return props.children
}

export default AuthRouter
