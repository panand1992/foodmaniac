import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import asyncComponent from './AsyncComponent';

const Home = asyncComponent(() =>
    System.import('./templates/home.jsx').then(module => module.default)
)

const About = asyncComponent(() =>
    System.import('./templates/about.jsx').then(module => module.default)
)

const ListPage = asyncComponent(() =>
    System.import('./templates/listPage.jsx').then(module => module.default)
)

const DetailPage = asyncComponent(() =>
    System.import('./templates/detailPage.jsx').then(module => module.default)
)


class Customrouter extends Component {
   	render() {
      	return (
         	<Router>               
               	<Switch>
                  	<Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                  	<Route exact path='/listpage/:queryparams' component={ListPage} />
                  	<Route exact path='/detailpage/:restaurantid' component={DetailPage} />
               	</Switch>
         	</Router>
      	);
   	}
}
export default Customrouter;