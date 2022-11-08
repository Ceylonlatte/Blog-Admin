import { Navigate, useLocation } from 'react-router-dom'
import { rootRouter } from '@/routers/index'
import { searchRoute } from '@/utils'

const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()

  const route = searchRoute(pathname, rootRouter)

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children

  // * 判断是否有Token
  // const token = store.getState().global.token;
  // if (!token) return <Navigate to="/login" replace />;

  console.log(route)
  console.log(rootRouter)
  // * 当前账号有权限返回 Router，正常访问页面
  return props.children
}

export default AuthRouter
