import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './container/Main'

function App() {
  return (
    <Router>
		<Switch>
			<Route component={Main} />
		</Switch>
	</Router>
  );
}

export default App;
