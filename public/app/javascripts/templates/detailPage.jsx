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
                {
                    this.state.restaurantDetails ? 
                    (
                        <div>
                            <p>Name : {this.state.restaurantDetails.name}</p>
                            <p>Cuisines : {this.state.restaurantDetails.cuisines}</p>
                            <img src={this.state.restaurantDetails.featured_image} />
                            <p>Cost For Two : {this.state.restaurantDetails.average_cost_for_two}</p>
                            <p>Online Delivery : {this.state.restaurantDetails.has_online_delivery ? ('Yes') : ('No')}</p>
                            <p>Rating : {this.state.restaurantDetails.user_rating.aggregate_rating}</p>
                        </div>
                    ) : ''
                }
                <Footer />
			</div>	
      	);
   }
}
export default DetailPage;