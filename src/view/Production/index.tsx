import styles from "@/styles/Production.module.less"
import { Input, InputNumber } from "antd"
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import AigcContentBox from "../../components/AigcContentBox"
import Tag from "../../components/AigcContentBox/Tags"
import Title from "../../components/AigcContentBox/Title"
import { ratioList } from '../../context/config/productionConfig'

// ratio
import normal1_1 from '../../assets/Images/production/1-1normal.png'
import normal3_4 from '../../assets/Images/production/3-4normal.png'
import normal4_3 from '../../assets/Images/production/4-3normal.png'
import normal9_16 from '../../assets/Images/production/9-16normal.png'
import normal16_9 from '../../assets/Images/production/16-9normal.png'
import { use } from "i18next"
import { get, post } from "../../utils/request"
import { Artists, Engines, PaintingOptions, Styles } from "../../type"
import { SUCCESS_CODE } from "../../context/config/httpStatus"



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


    const [keyBoard, setKeyBoard] = useState('')
    // styles data
    const [stylesList, setStylesList] = useState<Styles[]>([])
    // artists data
    const [artistsList, setArtistsList] = useState<Artists[]>([])
    // Engines
    // const [engines, setEngines] = useState<Engines[]>([])
    const [configLoading, setConfigLoading] = useState<boolean>(false)
    // const [currentEngines, setCurrentEngines] = useState<Engines>('通用')
    const [currentStyles, setCurrentStyles] = useState<string>('不限定')
    const [currentArtists, setCurrentArtists] = useState<string>('不限定')
    const [extensions, setExtensions] = useState<boolean>(false)
    const [stepCount, setStepCount] = useState<any>(0)
    const [general, setGeneral] = useState<number>(0)
    const [ratio, setRatio] = useState<number>(0)

    const fetchConfig = async () => {
        setConfigLoading(true)
        const { code, data, msg } = await get('/painting/paintingOptions')
        if (code === SUCCESS_CODE) {
            const Data: PaintingOptions = data
            setArtistsList(Data.artists)
            setStylesList(Data.styles)
            // setEngines(Data.engines)

            setCurrentStyles(Data.styles[0].text)
            setCurrentArtists(Data.artists[0].text)
            // setCurrentEngines(Data.engines[0])
        }
        setConfigLoading(false)
    }

    useEffect(() => {
        fetchConfig()
    }, [])

    return <Fragment>
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
                                return <div className={styles['styles-item']} style={{ backgroundImage: `url(${item.poster})` }} onClick={() => setCurrentStyles(item.text)} key={item.text}>
                                    <div className={`${styles['item-mark']} ${currentStyles === item.text ? styles['active'] : ''}`}>{item.text}</div>
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
                                return <div className={styles['styles-item']} style={{ backgroundImage: `url(${item.poster})` }} onClick={() => setCurrentArtists(item.text)} key={item.text}>
                                    <div className={`${styles['item-mark']} ${currentArtists === item.text ? styles['active'] : ''}`}>{item.text}</div>
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
                                }} onClick={()=>setRatio(index)}></div>
                            })}
                        </div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['reference-image']}>
                    <Title>{t('production.referenceimage.title')}</Title>
                    <div className={styles['upload-container']}>+</div>
                </AigcContentBox>
                <AigcContentBox className={styles['drawings-count']}>
                    <Title>{t('production.drawingscount.title')}</Title>
                    <div className={styles['setting-container']}>
                        <div className={styles['left']}>{'<'}</div>
                        <div className={styles['center']}>6</div>
                        <div className={styles['right']}>{'>'}</div>
                    </div>
                </AigcContentBox>
                <div className={styles['generation']}>
                    <div className={styles['generation-button']}>立即生成</div>
                </div>
            </div>
            <div className={styles['production-preview']}>
                <AigcContentBox disableIcon className={styles['preview-container']}>
                    <div className={styles['preview-img']}></div>
                    <div className={styles['special-text']}>
                        <div className={styles['special-point']} />
                        生
                        <div className={styles['special-point']} />
                        成
                        <div className={styles['special-point']} />
                        预
                        <div className={styles['special-point']} />
                        览
                        <div className={styles['special-point']} />
                    </div>
                </AigcContentBox>
                <AigcContentBox disableIcon className={styles['history-container']}>
                    <div className={styles['history-conttol']}>
                        <div className={styles['history']}>
                            <div className={styles['history-item']}></div>
                            <div className={styles['history-item']}></div>
                            <div className={styles['history-item']}></div>
                            <div className={styles['history-item']}></div>
                            <div className={styles['history-item']}></div>
                        </div>
                    </div>
                    <div className={styles['special-text']}>
                        <div className={styles['special-point1']} />
                        历
                        <div className={styles['special-point1']} />
                        史
                        <div className={styles['special-point1']} />
                        生
                        <div className={styles['special-point1']} />
                        成
                        <div className={styles['special-point1']} />
                    </div>
                </AigcContentBox>
            </div>
        </div>
    </Fragment>
}

export default Production