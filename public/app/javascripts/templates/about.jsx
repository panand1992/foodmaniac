import React from 'react';
import {Link} from 'react-router-dom';
import Header from './header.jsx';

class About extends React.Component {

	constructor(props) {
      	super(props);
   	};

   	render() {
      	return (
         	<div>
                <Header />
            </div>	
      	);
   }
}
export default About;