export const getImageURLFromTarget = (canvas: HTMLCanvasElement, { x, y, w, h, quality = 0.8 }: { x: number, y: number, w: number, h: number, quality?: number }) => {
    const ctx = canvas.getContext('2d')
    if (w === 0 || h === 0) throw new Error('Width or height is 0')
    const screen = ctx?.getImageData(x, y, w, h)
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    tempCanvas.width = screen!.width
    tempCanvas.height = screen!.height
    tempCtx!.putImageData(screen!, 0, 0)
    return tempCanvas.toDataURL('image/jpeg', quality)
}

export const recognize = async (img: string) => {
    const data = await fetch('https://pdf-recognize.herokuapp.com/recognize', {
        method: 'POST', body: JSON.stringify(img), headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200) throw new Error('Fetch goes wrong, for details look at network status')
        return (res.text())
    })
    return data
}