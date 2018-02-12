import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component {

	constructor(props) {
      	super(props);
   	};

   	render() {
      	return (
         	<footer>
         		<div class='container'>
                    <div class='row'>
                        <p>Foodmaniac &copy; 2018 All rights reserved</p>
                    </div>
               </div>
			</footer>	
      	);
   }
}
export default Footer;