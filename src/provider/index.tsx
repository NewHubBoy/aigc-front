import { ReactNode } from "react"
import GlobalProvider from "./GlobalProvider"
import WalletProviser from "./WalletProvider"
import { CookiesProvider } from "react-cookie"


const Provider = ({ children }: { children: ReactNode }) => {
    return <CookiesProvider>
        <GlobalProvider>
            <WalletProviser>
                {children}
            </WalletProviser>
        </GlobalProvider>
    </CookiesProvider>
}

export default Provider