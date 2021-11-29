import mongoose, { Schema, model } from 'mongoose'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

export interface UserInterface extends mongoose.Document {
	firstName: string
	lastName: string
	email: string
	password?: string
	tokens?: Array<TokenInterface>
}

interface TokenInterface {
	token: string;
}

const userSchema: Schema<UserInterface> = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		requred: true,
		trim: true
	},
	email: {
		type: String,
		requred: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
})

userSchema.virtual('products', {
	ref: 'Product',
	localField: '_id',
	foreignField: 'owner'
})


userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET as string)

	user.tokens = user.tokens?.concat({ token })
	await user.save()

	return token
}

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

userSchema.statics.findByCredentials = async function (email, password) {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password as string)

	if (!isMatch) {
		throw new Error('Unable to login')
	}

	return user
}

userSchema.pre('save', async function (next) {
	const user = this

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password as string, 8)
	}

	next()
})

const User = model('User', userSchema)

module.exports = User