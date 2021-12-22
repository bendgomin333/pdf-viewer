import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { getImageURLFromTarget, recognize } from '.';
import { addBufferElem, BufferContext } from 'entities/buffer';
import { LoaderSpinner } from 'shared/ui/loader-spinner';

type props = {
    targetCanvas: HTMLCanvasElement
}

const clearCtx = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h)
}

export const Recognizer = () => {
    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(1)
    const [isRecognizing, setRecognizing] = useState(false)


    const bufferCtx = useContext(BufferContext)

    useEffect(() => {
        const canvas = document.querySelector<HTMLCanvasElement>(`.react-pdf__Page__canvas`)!
        const recognizer = document.querySelector<HTMLCanvasElement>(`.${styles.recognizer}`)!
        const ctx = recognizer.getContext('2d')!
        recognizer.style.height = canvas.height + 'px'
        recognizer.style.width = canvas.width + 'px'

        setWidth(canvas.scrollWidth)
        setHeight(canvas.scrollHeight)

        let isPressed = false
        let x: number, y: number
        recognizer.onmousedown = (e) => {
            x = e.offsetX
            y = e.offsetY
            isPressed = true

        }

        ctx.fillStyle = "rgba(180, 204, 255,0.5)"
        recognizer.onmousemove = (e) => {
            if (!isPressed) return
            clearCtx(ctx, width, height)
            ctx.fillRect(x, y, e.offsetX - x, e.offsetY - y)
        }

        recognizer.onmouseup = async (e) => {
            isPressed = false
            clearCtx(ctx, width, height)
            try {
                setRecognizing(true)
                const recognizedText = await recognize(getImageURLFromTarget(canvas, { x, y, w: e.offsetX - x, h: e.offsetY - y }))
                if (!recognizedText) return
                addBufferElem(bufferCtx, recognizedText)
                navigator.clipboard.writeText(recognizedText)
            } catch (err) {
                console.error(err)
            } finally {
                setRecognizing(false)
            }
        }
    })

    return (
        <>
            <canvas className={styles.recognizer} width={width} height={height} />
            {isRecognizing ?
                <div className={styles.preloader}>
                    <div className={styles.preloaderWrapper}>
                        <LoaderSpinner />
                    </div>
                </div>
                : null}
        </>
    )
}