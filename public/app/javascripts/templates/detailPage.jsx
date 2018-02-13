import React from 'react';
import {Link} from 'react-router-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';
import ApiCalls from '../services/apiCalls';

class DetailPage extends React.Component {

	constructor(props) {
      	super(props);

        this.state = {
            restaurantDetails : null
        }

        this.getRestaurantDetails = this.getRestaurantDetails.bind(this);

        var restaurantId = window.atob(this.props.match.params.restaurantid);
        this.getRestaurantDetails(restaurantId);
   	};

    getRestaurantDetails(val) {
        var self = this;
        var apiCalls = ApiCalls();
        apiCalls.getRestaurantDetails(val).then(function (response){
            var responseData = JSON.parse(response);
            self.setState({restaurantDetails : responseData});
        });
    };

   	render() {
      	return (
         	<div>
         		<Header />
                <div id='detailPage'>
                    <div class='container'>
                        <div class='row'>
                            {
                                this.state.restaurantDetails ? 
                                (
                                    <div class='restaurantDetails'>
                                        <div class='detailHeader'>
                                            <h1>{this.state.restaurantDetails.name}</h1>
                                            <h3>{this.state.restaurantDetails.location.address}</h3>
                                        </div>
                                        <div class='detailFeatured'>
                                            <div class='row'>
                                                <div class='col-lg-8 col-sm-12'>
                                                    <img src={this.state.restaurantDetails.featured_image} />
                                                </div>
                                                <div class='col-lg-4 col-sm-12'>
                                                    <div class='detailContent'>
                                                        <div class='rating'>
                                                            <div class='col-lg-6'>
                                                                <b>{this.state.restaurantDetails.user_rating.aggregate_rating}/5</b>
                                                            </div>
                                                            <div class='col-lg-6 text-right'>
                                                                {this.state.restaurantDetails.user_rating.votes} votes
                                                            </div>
                                                            <div class='clearfix'></div>
                                                        </div>
                                                        <div class='rating'>
                                                            <div class='col-lg-6'>
                                                                <b>Cuisines:</b> 
                                                            </div>
                                                            <div class='col-lg-6 text-right'>
                                                                {this.state.restaurantDetails.cuisines}
                                                            </div>
                                                            <div class='clearfix'></div>
                                                        </div> 
                                                        <div class='rating'>
                                                            <div class='col-lg-6'>
                                                                <b>Cost For Two :</b>
                                                            </div>
                                                            <div class='col-lg-6 text-right'>
                                                                {this.state.restaurantDetails.average_cost_for_two}
                                                            </div>
                                                            <div class='clearfix'></div>
                                                        </div>
                                                        <div class='rating'>
                                                            <div class='col-lg-6'>
                                                                <b>Online Delivery : </b>
                                                            </div>
                                                            <div class='col-lg-6 text-right'>
                                                                {this.state.restaurantDetails.has_online_delivery ? ('Yes') : ('No')}
                                                            </div>
                                                            <div class='clearfix'></div>
                                                        </div>
                                                        <div class='rating'>
                                                            <div class='col-lg-6'>
                                                                <b>Table Booking : </b>
                                                            </div>
                                                            <div class='col-lg-6 text-right'>
                                                                {this.state.restaurantDetails.has_table_booking ? ('Yes') : ('No')}
                                                            </div>
                                                            <div class='clearfix'></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
export default DetailPage;