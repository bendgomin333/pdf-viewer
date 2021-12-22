import { useContext } from 'react'
import styles from './styles.module.scss'
import { BufferContext, clearBuffer, BufferItem } from '.';

export const BufferArea = () => {
    const bufferCtx = useContext(BufferContext)

    return (
        <div className={styles.bufferArea}>
            <button className={styles.clearBtn} onClick={() => clearBuffer(bufferCtx)}>Очистить буфер</button>
            {bufferCtx.buffer.map((elem, index) => {
                if (index === bufferCtx.buffer.length - 1) {
                    return <div className={styles.newBuffer}>
                        <BufferItem id={elem.id} key={elem.id} />
                    </div>
                }
                return <BufferItem id={elem.id} key={elem.id} />
            }).reverse()}
        </div>
    )
}