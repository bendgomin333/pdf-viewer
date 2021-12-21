import React from "react"

export type buffer = {
    id: string,
    text: string
}

export type bufferCtx = {
    buffer: buffer[],
    setBuffer: React.Dispatch<React.SetStateAction<buffer[]>>
}

export const BufferContext = React.createContext<bufferCtx>({ buffer: [], setBuffer: () => [] })

export const addBufferElem = (ctx: bufferCtx, text: string) => {
    ctx.setBuffer([
        ...ctx.buffer,
        {
            id: Math.floor(Math.random() * 100000) + '',
            text
        }
    ])
}

export const delBufferItemById = (ctx: bufferCtx, id: string) => {
    const res = [...ctx.buffer]
    const index = res.findIndex(elem => elem.id === id)
    if (index < 0) return
    res.splice(index, 1)
    ctx.setBuffer(res)
}

export const clearBuffer = (ctx: bufferCtx) => {
    ctx.setBuffer([])
}