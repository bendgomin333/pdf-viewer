import { useContext } from 'react'
import styles from './styles.module.scss'
import { BufferContext } from '../../pages/pdf-viewer/ui';

export const BufferArea = () => {
    const [buffer, setBuffer] = useContext(BufferContext)

    console.log(buffer)
    return (
        <div className={styles.bufferArea}>
            BUFFER
            {buffer}
        </div>
    )
}