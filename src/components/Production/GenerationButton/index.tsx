import styles from "@/styles/Production.module.less"
import { ethers } from "ethers"
import { useEffect, useLayoutEffect } from "react"
import { useTranslation } from 'react-i18next'
import PaintingDeductionABI from '../../../context/abi/PaintingDeduction.json'
import useSendTransaction from "../../../hooks/useSendTransaction"
const GenerationButton = ({ orderId, price }: { orderId: string, price: string }) => {
    const { t } = useTranslation()
    const _interface = new ethers.utils.Interface(PaintingDeductionABI)
    const _encodeData = _interface.encodeFunctionData('bidSale', [orderId])
    const { WaitData, isLoading, isSuccess, isError, sendTransaction } = useSendTransaction({
        to: '0xc4B9e7cf99e0C50Fee6890D55a3CC0F9E51a27F6',
        inputData: _encodeData,
        value: ethers.BigNumber.from(price as string).toHexString()
    })

    const handleGeneration = () => {

    }

    useLayoutEffect(() => {
        if (orderId && price && sendTransaction) {
            sendTransaction()
        }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            if (WaitData) {
                console.log(WaitData)
            }
        }
    }, [isSuccess, isLoading, isError, WaitData])

    return <></>
}

export default GenerationButton