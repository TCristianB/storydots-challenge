"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image_url: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
});
var Product = (0, mongoose_1.model)('Product', productSchema);
module.exports = Product;
