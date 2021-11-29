import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import Notification from '../../components/Notification'

const schema = yup.object().shape({
	firstName: yup.string().required('First name is a required field'),
	lastName: yup.string().required('Last name is a required field'),
	email: yup.string().email().required('Email is a required field'),
})

interface userInterface {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	__v: number;
}

interface userObject {
	firstName: string;
	lastName: string
	email: string;
}

const EditProfile = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const [me, setMe] = useState<userInterface>()
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})

	const isAuthenticated = window.localStorage.getItem('isAuthenticated')

	const history = useHistory()

	useEffect(() => {
		if(!isAuthenticated) {
			return history.push('/login')
		}
		axios.get('/api/users/me')
			.then(res => setMe(res.data))
	}, [history, isAuthenticated])

	const submitForm = async (data: userObject) => {
		console.log(data)
		try {
			await axios.patch('/api/users/me', data, { withCredentials: true })
				.then((res) => {
					window.localStorage.setItem('User', res.data.name)
					history.push('/profile')
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
		<div className="edit-profile">
			{me && (
				<div className="Auth">
				<div className="Auth__container">
					{errorMessage && <Notification message={errorMessage} />}
					<h2 className="Auth__container--title">Edit Profile</h2>
					<form className="form__container" onSubmit={handleSubmit(submitForm)}>
						<div className="form-group mt-3">
							<label htmlFor="name">First Name</label><br />
							<input
								className="form-control"
								id="firstName"
								type="text"
								defaultValue={me.firstName}
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
								defaultValue={me.lastName}
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
								defaultValue={me.email}
								{...register('email', { required: 'Required' })}
							/>
							{errors.email && <p className="text-danger">{errors.email.message}</p>}
						</div>
						<button className="btn btn-primary mt-3 mb-2">Update</button>
					</form>
				</div>
			</div>
			)}
		</div>
	)
}

export default EditProfile