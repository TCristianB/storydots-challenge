import React, { useState, useEffect } from 'react'
import { useHistory, Redirect, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object().shape({
	name: yup.string().required('Name is a required field'),
	description: yup.string().required('Description is a required field'),
	image_url: yup.string().required('Image is a required field'),
	price: yup.number().required('Number is a required field')
})

interface productInterface {
	_id: string;
	name: string;
	description: string;
	image_url: string;
	price: number;
}

interface productObject {
	name: string;
	description: string
	image: string;
	price: number;
}

const EditProduct = () => {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})
	const [product, setProduct] = useState<productInterface>()
	const history = useHistory()
	const params = useParams<{ id?: string }>()

	const isAuthenticated = window.localStorage.getItem('isAuthenticated')

	useEffect(() => {
		axios.get(`/api/products/${params.id}`)
			.then(res => setProduct(res.data))
	}, [params.id])

	const submitForm = (data: productObject) => {
		axios.patch(`/api/products/${params.id}`, data)
			.then(() => {
				history.push('/profile')
			})
	}

	if (!isAuthenticated) {
		return <Redirect to="/login" />
	}

	return (
		<div className="edit-product">
			<h2 className="edit-product__title">Update product</h2>
			{product && (
				<form className="edit-product__form" onSubmit={handleSubmit(submitForm)}>
					<div className="form-group mt-3">
						<label>Name</label>
						<input
							type="text"
							className="form-control"
							autoComplete="off"
							defaultValue={product.name}
							{...register('name', { required: 'Required' })}
						/>
						{errors.name && <p className="text-danger">{errors.name.message}</p>}
					</div>
					<div className="form-group mt-3">
						<label>Description</label>
						<textarea
							rows={10}
							cols={30}
							className="form-control"
							autoComplete="off"
							defaultValue={product.description}
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
							defaultValue={product.image_url}
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
							defaultValue={product.price}
							{...register('price', { required: 'Required' })}
						/>
						{errors.price && <p className="text-danger">{errors.price.message}</p>}
					</div>
					<button type="submit" className="btn btn-primary mt-4">Update product</button>
				</form>
			)}
		</div>
	)

}

export default EditProduct