import styles from "@/styles/Production.module.less"
import { Input, InputNumber } from "antd"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import AigcContentBox from "../../components/AigcContentBox"
import Tag from "../../components/AigcContentBox/Tags"
import Title from "../../components/AigcContentBox/Title"

// ratio
import normal1_1 from '../../assets/Images/production/1-1normal.png'
import normal3_4 from '../../assets/Images/production/3-4normal.png'
import normal4_3 from '../../assets/Images/production/4-3normal.png'
import normal9_16 from '../../assets/Images/production/9-16normal.png'
import normal16_9 from '../../assets/Images/production/16-9normal.png'


const { TextArea } = Input;

const Production = () => {
    const { t } = useTranslation()
    const [keyBoard, setKeyBoard] = useState('')

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
                <AigcContentBox className={styles['styles']}>
                    <Title>{t("production.styles.title")}</Title>
                    <div className={styles['styles-list-control']}>
                        <div className={styles['styles-list']}>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                        </div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['artists']}>
                    <Title>{t("production.artists.title")}</Title>
                    <div className={styles['artists-list-control']}>
                        <div className={styles['styles-list']}>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                            <div className={styles['styles-item']}></div>
                        </div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['extensions']}>
                    <Title>{t('production.extensions.title')}</Title>
                    <div className={styles['setting-container']}>
                        <div className={styles['setting-item']}>{t("production.extensions.item1")}</div>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['step-count']}>
                    <Title>{t('production.steocount.title')}</Title>
                    <div className={styles['setting-container']}>
                        <div className={styles['setting-item']}>{t('production.steocount.item1')}</div>
                        <div className={styles['setting-item']}>{t('production.steocount.item2')}</div>
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
                            />
                        </label>
                    </div>
                </AigcContentBox>
                <AigcContentBox className={styles['generation-ratio']}>
                    <Title>{t("production.generationratio.title")}</Title>
                    <div className={styles['ratio-container']}>
                        <div className={styles['ratio-list']}>
                            <div className={styles['ratio-item']} style={{
                                backgroundImage: `url(${normal1_1})`
                            }}></div>
                            <div className={styles['ratio-item']} style={{
                                backgroundImage: `url(${normal4_3})`
                            }}></div>
                            <div className={styles['ratio-item']} style={{
                                backgroundImage: `url(${normal3_4})`
                            }}></div>
                            <div className={styles['ratio-item']} style={{
                                backgroundImage: `url(${normal16_9})`
                            }}></div>
                            <div className={styles['ratio-item']} style={{
                                backgroundImage: `url(${normal9_16})`
                            }}></div>
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