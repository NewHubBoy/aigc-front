import styles from '@/styles/Production.module.less'
import { Fragment, PropsWithChildren, useEffect, useState } from 'react'

const UpLoad: React.FC<PropsWithChildren<{ onChange: (file: File) => void }>> = ({ onChange }) => {
    const [filesList, setFilesList] = useState<File[]>([])
    const [preview, setPreview] = useState<string | ArrayBuffer | null>('')
    // input onchange 
    const handleInputChange = (e: any) => {
        e.preventDefault()
        if (e.target.files[0]) {
            if (e.target.files[0].size > 1 * 1024 * 1024) {
                // 清空文件列表
                setFilesList([])
            } else {
                setFilesList([e.target.files[0]])
            }
        }
    }

    // 设置预览图片

    useEffect(() => {
        if (filesList.length > 0) {
            // 创建 FileReader 实例
            const fileRenderInstance = new FileReader();

            // 处理监听onload事件
            fileRenderInstance.onload = function (e) {
                const src = this.result;
                setPreview(src)
            }
            fileRenderInstance.readAsDataURL(filesList[0])
            // 返回数据给 父组件 管理
            onChange(filesList[0])
        } else {
            setPreview(null)
        }
    }, [filesList])
    return <Fragment>
        <input type="file" id='upload-image' onChange={handleInputChange} style={{
            position: 'absolute',
            opacity: 0
        }} />
        <label htmlFor="upload-image">
            <div className={styles['upload-container']}>
                {preview ?
                    <div className={styles['preview-content']}>
                        <div className={styles['preview-content']} style={{
                            backgroundImage:`url(${preview as string})`
                        }}></div>
                    </div> : '+'}
            </div>
        </label>
    </Fragment>
}

export default UpLoad

