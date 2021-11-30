"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var productsRouter = require('./routes/products.routes');
var usersRouter = require('./routes/users.routes');
var cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('./db/mongoose');
var app = express();
var PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.listen(PORT, function () { return console.log("Server is running on PORT ".concat(PORT)); });
