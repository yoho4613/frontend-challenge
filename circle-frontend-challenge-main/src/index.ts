import express from 'express'
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'
import ErrorHandler from './utils/ErrorHandler'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.use('/books', booksRouter)

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/public/"))

    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"))
}

app.listen(port, () => {
    console.log(`🚀 Example app listening at http://localhost:${port}`)
})
