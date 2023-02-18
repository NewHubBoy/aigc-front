import styles from '@/styles/Layout.module.less'
import { Fragment, PropsWithChildren, ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout: React.FC<PropsWithChildren<{ children: ReactNode }>> = ({ children }) => {
    return <Fragment>
        <Header />
        {children}
        <Footer/>
    </Fragment>
}

export default Layout