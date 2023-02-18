import type { RouteObject } from 'react-router-dom'

// 扩展Route定义
export interface RouteProps extends RouteObject {
  path: string
  element: JSX
  children?: RouteProps[],
  [name: string]: any
}
