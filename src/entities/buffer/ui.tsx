import { useContext } from 'react'
import styles from './styles.module.scss'
import { BufferItem } from './item';
import { BufferContext, clearBuffer } from './model';
import copy from '../../static/icons/copy.svg'

export const BufferArea = () => {
    const bufferCtx = useContext(BufferContext)

    return (
        <div className={styles.bufferArea}>
            <button className={styles.clearBtn} onClick={() => clearBuffer(bufferCtx)}>Очистить буфер</button>
            {bufferCtx.buffer.map(elem => {
                return <BufferItem id={elem.id} />
            })}
        </div>
    )
}