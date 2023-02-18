import GlobalProvider from "./GlobalProvider"
import WalletProviser from "./WalletProvider"
import { CookiesProvider } from "react-cookie"


const Provider:React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({ children }) => {
    return <CookiesProvider>
        <GlobalProvider>
            <WalletProviser>
                {children}
            </WalletProviser>
        </GlobalProvider>
    </CookiesProvider>
}

export default Provider