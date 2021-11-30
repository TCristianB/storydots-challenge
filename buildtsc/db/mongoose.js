"use strict";
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(function () { return console.log('db connected'); });
