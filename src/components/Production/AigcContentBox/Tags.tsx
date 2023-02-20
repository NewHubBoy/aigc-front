import styles from '@/styles/common.module.less'


const Tag: React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({ children }) => {
    return <div className={styles['keyword-tag']}>{children}</div>
}

export default Tag