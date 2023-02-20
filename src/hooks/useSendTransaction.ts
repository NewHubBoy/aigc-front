import {
    usePrepareSendTransaction,
    useSendTransaction as useSendTransactionForWagmi,
    useWaitForTransaction,
} from 'wagmi';


const useSendTransaction = ({ to, inputData }: { to: string, inputData: string }) => {

    let config: any = {
        mode: "prepared",
        request: {
            data: inputData,
            gasLimit: 500000,
            to,
            value: "0x0"
        }
    }
    
    const { data, sendTransaction } = useSendTransactionForWagmi(config)
    const { isLoading, isError, isSuccess, data: WaitData } = useWaitForTransaction({ hash: data?.hash })

    return { WaitData, isLoading, isError, isSuccess, sendTransaction }
}

export default useSendTransaction