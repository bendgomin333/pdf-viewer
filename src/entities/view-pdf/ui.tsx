import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import { Recognizer } from 'features/pdf-recognizer';
import { DropzoneContext, PdfControlContext } from 'pages/pdf-viewer';
import { Dropzone } from 'features/dropzone';


export const ViewArea = () => {
    const [isLoading, setLoading] = useState(true)
    const [isRendered, setRendering] = useState(false)

    const { pageNumber, scale, numPages } = useContext(PdfControlContext)

    const dropzoneCtx = useContext(DropzoneContext)


    useEffect(() => {
        if (!isRendered) return
        if (isLoading) return

        const canvas = document.querySelector<HTMLCanvasElement>(`.react-pdf__Page__canvas`)
        if (!canvas) return

        const page = canvas.parentElement as HTMLDivElement

        if (canvas.offsetHeight > page.clientHeight) {
            page.style.overflowY = 'scroll'
        } else {
            page.style.overflowY = 'hidden'
        }

        if (canvas.offsetWidth > page.clientWidth) {
            page.style.overflowX = 'scroll'
        } else {
            page.style.overflowX = 'hidden'
        }

    }, [isLoading, scale, isRendered])

    const onDocumentLoadSuccess = (payload: any) => {
        numPages.set(payload.numPages)
    }

    return (
        dropzoneCtx.pdfFile ?
            <div className={styles.viewerArea}>
                <Document
                    className={styles.document}
                    file={dropzoneCtx.pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        onRenderSuccess={() => setRendering(true)}
                        onLoadSuccess={() => setLoading(false)}
                        className={styles.page}
                        pageNumber={pageNumber.value}
                        scale={scale.value}>
                        <Recognizer />
                    </Page>

                </Document>
                {/* {pageNumber}/{other.numPages.value} */}
            </div >
            : <Dropzone />
    )
}