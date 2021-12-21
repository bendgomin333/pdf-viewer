import { PdfControl } from 'features/pdf-control'
import styles from './styles.module.scss'

export const Header = () => {
    return (
        <header id={styles.header}>
            <PdfControl />
        </header>
    )
}