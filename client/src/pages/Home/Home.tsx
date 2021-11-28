import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Home.css'

const Home = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios.get('/api/products')
			.then((res) => {
				setProducts(res.data)
			})
	}, [])

	return (
		<div className="Home">
			<h1 className="mt-3">All products</h1>
			{products && products.map((product) => {
				const { _id, name, description, image_url, price } = product
				return (
					<div key={_id} className="card mt-5">
						<img className="card-img-top" src={image_url} alt={name}></img>
						<div className="card-body">
							<h5 className="card-title">{name}</h5>
							<p className="card-text">{description}</p>
							<Link className="btn btn-primary" to={`/products/${_id}`}>Buy</Link><span className="card__price">${price}</span>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Home