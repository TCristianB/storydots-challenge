import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

import './CreateProduct.css'

const schema = yup.object().shape({
	name: yup.string().required('Name is a required field'),
	description: yup.string().required('Description is a required field'),
	image_url: yup.string().required('Image is a required field'),
	price: yup.number().required('Number is a required field')
})

const CreateProduct = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})
	const history = useHistory()

	const isAuthenticated = window.localStorage.getItem('isAuthenticated')

	interface productObject {
		name: string;
		description: string
		image: string;
		price: number;
	}

	const submitForm = (data: productObject) => {
		axios.post('/api/products/', data)
			.then(() => {
				history.push('/home')
			})
	}

	if (!isAuthenticated) {
		return <Redirect to="/login" />
	}

	return (
		<div className="create-product">
			<h2 className="create-product__title">Create a product</h2>
			<form className="create-product__form" onSubmit={handleSubmit(submitForm)}>
				<div className="form-group mt-3">
					<label>Name</label>
					<input 
					type="text" 
					className="form-control"
					autoComplete="off"
					{...register('name', { required: 'Required' })}
					/>
					{errors.name && <p className="text-danger">{errors.name.message}</p>}
				</div>
				<div className="form-group mt-3">
					<label>Description</label>
					<input 
					type="text" 
					className="form-control"
					autoComplete="off"
					{...register('description', { required: 'Required' })}
					/>
					{errors.description && <p className="text-danger">{errors.description.message}</p>}
				</div>
				<div className="form-group mt-3">
					<label>Image</label>
					<input 
					type="text" 
					className="form-control" 
					placeholder="Paste a url"
					autoComplete="off"
					{...register('image_url', { required: 'Required' })}
					/>
					{errors.image && <p className="text-danger">{errors.image.message}</p>}
				</div>
				<div className="form-group mt-3">
					<label>Price</label>
					<input 
					type="number" 
					className="form-control"
					autoComplete="off"
					{...register('price', { required: 'Required' })}
					/>
					{errors.price && <p className="text-danger">{errors.price.message}</p>}
				</div>
				<button type="submit" className="btn btn-primary mt-4">Create product</button>
			</form>
		</div>
	)
}

export default CreateProduct