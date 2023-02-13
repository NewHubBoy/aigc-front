
import { Chain } from 'wagmi'


const qitmeerExplorer = { name: 'Qitmeer Scan', url: 'https://meerscan.io/' }

export const qitmeer: Chain = {
    id: 813,
    name: 'Qitmeer Chain',
    network: 'qitmeer',
    rpcUrls: {
        public: {
            http: ['https://rpc.evm.meerscan.io', 'https://evm-dataseed.meerscan.com', 'https://evm-dataseed1.meerscan.com', 'https://evm-dataseed1.meerscan.io']
        },
        default: {
            http: ['https://rpc.evm.meerscan.io', 'https://evm-dataseed.meerscan.com', 'https://evm-dataseed1.meerscan.com', 'https://evm-dataseed1.meerscan.io']
        }
    },
    blockExplorers: {
        default: qitmeerExplorer,
        etherscan: qitmeerExplorer,
    },
    nativeCurrency: {
        name: 'Qitmeer Chain Native Token',
        symbol: 'MEER',
        decimals: 18,
    },
    //   multicall: {
    //     address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    //     blockCreated: 15921452,
    //   },
}

export const qitmeerTest: Chain = {
    id: 223,
    name: 'Qitmeer Chain testnet',
    network: 'qitmeer-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Qitmeer Chain Native Token',
        symbol: 'tMEER',
    },
    rpcUrls: {
        public: {
            http: ['https://meer.testnet.meerfans.club', 'https://evm-testnet-node.qitmeer.io']
        },
        default: {
            http: ['https://meer.testnet.meerfans.club', 'https://evm-testnet-node.qitmeer.io']
        },
    },
    blockExplorers: {
        default: { name: 'Qitmeer Scan', url: 'https://testnet.meerscan.io/' },
    },
    //   multicall: {
    //     address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    //     blockCreated: 17422483,
    //   },
    testnet: true,
}
