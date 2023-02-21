import styles from "@/styles/Production.module.less"
import { Input, InputNumber, message } from "antd"
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import AigcContentBox from "../../components/Production/AigcContentBox"
import Tag from "../../components/Production/AigcContentBox/Tags"
import Title from "../../components/Production/AigcContentBox/Title"
import { ratioList } from '../../context/config/productionConfig'

// ratio
import normal1_1 from '../../assets/Images/production/1-1normal.png'
import normal3_4 from '../../assets/Images/production/3-4normal.png'
import normal4_3 from '../../assets/Images/production/4-3normal.png'
import normal9_16 from '../../assets/Images/production/9-16normal.png'
import normal16_9 from '../../assets/Images/production/16-9normal.png'
import { use } from "i18next"
import { get, post, postForm } from "../../utils/request"
import { Artists, Engines, OrderResponse, PaintingOptions, Styles } from "../../type/Produciton"
import { SUCCESS_CODE } from "../../context/config/httpStatus"
import UpLoad from "../../components/Production/UpLoad"
import BottomText from "../../components/Production/BottomText"
import { useContractRead } from "wagmi"
import PaintingDeductionABI from '../../context/abi/PaintingDeduction.json'
import { BigNumberish, ethers } from "ethers"
import useSendTransaction from "../../hooks/useSendTransaction"
import GenerationButton from "../../components/Production/GenerationButton"
import ReactInterval from 'react-interval';

const OrderState = {
    //0.待创建 、1.待处理、2.处理中、 3.处理成功、4.处理失败
    0: "待创建",
    1: "待处理",
    2: "处理中",
    3: "处理成功",
    4: "处理失败"
}



const { TextArea } = Input;



const Production = () => {
    const { t } = useTranslation()

    const stepCountList = [{
        key: 0,
        label: t('production.steocount.item1')
    }, {
        key: 1,
        label: t('production.steocount.item2')
    }]

    const [paintingPrice, SetPaintingPrice] = useState<string>('')
    const [paintingOrderId, setPaintingOrderId] = useState<string>('')

    const [keyBoard, setKeyBoard] = useState('')
    // styles data
    const [stylesList, setStylesList] = useState<Styles[]>([])
    // artists data
    const [artistsList, setArtistsList] = useState<Artists[]>([])
    // Engines
    // const [engines, setEngines] = useState<Engines[]>([])
    const [configLoading, setConfigLoading] = useState<boolean>(false)
    const [historyLoading, setHistoryLoading] = useState<boolean>(false)
    // const [currentEngines, setCurrentEngines] = useState<Engines>('通用')
    const [currentStyles, setCurrentStyles] = useState<string>('0')
    const [currentArtists, setCurrentArtists] = useState<string>('0')
    const [extensions, setExtensions] = useState<boolean>(false)
    const [stepCount, setStepCount] = useState<any>(0)
    const [general, setGeneral] = useState<number>(7.5)
    const [ratio, setRatio] = useState<number>(0)
    // example imag
    const [exampleImage, setExampleImage] = useState<File | Blob | null>(null)
    // image count
    const [imageCount, setImageCount] = useState<number>(1)
    // historydata
    const [historyData, setHistoryData] = useState<OrderResponse[]>([])
    // preview
    const [preview, setPrivew] = useState<OrderResponse | null>(null)

    // init interval ID
    const [intervalId, setIntervalId] = useState<any>(null)

    // 
    const [currentState, setCurrentState] = useState(3)

    // const { data: PaintingPrice, refetch } = useContractRead({
    //     abi: PaintingDeductionABI,
    //     address: '0xc4B9e7cf99e0C50Fee6890D55a3CC0F9E51a27F6',
    //     functionName: 'getPointPrice',
    //     args: []
    // })
    const initData = () => {

        // 初始化 数据
        setPaintingOrderId('')
        SetPaintingPrice('')
        setKeyBoard('')
        setCurrentStyles('0')
        setCurrentArtists('0')
        setExtensions(false)
        setStepCount(0)
        setGeneral(7.5)
        setRatio(0)
        setExampleImage(null)
        setImageCount(1)
    }



    const handleGeneration = async () => {
        // const formData = new FormData();
        // formData.append('key1', 'value1');
        // formData.append('key2', 'value2');

        const formData = new FormData()
        if (!keyBoard) return message.error('Key words is required !')
        formData.append('prompt', keyBoard)
        formData.append('style', currentStyles)
        formData.append('artist', currentArtists)
        formData.append('guidence_scale', general + '')
        formData.append('enable_face_enhance', extensions ? '1' : '0')
        formData.append('steps_mode', stepCount + '')
        formData.append('ratio', ratio + '')
        formData.append('painting_times', imageCount + '')
        if (exampleImage) {
            formData.append('source_image', exampleImage as Blob)
        }
        // Display the values
        for (const value of formData.values()) {
            console.log(value);
        }

        const { code, data, msg } = await postForm('/order/constructOrder', formData)
        if (code === SUCCESS_CODE) {
            setPaintingOrderId(data.order.order_id)
            SetPaintingPrice(data.order.price)
        }
        console.log('response', { code, data, msg })
    }

    const fetchHistory = async () => {
        // 初始化 数据
        initData()

        setHistoryLoading(true)
        const { code, data, msg } = await get('/order/historyOrders')
        if (code === SUCCESS_CODE) {
            const _data: OrderResponse[] = data
            setHistoryData(_data.reverse())

        }
        console.log('/order/historyOrders', data)
        setHistoryLoading(false)
    }


    const fetchConfig = async () => {
        setConfigLoading(true)
        const { code, data, msg } = await get('/painting/paintingOptions')
        if (code === SUCCESS_CODE) {
            const Data: PaintingOptions = data
            setArtistsList(Data.artists)
            setStylesList(Data.styles)
            // setEngines(Data.engines)

            setCurrentStyles(Data.styles[0].id)
            setCurrentArtists(Data.artists[0].id)
            // setCurrentEngines(Data.engines[0])
        }
        setConfigLoading(false)
    }

    const handleFileChange = (file: File) => {
        setExampleImage(file)
    }

    const checkOrderState = async () => {
        const { code, data, msg } = await get(`/order/${paintingOrderId}/state`)
        setCurrentState(data.state)
        if (data.state === 3) {
            fetchHistory()
        }
    }

    const contractCallBack = () => {
        fetchHistory()
        setCurrentState(0)
    }

    useEffect(() => {
        fetchConfig()
        fetchHistory()
        // checkOrderState('32')
        // refetch()
        // if (PaintingPrice) {
        //     SetPaintingPrice(ethers.utils.formatUnits(PaintingPrice as BigNumberish, 18))
        // }
        // console.log('price', ethers.utils.formatUnits(PaintingPrice as BigNumberish, 18))
    }, [])

    useEffect(() => {
        if (historyData.length && historyData[0].state === 3) {
            console.log('-=========', historyData[0])
            setPrivew(historyData[0])
        }
    }, [historyData])

    return <Fragment>
        {/* <ReactInterval callback={checkOrderState} timeout={3000} enabled={currentState !== 3} /> */}
        <div className={styles['production-container']} id={'production'}>
            <div className={styles['pruduction-setting']}>
                <AigcContentBox className={styles['keyboard']}>
                    <Title>{t("production.keyboard.title")}</Title>
                    <div className={styles['textarea-container']}>
                        <TextArea
                            showCount
                            maxLength={1000}
                            style={{ height: 140, resize: 'none' }}
                            bordered={false}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                console.log('Change:', e.target.value);
                                setKeyBoard(e.target.value)
                            }}
                            placeholder={`${t('production.keyboard.placeholder1') as string}
${t('production.keyboard.placeholder2') as string}`}
                        />
                    </div>
                    <div className={styles['keyword-tip']}>{t('production.keyboard.tips')}
                        <Tag>{t('production.keyboard.example1')}</Tag>
                        <Tag>{t('production.keyboard.example2')}</Tag>
                        <Tag>{t('production.keyboard.example3')}</Tag>
                    </div>
                </AigcContentBox>
                {/* <AigcContentBox className={styles['engines']}>
                    <Title>{t('production.engines.title')}</Title>
                    <div className={styles['setting-container']}>
                        {engines.map((item, index) => {
                            return <div className={styles['setting-item']} style={{ backgroundColor: currentEngines === item ? '#AEDF48' : '' }} onClick={() => setCurrentEngines(item)}>{item}</div>
                        })}
                    </div>
                </AigcContentBox> */}
                <AigcContentBox className={styles['styles']}>
                    <Title>{t("production.styles.title")}</Title>
                    <div className={styles['styles-list-control']}>
                        <div className={styles['styles-list']}>
                            {/* <div className={styles['styles-item']}>默认</div> */}
                            {stylesList.map((item, index) => {
                                return <div className={styles['styles-item']} style={{ backgroundImage: `url(${item.poster})` }} onClick={() => setCurrentStyles(item.id)} key={item.text}>
                                    <div className={`${styles['item-mark']} ${currentStyles === item.id ? styles['active'] : ''}`}>{t("production.config." + item.text)}</div>
                                </div>
                            })}
                        </div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['artists']}>
                    <Title>{t("production.artists.title")}</Title>
                    <div className={styles['artists-list-control']}>
                        <div className={styles['styles-list']}>
                            {/* <div className={styles['styles-item']}>默认</div> */}
                            {artistsList.map((item, index) => {
                                return <div className={styles['styles-item']} style={{ backgroundImage: `url(${item.poster})` }} onClick={() => setCurrentArtists(item.id)} key={item.text}>
                                    <div className={`${styles['item-mark']} ${currentArtists === item.id ? styles['active'] : ''}`}>{t("production.config." + item.text)}</div>
                                </div>
                            })}
                        </div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['extensions']}>
                    <Title>{t('production.extensions.title')}</Title>
                    <div className={styles['setting-container']}>
                        <div className={styles['setting-item']} style={{ backgroundColor: extensions ? '#AEDF48' : '' }} onClick={() => setExtensions(!extensions)}>{t("production.extensions.item1")}</div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['step-count']}>
                    <Title>{t('production.steocount.title')}</Title>
                    <div className={styles['setting-container']}>
                        {stepCountList.map((item, index) => {
                            return <div className={styles['setting-item']} style={{ backgroundColor: stepCount === item.key ? '#AEDF48' : '' }} key={item.key + 'step'} onClick={() => setStepCount(item.key)}>{item.label}</div>
                        })}
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['general-settings']}>
                    <Title>{t('production.generalsettings.title')}</Title>
                    <div className={styles['input-container']}>
                        <label htmlFor="input-setting">
                            <span>{t('production.generalsettings.label')}</span>
                            <InputNumber
                                controls={false}
                                max={25}
                                min={0}
                                className={styles['general-input']}
                                id="input-settting"
                                placeholder={t('production.generalsettings.placeholder') as string}
                                onChange={(e) => setGeneral(e as number)}
                            />
                        </label>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['generation-ratio']}>
                    <Title>{t("production.generationratio.title")}</Title>
                    <div className={styles['ratio-container']}>
                        <div className={styles['ratio-list']}>
                            {ratioList.map((item, index) => {
                                return <div key={index + 'ratio'} className={styles['ratio-item']} style={{
                                    backgroundImage: `url(${ratio === index ? item.active : item.normal})`
                                }} onClick={() => setRatio(index)}></div>
                            })}
                        </div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['reference-image']}>
                    <Title>{t('production.referenceimage.title')}</Title>
                    <UpLoad onChange={handleFileChange} />
                </AigcContentBox>
                <AigcContentBox className={styles['drawings-count']}>
                    <Title>{t('production.drawingscount.title')}</Title>
                    <div className={styles['setting-container']}>
                        <div className={styles['left']} onClick={() => {
                            if (imageCount <= 1) return
                            setImageCount(imageCount - 1)
                        }}><span>{'<'}</span></div>
                        <div className={styles['center']}>{imageCount}</div>
                        <div className={styles['right']} onClick={() => {
                            if (imageCount >= 10) return;
                            setImageCount(imageCount + 1)
                        }}><span>{'>'}</span></div>
                    </div>
                </AigcContentBox>
                <div className={styles['generation']}>
                    <div className={styles['generation-button']} onClick={handleGeneration}>{t('production.generatenow')}</div>
                    {paintingOrderId && paintingPrice && <GenerationButton orderId={paintingOrderId} price={paintingPrice} callback={contractCallBack} />}
                </div>
            </div>
            <div className={styles['production-preview']}>
                <AigcContentBox disableIcon className={styles['preview-container']}>
                    <div className={styles['preview-img']} style={{
                        backgroundImage: `url(${preview?.result_image})`
                    }}>{preview?.state !== 3 && OrderState[preview?.state as 0 | 1 | 2 | 3 | 4]}</div>
                    <div className={styles['special-text']}>
                        {BottomText(t('production.preview.title'), 1)}
                    </div>
                </AigcContentBox>
                <AigcContentBox disableIcon className={styles['history-container']}>
                    <div className={styles['history-conttol']}>
                        <div className={styles['history']}>
                            {historyData.map((item) => {
                                return <div className={styles['history-item'] + ' ' + (item === preview ? styles['active'] : '')} key={item.order_id} onClick={() => setPrivew(item)} style={{
                                    backgroundImage: `url(${item.result_image})`
                                }}>{item.state !== 3 && OrderState[item.state as 0 | 1 | 2 | 3 | 4]}</div>
                            })}
                        </div>
                    </div>
                    <div className={styles['special-text']}>
                        {BottomText(t('production.history.title'), 0)}
                    </div>
                </AigcContentBox>
            </div>
        </div>
    </Fragment>
}

export default Production