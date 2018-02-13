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
            gmap: null,
            listViewOn: true
        }

        this.getRestaurants = this.getRestaurants.bind(this);
        this.showRestaurantDetails = this.showRestaurantDetails.bind(this);
        this.showListView = this.showListView.bind(this);
        this.showMapView = this.showMapView.bind(this);

   	};

    componentDidMount() {
        var latLngData = JSON.parse(atob(this.props.match.params.queryparams));
        this.getRestaurants(latLngData.lat, latLngData.lng);
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

    showMapView() {
        this.setState({listViewOn : false});
    };

    showListView() {
        this.setState({listViewOn : true});
    };

    showRestaurantDetails(e, val) {
        this.props.history.push('/detailpage/' + btoa(val));
    };

   	render() {
      	return (
         	<div>
         		<Header />
                {/*<div id="mapResults" style={{width: '900px',height: '400px'}}></div>*/}
                <div id='listPage'>
                    <div class='container'>
                        <div class='row'>
                            {
                                this.state.restaurantList ? 
                                (
                                    <div class='listPageHeader'>
                                        <div class='col-lg-12'>
                                            <div class='row'>
                                                <div class='col-lg-8 col-sm-6'>
                                                    {this.state.restaurantList.length} Results Found 
                                                </div>
                                                <div class='col-lg-4 col-sm-6 text-right'>
                                                    <a href='javascript:void(0)' className={this.state.listViewOn ? 'active' : '' } onClick={this.showListView}>List View</a>
                                                    /
                                                    <a href='javascript:void(0)' className={this.state.listViewOn ? '' : 'active'} onClick={this.showMapView} >Map View</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class='clearfix'></div>
                                    </div>
                                ) : ''
                            }
                        </div>
                        <div class='row'>
                            {
                                this.state.restaurantList && this.state.listViewOn ? 
                                (
                                    <div>
                                        {this.state.restaurantList.map(function(restaurant, i){
                                            return(
                                                <div class='col-lg-4 col-sm-12' onClick={(e) => this.showRestaurantDetails(e, restaurant.restaurant.id)}>
                                                    <div class='listResultItem'>
                                                        <h3>{restaurant.restaurant.name}</h3>
                                                        <h5>{restaurant.restaurant.cuisines}</h5>
                                                        <div class='listItemImg' style={{backgroundImage : 'url('+restaurant.restaurant.featured_image+')'}}></div>
                                                        <div class='col-lg-12'>
                                                            <div class='row'>
                                                                <div class='col-lg-6'>
                                                                    <div class='row'>
                                                                        <b>Cost For Two :</b> {restaurant.restaurant.average_cost_for_two}
                                                                    </div>
                                                                </div>
                                                                <div class='col-lg-6 text-right'>
                                                                    <div class='row'>
                                                                        <b>Rating :</b> {restaurant.restaurant.user_rating.aggregate_rating}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class='clearfix'></div>
                                                    </div>
                                                </div>
                                            )
                                        }, this)}
                                    </div>
                                ) : ''
                            }
                        </div>
                    </div>
                </div>
                <Footer />
			</div>	
      	);
   	}
}
export default ListPage;