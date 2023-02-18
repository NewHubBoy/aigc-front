import styles from '@/styles/Layout.module.less'
import { Link } from 'react-router-dom'


const NavBar = ()=>{
    return <div className={styles['nav-container']}>
        <ul className={styles['nav-list']}>
            <li className={styles['active']}>
                <Link to="/">首页</Link>
            </li>
        </ul>
    </div>
}

export default NavBar