import express from 'express'
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'
import ErrorHandler from './utils/ErrorHandler'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json("server is working")
})
app.use('/books', booksRouter)

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`🚀 Example app listening at http://localhost:${port}`)
})
