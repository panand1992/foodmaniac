import React from 'react';
import {Link} from 'react-router-dom';
import Header from './header.jsx';
import ApiCalls from '../services/apiCalls';

class Home extends React.Component {

	constructor(props) {
      	super(props);

      	this.state = {
      		restaurantList : null,
      		gmap: null
      	}

      	this.getRestaurants = this.getRestaurants.bind(this);
   	};

   	componentDidMount() {
   		var self = this;
      	var input = document.getElementById('locationInput');
      	var autocomplete = new google.maps.places.Autocomplete(input);

      	var map = new google.maps.Map(document.getElementById('mapResults'), {
	        center: {lat: -33.8688, lng: 151.2195},
	        zoom: 13
	    });

	    self.setState({gmap : map});

      	autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (place.geometry) {
          	console.log('changed');
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            if (place.geometry.viewport) {
	            map.fitBounds(place.geometry.viewport);
	        } else {
	            map.setCenter(place.geometry.location);
	            map.setZoom(17);  // Why 17? Because it looks good.
	        }
            self.getRestaurants(place.geometry.location.lat(), place.geometry.location.lng());
            //window.alert("No details available for input: '" + JSON.stringify(place.geometry) + "'");
            return;
          }
        });
   	};

   	getRestaurants(lat, lng) {
   		var data = {
   			"lat" : lat,
   			"lon" : lng
   		}
   		console.log(data);
   		var self = this;
   		var apiCalls = ApiCalls();
   		apiCalls.getNearbyRestaurants(data).then(function (response){
   			//console.log(response);
   			var responseData = JSON.parse(response);
   			self.setState({restaurantList : responseData.nearby_restaurants});
   			console.log(self.state.restaurantList);
   			var infowindow = new google.maps.InfoWindow();
			for(var i=0;i<self.state.restaurantList.length;i++){
				var marker = new google.maps.Marker({
				    position: {lat: parseFloat(self.state.restaurantList[i].restaurant.location.latitude), lng: parseFloat(self.state.restaurantList[i].restaurant.location.longitude)},
				    map : self.state.gmap
				});

				marker.addListener('click', function() {
    				infowindow.open(self.state.gmap, marker);
  				});
  				google.maps.event.addListener(marker, 'click', (function(marker, i) {
			        return function() {
			          infowindow.setContent("<div>"+self.state.restaurantList[i].restaurant.name+"</div>");
			          infowindow.open(self.state.gmap, marker);
			        }
			    })(marker, i));
			}
   		});
   	};

   	render() {
      	return (
         	<div>
	            <Header />
	            <div>
	            	<select>
	            		<option>Bangalore</option>
	            		<option>Mumbai</option>
	            		<option>Delhi</option>
	            		<option>Chennai</option>
	            		<option>Pune</option>
	            	</select>
	            	<input id="locationInput" type="text" placeholder="Enter a location" />
	            </div>
	            <div id="mapResults" style={{width: '900px',height: '400px'}}></div>
	            {
	            	this.state.restaurantList ? 
	            	(
	            		<div>
	            			<div>
				            	<a href='javascript:void(0)' onClick={this.showListView}>List</a>
				            	<a href='javascript:void(0)' onClick={this.showMapView}>Map</a>
				            </div>
				 
		            		{this.state.restaurantList.map(function(restaurant, i){
		            			return(
		            				<div>
		            					<p>Name : {restaurant.restaurant.name}</p>
		            					<p>Cuisines : {restaurant.restaurant.cuisines}</p>
		            					<img src={restaurant.restaurant.featured_image} />
		            					<p>Cost For Two : {restaurant.restaurant.average_cost_for_two}</p>
		            					<p>Online Delivery : {restaurant.restaurant.has_online_delivery ? ('Yes') : ('No')}</p>
		            					<p>Rating : {restaurant.restaurant.user_rating.aggregate_rating}</p>
		            					<br/>
		            				</div>
		            			)
		            		}, this)}
	            		</div>
	            	) : ''
	            }
         	</div>
      	);
   }
}
export default Home;