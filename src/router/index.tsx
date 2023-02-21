import { lazy } from "react";
import { RouteProps } from "../type/Route";
const Production = lazy(() => import('../view/Production'))
const Example = lazy(() => import('../view/Example'))

const routes: RouteProps[] = [{
    path: '/',
    element: <Production />
}, {
    path: '/example',
    element: <Example />
}]

export default routes