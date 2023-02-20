import styles from '@/styles/Production.module.less'
import { Fragment } from 'react'

const BottomText = (str: string, type = 1) => {
    const reg = /[\u4e00-\u9fa5]/
    if (reg.test(str)) {
        const _str = str.split('')
        return <Fragment>
            <div className={type === 1 ? styles['special-point'] : styles['special-point1']} />
            {_str.map((item, index) => {
                return <Fragment key={index + 'special'}>
                    {item}
                    <div className={type === 1 ? styles['special-point'] : styles['special-point1']} />
                </Fragment>
            })}
        </Fragment>
    } else {
        return <Fragment>
            <div className={type === 1 ? styles['special-point'] : styles['special-point1']} />
            {str}
            <div className={type === 1 ? styles['special-point'] : styles['special-point1']} />
        </Fragment>
    }
}

export default BottomText