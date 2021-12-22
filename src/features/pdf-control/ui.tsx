import { DropzoneContext, PdfControlContext } from "pages/pdf-viewer"
import { useContext, useEffect, useRef, useState } from "react"
import styles from './styles.module.scss'
import arrow from '../../static/icons/arrow.svg'
import zoomIn from '../../static/icons/zoom-in.svg'
import zoomOut from '../../static/icons/zoom-out.svg'

export const PdfControl = () => {
    const { numPages, pageNumber, scale } = useContext(PdfControlContext)
    const { pdfFile, setPdfFile } = useContext(DropzoneContext)
    const [inputValue, setInputValue] = useState(`${pageNumber.value}`)

    useEffect(() => {
        setInputValue(`${pageNumber.value}`)
    }, [pageNumber.value])

    const inputRef = useRef<HTMLInputElement>(null)

    const nextPage = () => {
        console.log(numPages.value)
        if (pageNumber.value >= 1 && pageNumber.value < numPages.value) {
            pageNumber.set(pageNumber.value + 1)
        }
    }

    const prevPage = () => {
        if (pageNumber.value > 1 && pageNumber.value <= numPages.value) {
            pageNumber.set(pageNumber.value - 1)
        }
    }

    return (
        pdfFile ?
            <div className={styles.pdfControl}>
                <button onClick={() => scale.set(scale.value - 0.5)}>
                    <img src={zoomOut} alt="" />
                </button>
                <button className={styles.prevPageBtn} onClick={prevPage}>
                    <img src={arrow} alt="" />
                </button>

                {pageNumber.value}/{numPages.value}

                <button className={styles.nextPageBtn} onClick={nextPage}>
                    <img src={arrow} alt="" />
                </button>
                <button onClick={() => scale.set(scale.value + 0.5)}>
                    <img src={zoomIn} alt="" />
                </button>
                <button className={styles.closeBtn} onClick={() => setPdfFile(undefined)}>
                    Закрыть PDF
                </button>
            </div>
            : null
    )
}