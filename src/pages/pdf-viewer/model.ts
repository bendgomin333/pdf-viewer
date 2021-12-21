import React from "react";

type controlCtx = {
    pageNumber: {
        value: number,
        set: React.Dispatch<React.SetStateAction<number>>
    },
    numPages: {
        value: number,
        set: React.Dispatch<React.SetStateAction<number>>
    },
    scale: {
        value: number,
        set: React.Dispatch<React.SetStateAction<number>>
    }
}

export const PdfControlContext = React.createContext<controlCtx>({
    pageNumber: {
        value: 1,
        set: () => { }
    },
    scale: {
        value: 1,
        set: () => { }
    },
    numPages: {
        value: 1,
        set: () => { }
    }
})

type dropzoneCtx = {
    pdfFile: File | undefined,
    setPdfFile: React.Dispatch<React.SetStateAction<File | undefined>>
}
export const DropzoneContext = React.createContext<dropzoneCtx>({ pdfFile: undefined, setPdfFile: () => { } })