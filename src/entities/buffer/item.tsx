import { useContext } from "react";
import styles from "./styles.module.scss";
import copy from '../../static/icons/copy.svg'
import { BufferContext, delBufferItemById } from ".";

export const BufferItem = ({ id }: { id: string }) => {
    const ctx = useContext(BufferContext)

    const buffer = ctx.buffer.find(elem => elem.id === id)


    return (
        buffer ?
            <div className={styles.bufferItem}>
                <button className={styles.copyBtn} onClick={async () => {
                    const data = await navigator.clipboard.writeText(buffer.text)
                }}>
                    <img src={copy} alt="" />
                </button>
                {buffer.text}
                <button className={styles.delBtn} onClick={() => delBufferItemById(ctx, buffer.id)}></button>
            </div>
            : null
    );
};