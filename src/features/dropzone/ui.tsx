import { DropzoneContext } from 'pages/pdf-viewer';
import { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss'

export const Dropzone = () => {
    const dropzoneCtx = useContext(DropzoneContext)

    const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
        maxFiles: 1,
        noClick: true,
        noKeyboard: true,
        accept: 'application/pdf',
        onDropAccepted(files) {
            dropzoneCtx.setPdfFile(files[0])
        }
    });

    return (
        <div className={styles.dropzoneWrapper}>
            <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} />
                <p>Перетащите pdf-файл или нажмите на кнопку ниже</p>
                <button type="button" onClick={open}>
                    Открыть
                </button>
            </div>
        </div>
    )
}