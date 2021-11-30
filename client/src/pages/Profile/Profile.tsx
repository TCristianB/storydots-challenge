import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Profile.css'

interface userInterface {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	__v: number;
}

interface productInterface {
	_id: string;
	name: string;
	description: string;
	image_url: string;
	price: number;
}


const Profile = () => {
	const [user, setUser] = useState<userInterface>()
	const [products, setProducts] = useState([])

	const isAuthenticated = window.localStorage.getItem('isAuthenticated')

	useEffect(() => {
		axios.get('/api/users/me')
			.then((res) => setUser(res.data))

		axios.get('/api/users/me/products/')
			.then((res) => setProducts(res.data))
	}, [])

	const deleteProduct = async (id: string) => {
		await axios.delete(`/api/products/${id}`)
			.then(() => {
				setProducts(products.filter((product: productInterface) => {
					return product._id !== id
				}))
			})
	}

	if (!isAuthenticated) {
		return <Redirect to="/login" />
	}

	return (
		<div className="Profile">
			{user && (
				<>
					<h2 className="Profile__title">My profile</h2>
					<div className="Profile__data">
						<p className="Profile__data--first-name"><strong>First Name:</strong> {user.firstName}</p>
						<p className="Profile__data--last-name"><strong>Last Name:</strong> {user.lastName}</p>
						<Link to="/profile/edit" className="btn btn-primary mt-3">Edit profile</Link>
					</div>
					<h3>My products</h3>
					<div className="Profile__my-products">
						{products.length > 0 ? products.map(product => {
							const { _id, name, image_url, price } = product
							return (
								<div key={_id} className="card mt-5">
									<img className="card-img-top" src={image_url} alt={name}></img>
									<div className="card-body">
										<Link to={`/products/${_id}`} className="card-title">{name} </Link>

										<p className="card__price"><span className="card__dolar">$</span>{price}</p>
										<Link className="btn btn-primary" to={`/products/${_id}/edit`}>Edit</Link>
										<button className="btn btn-danger delete-product" onClick={() => deleteProduct(_id)}>Delete</button>
									</div>
								</div>
							)

						}) : <p>You don't have products</p>}
					</div>
				</>
			)}
		</div>
	)
}

export default Profile