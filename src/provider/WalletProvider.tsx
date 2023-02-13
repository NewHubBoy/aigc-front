import { ReactNode } from "react"
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
    [walletConnectProvider({ projectId: "a50ff301780ea5ef8035791e3bd7dc1a" }), publicProvider()]
);

const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "AIGC", chains }),
    provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const WalletProviser = ({ children }: { children: ReactNode }) => {
    return <WagmiConfig client={wagmiClient}>
        {children}
        <Web3Modal ethereumClient={ethereumClient} projectId={'a50ff301780ea5ef8035791e3bd7dc1a'} defaultChain={qitmeerTest} />
    </WagmiConfig>
}

export default WalletProviser