import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import Notification from '../../components/Notification'

import './Auth.css'

const schema = yup.object().shape({
	email: yup.string().email().required('Email is a required field'),
	password: yup.string().required('Password is a required field'),
})

const Login = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})
	const history = useHistory()

	const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated') || 'false')

	interface userObject {
		email: string;
		password: string;
	}

	const submitForm = async (data: userObject) => {
		try {
			await axios.post('/api/users/login', data, { withCredentials: true })
				.then((res) => {
					// Sending the user data to localStorage
					window.localStorage.setItem('User', res.data.name)
					window.localStorage.setItem('UserId', res.data.id)
					window.localStorage.setItem('isAuthenticated', JSON.stringify(true))
				})
			history.push('/home')
		} catch (e) {
			setErrorMessage('Email or password incorrect')
			setTimeout(() => {
				setErrorMessage('')
			}, 5000)
		}
	}

	if (isAuthenticated) {
		return <Redirect to="/home" />
	}

	return (
		<div className="Auth">
			<div className="Auth__container">
				{errorMessage && <Notification message={errorMessage} />}
				<h3 className="Auth__container--title">Login</h3>
				<form className="form__container" onSubmit={handleSubmit(submitForm)}>
					<div className="form-group">
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
					<button className="btn btn-primary mt-3 mb-2">Login</button>
					<p className="main__form--redirect">Do you not have an account? <Link to="/register">Register</Link></p>
				</form>
			</div>
		</div>
	)
}

export default Login