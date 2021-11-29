import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import './ProductPage.css'

interface productInterface {
	_id: string;
	name: string;
	description: string;
	image_url: string;
	price: number;
}


const ProductPage = () => {
	const [product, setProduct] = useState<productInterface>()
	const params = useParams<{id?: string}>()

	useEffect(() => {
		axios.get(`/api/products/${params.id}`)
			.then((res: any) => {
				setProduct(res.data)
			})
	}, [params.id])


	return (
		<div className="ProductPage">
			<Link to="/home">Go Back</Link>
			{product && (
				<>
					<h2 className="product__name">{product.name}</h2>
					<article className="product__article">
						<img className="product__article--img" src={product.image_url} alt={product.name} />
						<div className="product__article--description">
							<p className="product__price"><strong className="text-black">Price:</strong> <span className="product__price--symbol">$</span>{product.price}</p>
							<p>{product.description}</p>
							<button type="button" className="btn btn-primary mb-3">Add to cart</button>
						</div>
					</article>
				</>
			)}
		</div>

	)
}

export default ProductPage