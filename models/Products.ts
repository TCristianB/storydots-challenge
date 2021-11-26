import mongoose, { Schema, model } from 'mongoose'

export interface ProductInterface extends mongoose.Document {
	name: string
	description: string
	image_url: string
	price: number
}

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required:  true,
		trim: true
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
})

const Product = model('Product', productSchema)

module.exports = Product