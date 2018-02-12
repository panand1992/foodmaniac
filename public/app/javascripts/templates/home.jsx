import React from 'react';
import {Link} from 'react-router-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';

class Home extends React.Component {

	constructor(props) {
      	super(props);

      	this.state = {
      		selectedCity : null,
      		selectedPlace : null
      	}

      	this.searchRestaurant = this.searchRestaurant.bind(this);
   	};

   	componentDidMount() {
   		var self = this;
      	var input = document.getElementById('locationInput');
      	var autocomplete = new google.maps.places.Autocomplete(input);

      	autocomplete.addListener('place_changed', function() {
          	var place = autocomplete.getPlace();
          	if (place.geometry) {
          		self.setState({selectedPlace : place});
         //    if (place.geometry.viewport) {
	        //     map.fitBounds(place.geometry.viewport);
	        // } else {
	        //     map.setCenter(place.geometry.location);
	        //     map.setZoom(17);  // Why 17? Because it looks good.
	        // }
         //    self.getRestaurants(place.geometry.location.lat(), place.geometry.location.lng());
         //    window.alert("No details available for input: '" + JSON.stringify(place.geometry) + "'");
            	return;
          	}
        });
   	};

   	searchRestaurant() {
   		var data = {
   			lat : this.state.selectedPlace.geometry.location.lat(),
   			lng : this.state.selectedPlace.geometry.location.lng()
   		}
   		//window.location.assign('/listpage/' + btoa(JSON.stringify(data)));
   		this.props.history.push('/listpage/' + btoa(JSON.stringify(data)));
   	};

   	render() {
      	return (
         	<div>
	            <Header />
	            <div class='firstFoldHome'>
	            	<div class='container'>
	            		<div class='row'>
	            			<h1>Find your favourite restaurant without hassle</h1>
	            			<div class='homeSearchBar'>
				            	<select>
				            		<option>Bangalore</option>
				            		<option>Mumbai</option>
				            		<option>Delhi</option>
				            		<option>Chennai</option>
				            		<option>Pune</option>
				            	</select>
				            	<input id="locationInput" type="text" placeholder="Enter a location" />
				            	<a href='javascript:void(0)' onClick={this.searchRestaurant}>Search</a>
				            </div>
	            		</div>
	            	</div>
	            </div>
	            <Footer />
         	</div>
      	);
   }
}
export default Home;