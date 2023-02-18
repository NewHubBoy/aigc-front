import { ReactNode } from "react"
import { CookiesProvider as BaseCookiesProvider, useCookies as useBaseCookies } from "react-cookie"
import { cookiesConfig } from "../context/config/cookies"


export const useCookies = (name:string[]) => {
    const [cookie, setBaseCookies, removeBaseCookies] = useBaseCookies(name)
    console.log(cookie)
    return {
        cookie,
        setCookies: (name:string,value:any) => setBaseCookies(name, value,cookiesConfig),
        removeCookies: (name:string) => removeBaseCookies(name)
    }
}

const CookiesProvider:React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({ children }) => {
    return <BaseCookiesProvider>
        {children}
    </BaseCookiesProvider>
}

export default CookiesProvider