const User = require('../models/User')
import { Request, Response } from 'express'

export const getUser = async (req: Request, res: Response) => {
	try {
		const users = await User.find({})
		res.status(200).send(users)
	} catch (e) {
		console.log(e)
	}
}

export const createUser = async (req: Request, res: Response) => {
	const user = new User(req.body)
	try {
		const token = await user.generateAuthToken()
		await user.save()
		res.status(201).cookie('jwt', token, { httpOnly: true }).cookie('isLogged', true).send({ id: user._id, name: user.name })
	} catch (e) {
		res.status(400).send(e)
	}
}

export const loginUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('isLogged', true).send({ id: user._id, name: user.name, email: user.email })
	} catch (e) {
		res.status(500).send(e)
	}
}


export const logoutUser = async (req: Request, res: Response) => {
	interface tokenInterface {
		token: string
	}
	try {
		req.user.tokens = req.user.tokens.filter((token: tokenInterface) => {
			return token.token !== req.token
		})
		await req.user.save()
		res.status(200).clearCookie('isLogged').clearCookie('jwt').send()
	} catch (e) {
		res.status(500).send(e)
	}
}

export const getUserById = async (req: Request, res: Response) => {
	const _id = req.params.id

	try {
		const user = await User.findById(_id)
		if (!user) {
			throw new Error()
		}
		res.status(200).send(user)
	} catch (e) {
		res.status(500).send(e)
	}
}

export const getMe = async (req: Request, res: Response) => {
	try {
		res.status(200).send(req.user)
	} catch (e) {
		res.status(500).send(e)
	}
}

export const updateMe = async (req: Request, res: Response) => {
	const updates = Object.keys(req.body)
	console.log(updates)
	const allowedUpdates = ['firstName', 'lastName', 'email']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		updates.forEach((update) => {
			req.user[update] = req.body[update]
		})

		await req.user.save()

		res.status(200).send(req.user)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

export const getCurrentUserProducts = async (req: Request, res: Response) => {
	try {
        await req.user.populate('products')
        res.send(req.user.products)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const updateUser = async (req: Request, res: Response) => {
	const _id = req.params.id

	const updates = Object.keys(req.body)
	const allowedUpdates = ['firstName', 'lastName', 'password']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({
			error: 'Invalid Updates!'
		})
	}

	try {
		const user = await User.findById(_id)

		if (!user) {
			return res.status(404).send()
		}

		updates.forEach((update) => {
			user[update] = req.body[update]
		})

		await user.save()

		res.status(200).send(user)
	} catch (e) {
		res.status(400).send(e)
	}
}