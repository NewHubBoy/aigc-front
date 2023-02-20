import styles from '@/styles/common.module.less'


const Title:React.FC<React.PropsWithChildren<{children:React.ReactNode}>> = ({children})=>{
    return <div className={styles['box-title']}>{children}</div>
}

export default Title