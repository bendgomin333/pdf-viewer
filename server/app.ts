import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
const { createWorker } = require('tesseract.js');

const worker = createWorker({
    logger: (m: any) => console.log(m)
});
const initWorker = async () => {
    await worker.load();
    await worker.loadLanguage('rus');
    await worker.initialize('rus');
}


const app = express()

// app.use(bodyParser.json())

app.get('/getPdf', (req, res) => {
    res.sendFile(path.resolve(__dirname, '123.pdf'))
})

app.post('/recognize', bodyParser.raw({ type: 'application/json', limit: '500kb' }), (req, res) => {
    (async () => {
        const { data: { text } } = await worker.recognize(req.body.toString());
        // await worker.terminate();
        res.send(text)
    })();
})

app.listen(3001, async () => {
    await initWorker()
    console.log('Server has been started at port 3001')
})