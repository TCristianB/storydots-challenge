import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')
const User = require('../models/User')

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwt
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
		if (!user) {
			throw new Error('Please authenticate.')
		}

		req.token = token
		req.user = user
		next()
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate.' })
	}
}