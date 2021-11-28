import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'


import Notification from '../../components/Notification'

import './Auth.css'

const schema = yup.object().shape({
	firstName: yup.string().required('First name is a required field'),
	lastName: yup.string().required('Last name is a required field'),
	email: yup.string().email().required('Email is a required field'),
	password: yup.string().min(4).max(15).required('Password is a required field'),
})

const Register = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated') || '{}')
	const history = useHistory()

	interface userObject {
		firstName: string;
		lastName: string
		email: string;
		password: string;
	}

	const submitForm = async (data: userObject) => {
		try {
			await axios.post('/api/users', data, { withCredentials: true })
				.then((res) => {
					window.localStorage.setItem('User', res.data.name)
					window.localStorage.setItem('UserId', res.data.id)
					window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
					history.push('/home')
				})
		} catch (e: any) {
			if (e.response.status === 409) {
				setErrorMessage('Email already exists')
			} else {
				setErrorMessage('Bad request')
			}
			setTimeout(() => {
				setErrorMessage('')
			}, 5000)
		}
	}
	return (
		<div className="Auth">
			<div className="Auth__container">
				{errorMessage && <Notification message={errorMessage} />}
				<h2 className="Auth__container--title">Register</h2>
				<form className="form__container" onSubmit={handleSubmit(submitForm)}>
					<div className="form-group mt-3">
						<label htmlFor="name">First Name</label><br />
						<input
							className="form-control"
							id="name"
							type="text"
							{...register('firstName', { required: 'Required' })}
						/>
						{errors.name && <p className="text-danger">{errors.name.message}</p>}
					</div>
					<div className="form-group mt-3">
						<label htmlFor="lastName">Last name</label><br />
						<input
							className="form-control"
							id="lastName"
							type="text"
							{...register('lastName', { required: 'Required' })}
						/>
						{errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
					</div>
					<div className="form-group mt-3">
						<label htmlFor="email">Email</label><br />
						<input
							className="form-control"
							id="email"
							type="email"
							{...register('email', { required: 'Required' })}
						/>
						{errors.email && <p className="text-danger">{errors.email.message}</p>}
					</div>
					<div className="form-group mt-3">
						<label htmlFor="password">Password</label><br />
						<input
							className="form-control"
							id="password"
							type="password"
							{...register('password', { required: 'Required' })}
						/>
						{errors.password && <p className="text-danger">{errors.password.message}</p>}
					</div>
					<button className="btn btn-primary mt-3 mb-2">Register</button>
					<p className="main__form--redirect">Already register? <Link to="/login">Login</Link></p>
				</form>
			</div>
		</div>
	)
}

export default Register