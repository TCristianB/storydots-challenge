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
			<div className="product__list">
				{products && products.map((product) => {
					const { _id, name, description, image_url, price } = product
					return (
						<div key={_id} className="card mt-5">
							<img className="card-img-top" src={image_url} alt={name}></img>
							<div className="card-body">
								<h5 className="card-title">{name}</h5>
								<p className="card__price"><span className="card__dolar">$</span>{price}</p>
								<Link className="btn btn-primary" to={`/products/${_id}`}>Buy</Link>
							</div>
						</div>
					)
				})}
			</div>

		</div>
	)
}

export default Home