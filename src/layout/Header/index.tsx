import styles from '@/styles/Layout.module.less'
import NavBar from '../../components/Header/Nav'

const Header = ()=>{
    return <div className={styles['header-container']}>
        <span className={styles['logo']}>AIGC</span>
        <NavBar/>
    </div>
}

export default Header