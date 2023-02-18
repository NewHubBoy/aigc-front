import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bsc, bscTestnet, mainnet } from "wagmi/chains";
import { qitmeer, qitmeerTest } from "../context/config/chain";
import { publicProvider } from 'wagmi/providers/public'


const chainList = [qitmeerTest, qitmeer, mainnet, bsc, bscTestnet]

// Wagmi client
const { chains, provider } = configureChains(
    chainList,
    [walletConnectProvider({ projectId: import.meta.env.VITE_APP_WALLETCONNECTID }), publicProvider()]
);

const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "AIGC", chains }),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const WalletProviser:React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({ children }) => {
    return <WagmiConfig client={wagmiClient}>
        {children}
        <Web3Modal ethereumClient={ethereumClient} projectId={import.meta.env.VITE_APP_WALLETCONNECTID} defaultChain={qitmeerTest} />
    </WagmiConfig>
}

export default WalletProviser