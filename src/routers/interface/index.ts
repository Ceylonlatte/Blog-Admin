export interface MetaProps {
  keepAlive?: boolean
  requiresAuth?: boolean
  title: string
  key?: string
  hidden?: boolean
}

export interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: false
  icon?: string
  path?: string
  meta?: MetaProps
  isLink?: string
}
