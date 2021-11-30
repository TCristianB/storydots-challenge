import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import './Home.css'

const Home = () => {
	const [products, setProducts] = useState([])
	const [pageNumber, setPageNumber] = useState(0)

	useEffect(() => {
		axios.get('/api/products')
			.then((res) => {
				setProducts(res.data)
			})
	}, [])

	// Pagination settings
	const productsPerPage = 10
	const pagesVisited = pageNumber * productsPerPage
	const pageCount = Math.ceil(products.length / productsPerPage)
	const changePage = ({ selected }: { selected: number }) => {
		setPageNumber(selected)
	}

	return (
		<div className="Home">
			<h1 className="mt-3">All products</h1>
			<div className="product__list">
				{products.length > 0 ? products.slice(pagesVisited, pagesVisited + productsPerPage).map((product) => {
					const { _id, name, image_url, price } = product
					return (
						<div key={_id} className="card mt-5">
							<img className="card-img-top" src={image_url} alt={name}></img>
							<div className="card-body">
								<h5 className="card-title"><Link to={`/products/${_id}`} className="card-title">{name}</Link></h5>
								<p className="card__price"><span className="card__dolar">$</span>{price}</p>
								<Link className="btn btn-primary" to={`/products/${_id}`}>Buy</Link>
							</div>
						</div>
					)
				}): <p>There are no products.</p>}
			</div>
			<ReactPaginate
				previousLabel={"Previous"}
				nextLabel={"Next"}
				pageRangeDisplayed={5}
				marginPagesDisplayed={5}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={"pagination"}
				previousClassName={"page-item"}
				previousLinkClassName={"page-link"}
				nextLinkClassName={"page-link"}
				nextClassName={"page-item"}
				pageClassName={"page-item"}
				pageLinkClassName={"page-link"}
				activeClassName={"active"}
			/>

		</div>
	)
}

export default Home