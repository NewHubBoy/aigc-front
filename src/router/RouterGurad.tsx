import { useEffect } from 'react';
import {
    useLocation,
    useNavigate,
    useRoutes,
    Location,
    NavigateFunction,
} from 'react-router-dom';
import type { RouteProps } from '../type/Route';


export interface RouteObject {
    caseSensitive?: boolean | undefined;
    children?: RouteProps[];
    element?: React.ReactNode;
    index?: any;
    path?: string;
    auth?: boolean;
}

//递归查询对应的路由
export function searchroutedetail(
    path: string,
    routes: RouteProps[]
): RouteProps | null {
    for (let item of routes) {
        if (item.path === path) return item;
        if (item.children) {
            return searchroutedetail(path, item.children);
        }
    }
    return null;
}

//   路由守卫
function guard(
    location: Location,
    navigate: NavigateFunction,
    routes: RouteProps[],
) {
    const { pathname } = location;

    //找到对应的路由信息
    const routedetail: RouteProps | null = searchroutedetail(pathname, routes);

    //没有找到路由，跳转404
    if (!routedetail) {
        navigate("/404");
        return false;
    }

    return true;
}


export const RouterGurad = (routes: RouteProps[]) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        guard(location, navigate, routes);
    }, [location, navigate, routes]);

    // 路由变换回到顶部
    // document.documentElement.scrollTo(0, 0);

    const Route = useRoutes(routes);
    return Route;
};

export default RouterGurad


