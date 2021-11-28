import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import './Main.css'

import Notification from '../components/Notification'

import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Profile from '../pages/Profile'
import CreateProduct from '../pages/Products/CreateProduct'

const Main = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const [isAuth, setIsAuth] = useState(false)

	const history = useHistory()

	const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated') || '{}')

	useEffect(() => {
		if(isAuthenticated === true) {
			setIsAuth(true)
		}else {
			setIsAuth(false)
		}
	}, [isAuthenticated, isAuth])

	const logoutAdmin = async () => {
		try {
			await axios.post('/api/users/logout')
				.then(() => {
					window.localStorage.removeItem('User')
					window.localStorage.removeItem('UserId')
					window.localStorage.removeItem('isDemo')
					window.localStorage.removeItem('isAuthenticated')
				})
			history.push('/login')
		} catch (e) {
			setErrorMessage('Internal Server Error')
		}
	}

	return (
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link to="/home" className="navbar-brand">E commerce</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/home" className="nav-link">Home</Link>
						</li>
						{!isAuth ? (
							<>
								<li className="nav-item">
									<Link to="/login" className="nav-link">Login</Link>
								</li>
								<li className="nav-item">
									<Link to="/register" className="nav-link">Register</Link>
								</li>
							</>
						) :
							<>
								<li className="nav-item">
									<Link to="/profile" className="nav-link">Profile</Link>
								</li>
								<li className="nav-item">
									<Link to="/create-product" className="nav-link">Create product</Link>
								</li>

							</>
						}
					</ul>

					{isAuth && (
						<>
							{errorMessage !== '' && <Notification message={errorMessage} />}
							<span className="navbar-text">
								<Link to="/login" className="nav-link text-danger" id="logout" onClick={logoutAdmin}>Logout</Link>
							</span>
						</>
					)}
				</div>
			</nav>

			<Switch>
				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/create-product" component={CreateProduct} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Switch>
		</div>
	)
}

export default Main