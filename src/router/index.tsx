import { lazy } from "react";
import { RouteProps } from "../type/Route";
const Production = lazy(() => import('../view/Production'))

const routes: RouteProps[] = [{
    path: '/',
    element: <Production />
}]

export default routes