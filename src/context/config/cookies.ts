import { CookieSetOptions } from "universal-cookie";

export const cookiesConfig: CookieSetOptions = {
    path: '/aigc',
    maxAge: 60 * 60 * 24 * 7, // 有效天七天
    sameSite: 'strict',
    secure: true
}