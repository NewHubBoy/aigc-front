import styles from '@/styles/Layout.module.less'
import { useTranslation } from 'react-i18next'
import NavBar from '../../components/Header/Nav'
import { useWeb3Modal } from '@web3modal/react'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { abbrAddress } from '../../utils'

import example_avatar from '../../assets/Images/common/avatar.png'

const Header = () => {
    const { t, i18n } = useTranslation()
    const { open } = useWeb3Modal()
    const { address } = useAccount()

    useEffect(() => {
        console.log(i18n)
    }, [])
    return <div className={styles['header-container']}>
        <div className={styles['nav-control']} >
            <span className={styles['logo']}>AIGC</span>
            <NavBar />
        </div>
        <div className={styles['wallet-control']}>
            <button className={styles['connect-button']} onClick={() => {
                i18n.language === 'zh' ? i18n.changeLanguage('en') : i18n.changeLanguage('zh')
            }}>{t('layout.head.language')}</button>
            <button className={styles['connect-button']} onClick={() => open()}>{address ? <><img src={example_avatar} alt="avatar" />{abbrAddress(address)}</> : t('layout.head.connect_wallet')}</button>
        </div>
    </div>
}

export default Header