import styles from '@/styles/common.module.less'
import title_icon from '../../../assets/Images/common/title_bg.png'

const AigcContentBox: React.FC<React.PropsWithChildren<{ children: React.ReactNode, disableIcon?: boolean, className?: string }>> = ({ children, className, disableIcon }) => {
    return <div className={styles['aigc-content-box-container'] + " " + `${className ? className : ''}`}>
        {disableIcon ? null : <img src={title_icon} alt="title_icon" />}
        {children}
    </div>
}

export default AigcContentBox