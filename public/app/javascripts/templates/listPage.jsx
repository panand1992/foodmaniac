import React from 'react';
import {Link} from 'react-router-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';
import ApiCalls from '../services/apiCalls';

class ListPage extends React.Component {

	constructor(props) {
      	super(props);

        this.state = {
            restaurantList : null,
            gmap: null
        }

        this.getRestaurants = this.getRestaurants.bind(this);
        var latLngData = JSON.parse(atob(this.props.match.params.queryparams));
        this.getRestaurants(latLngData.lat, latLngData.lng);
        this.showRestaurantDetails = this.showRestaurantDetails.bind(this);

   	};

    componentDidMount() {
        // var map = new google.maps.Map(document.getElementById('mapResults'), {
        //     center: {lat: -33.8688, lng: 151.2195},
        //     zoom: 13
        // });

        // self.setState({gmap : map});
    };

    getRestaurants(lat, lng) {
        var data = {
            "lat" : lat,
            "lon" : lng
        }
        var self = this;
        var apiCalls = ApiCalls();
        apiCalls.getNearbyRestaurants(data).then(function (response){
            var responseData = JSON.parse(response);
            self.setState({restaurantList : responseData.nearby_restaurants});
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

    showRestaurantDetails(e, val) {
        this.props.history.push('/detailpage/' + btoa(val));
    };

   	render() {
      	return (
         	<div>
         		<Header />
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
                                    <div onClick={(e) => this.showRestaurantDetails(e, restaurant.restaurant.id)}>
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
                <Footer />
			</div>	
      	);
   	}
}
export default ListPage;