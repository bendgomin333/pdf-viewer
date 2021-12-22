import styles from './styles.module.scss'

export const LoaderSpinner = () => {
    return (
        <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    )
}