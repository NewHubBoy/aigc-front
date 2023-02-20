import {
    usePrepareSendTransaction,
    useSendTransaction as useSendTransactionForWagmi,
    useWaitForTransaction,
} from 'wagmi';


const useSendTransaction = ({ to, inputData, value = "0x0" }: { to: string, inputData: string, value: string }) => {

    let config: any = {
        mode: "prepared",
        request: {
            data: inputData,
            gasLimit: 500000,
            to,
            value
        }
    }

    const { data, sendTransaction } = useSendTransactionForWagmi(config)
    const { isLoading, isError, isSuccess, data: WaitData } = useWaitForTransaction({ hash: data?.hash })

    return { WaitData, isLoading, isError, isSuccess, sendTransaction }
}

export default useSendTransaction