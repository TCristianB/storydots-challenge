const express = require('express')
const path = require('path')
const productsRouter = require('./routes/products.routes')
const usersRouter = require('./routes/users.routes')
require('./db/mongoose')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))