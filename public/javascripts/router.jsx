import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './templates/home.jsx';

class Customrouter extends Component {
   	render() {
      	return (
         	<Router>               
               	<Switch>
                  	<Route exact path='/' component={Home} />
               	</Switch>
         	</Router>
      	);
   	}
}
export default Customrouter;