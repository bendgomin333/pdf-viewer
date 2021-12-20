import { BufferArea } from "entities/buffer";
import { buffer, BufferContext, bufferCtx } from "entities/buffer/model";
import { ViewArea } from "entities/view-pdf";
import React, { useState } from "react";
import { Layout } from "shared/ui/layout";
import styles from './styles.module.scss'


export default function PdfViewer() {
    const [buffer, setBuffer] = useState<buffer[]>([])

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