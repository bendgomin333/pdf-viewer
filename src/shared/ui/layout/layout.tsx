import { Header } from 'features/header'
import styles from './styles.module.scss'

type props = {
    children: JSX.Element
}

export const Layout = ({ children }: props) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <footer className={styles.footer}>
                FOOTER
            </footer>
        </>
    )
}