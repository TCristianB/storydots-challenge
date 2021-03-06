const express = require('express')
import { Request, Response } from 'express'
const path = require('path')
const productsRouter = require('./routes/products.routes')
const usersRouter = require('./routes/users.routes')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
require('./db/mongoose')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, "../client/build")))
	app.get('*', (req: Request, res: Response) => {
		res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
	})
}

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))