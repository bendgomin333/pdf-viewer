import { useContext } from "react";
import { BufferContext, delBufferItemById } from "./model";
import styles from "./styles.module.scss";

export const BufferItem = ({ id }: { id: string }) => {
    const ctx = useContext(BufferContext)

    const buffer = ctx.buffer.find(elem => elem.id === id)

    return (<>
        <div className={styles.bufferItem}>
            {buffer?.text}
            <button className={styles.delBtn} onClick={() => delBufferItemById(ctx, buffer!.id)}></button>      
        </div>
    </>
    );
};