const Product = require('../models/Products')
import { Request, Response } from 'express'

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find({})

		res.status(200).send(products)
	} catch (e) {
		res.status(400).send(e)
	}
}


export const createProducts = async (req: Request, res: Response) => {
	const product = new Product({
		...req.body,
		owner: req.user._id
	})

	try {
		await product.save()
		res.status(201).send(product)
	} catch (e) {
		res.status(400).send(e)
	}
}

export const getProductsById = async (req: Request, res: Response) => {
	const _id = req.params.id
	try {
		const product = await Product.findOne({ _id })

		if (!product) {
			res.status(404).send()
		}

		res.status(200).send(product)
	} catch (e) {
		res.status(500).send(e)
	}

}

export const updateProductsById = async (req: Request, res: Response) => {
	const _id = req.params.id

	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'description', 'image_url', 'price']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		const product = await Product.findOne({ _id, owner: req.user._id })

		if (!product) {
			return res.status(404).send()
		}
		updates.forEach((update) => {
			product[update] = req.body[update]
		})

		await product.save()

		res.status(200).send(product)
	} catch (e) {
		res.status(500).send(e)
	}

}

export const deleteProduct = async (req: Request, res: Response) => {
	const _id = req.params.id

	try {
		const product = await Product.findOneAndDelete({ _id, owner: req.user._id })
		if (!product) {
			return res.status(404).send()
		}

		res.status(200).send(product)
	} catch (e) {
		res.status(500).send(e)
	}
}