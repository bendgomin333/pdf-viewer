import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Document, Page } from 'react-pdf/dist/umd/entry.webpack';
import { Recognizer } from 'features/pdf-recognizer/ui';


export const ViewArea = () => {
    const [isLoading, setLoading] = useState(true)
    const [isRendered, setRendering] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [numPages, setNumPages] = useState(1)
    const [scale, setScale] = useState(2)


    //CONTROL COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const nextPage = () => {
        if (pageNumber >= 1 && pageNumber < numPages) {
            setPageNumber(pageNumber + 1)
        }
    }

    const prevPage = () => {
        if (pageNumber > 1 && pageNumber <= numPages) {
            setPageNumber(pageNumber - 1)
        }
    }
    //CONTROL COMPONENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    useEffect(() => {
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

        if (!isRendered) return
    }, [isLoading, scale, isRendered])

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    return (
        <div className={styles.viewerArea}>
            <Document
                className={styles.document}
                file={'/getPdf'}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page onRenderSuccess={() => setRendering(true)} onLoadSuccess={() => setLoading(false)} className={styles.page} pageNumber={pageNumber} scale={scale}>
                    <Recognizer />
                </Page>

            </Document>
            {pageNumber}/{numPages}
            <button onClick={() => setScale(scale + 0.5)}>+</button>
            <button onClick={() => setScale(scale - 0.5)}>-</button>
            <button onClick={() => nextPage()}>NEX PAGE</button>
            <button onClick={() => prevPage()}>PREV PAGE</button>
        </div >
    )
}