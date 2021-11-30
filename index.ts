const express = require('express')
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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'))
}

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))