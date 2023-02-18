import { createContext, ReactNode, useContext, useEffect, useReducer } from "react"
import { useCookies } from "react-cookie";
import reducer, { store } from "../store";
import { GlobalState } from "../type/GlobalProviderType";


const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, store);
    const [cookies,setCookies] = useCookies(['aigc-front'])

    const context: GlobalState = {
        state,
        dispatch,
    };

    // 从本地获取缓存的数据
    useEffect(() => {
        dispatch({ type: 'setLanguage', value: cookies["aigc-front"]?.lang })
    }, [])

    return <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>;
};

export const useGlobal = (): GlobalState => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("GlobalContext not found");
    }

    return context;
};

export const GlobalProvider:React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({ children }) => {
    return <StateProvider>{children}</StateProvider>;
};

export default GlobalProvider