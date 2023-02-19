import styles from '@/styles/Layout.module.less'
import { useTranslation } from 'react-i18next'
import NavBar from '../../components/Header/Nav'
import { useWeb3Modal } from '@web3modal/react'
import { useEffect } from 'react'

const Header = () => {
    const { t, i18n } = useTranslation()
    const { open } = useWeb3Modal()

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
            <button className={styles['connect-button']} onClick={() => open()}>{t('layout.head.connect_wallet')}</button>
        </div>
    </div>
}

export default Header