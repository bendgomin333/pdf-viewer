import { BufferArea } from "entities/buffer";
import { ViewArea } from "entities/view-pdf";
import React, { useState } from "react";
import { Layout } from "shared/ui/layout";
import styles from './styles.module.scss'

type bufferCtx = {
    buffer: string[],
    setBuffer: React.Dispatch<React.SetStateAction<string[]>>
}
export const BufferContext = React.createContext<bufferCtx>({ buffer: [], setBuffer: () => [' '] })

export default function PdfViewer() {
    const [buffer, setBuffer] = useState<string[]>([])

    return (
        <div className={styles.wrapper}>
            <Layout>
                <div className={styles.viewer}>
                    <BufferContext.Provider value={{ buffer, setBuffer }}>
                        <BufferArea />
                        <ViewArea />
                    </BufferContext.Provider>
                </div>
            </Layout>
        </div>
    )
}