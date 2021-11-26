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
	const product = new Product(req.body)
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

}