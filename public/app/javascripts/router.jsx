import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './templates/home.jsx';
import ListPage from './templates/listPage.jsx';
import DetailPage from './templates/detailPage.jsx';

class Customrouter extends Component {
   	render() {
      	return (
         	<Router>               
               	<Switch>
                  	<Route exact path='/' component={Home} />
                  	<Route exact path='/listpage/:queryparams' component={ListPage} />
                  	<Route exact path='/detailpage/:restaurandid' component={DetailPage} />
               	</Switch>
         	</Router>
      	);
   	}
}
export default Customrouter;