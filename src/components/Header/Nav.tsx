import styles from '@/styles/Layout.module.less'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


const NavBar = ()=>{
    const {t} = useTranslation()
    return <div className={styles['nav-container']}>
        <ul className={styles['nav-list']}>
            <li className={styles['active']}>
                <Link to="/">{t('layout.head.home')}</Link>
                <Link to="/example">{'Example'}</Link>
            </li>
        </ul>
    </div>
}

export default NavBar