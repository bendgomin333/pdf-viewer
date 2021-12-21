import { BufferArea } from "entities/buffer";
import { buffer, BufferContext, bufferCtx } from "entities/buffer/model";
import { ViewArea } from "entities/view-pdf";
import { Dropzone } from "features/dropzone/ui";
import React, { useState } from "react";
import { Layout } from "shared/ui/layout";
import { DropzoneContext, PdfControlContext } from "./model";
import styles from './styles.module.scss'


export default function PdfViewer() {
    const [buffer, setBuffer] = useState<buffer[]>([])
    const [numPages, setNumPages] = useState(1)
    const [scale, setScale] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [pdfFile, setPdfFile] = useState<File | undefined>(undefined)


    return (
        <div className={styles.wrapper}>
            <DropzoneContext.Provider value={{ pdfFile, setPdfFile }}>
                <PdfControlContext.Provider value={{
                    numPages: { value: numPages, set: setNumPages },
                    scale: { value: scale, set: setScale },
                    pageNumber: { value: pageNumber, set: setPageNumber }
                }}>
                    <Layout>
                        <div className={styles.viewer}>
                            <BufferContext.Provider value={{ buffer, setBuffer }}>
                                <BufferArea />
                                <ViewArea />
                            </BufferContext.Provider>
                        </div>
                    </Layout>
                </PdfControlContext.Provider>
            </DropzoneContext.Provider>
        </div >
    )
}