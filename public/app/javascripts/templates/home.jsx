import React from 'react';
import {Link} from 'react-router-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';

class Home extends React.Component {

	constructor(props) {
      	super(props);

      	this.state = {
      		selectedCity : null,
      		selectedPlace : null,
            showDropdownMenu : false,
            selectedDropdownValue : 'Bangalore'
      	}

      	this.searchRestaurant = this.searchRestaurant.bind(this);
        this.onClickDropdown = this.onClickDropdown.bind(this);
        this.selectDropdownValue = this.selectDropdownValue.bind(this);
   	};

   	componentDidMount() {
   		var self = this;
      	var input = document.getElementById('locationInput');
      	var autocomplete = new google.maps.places.Autocomplete(input);

      	autocomplete.addListener('place_changed', function() {
          	var place = autocomplete.getPlace();
          	if (place.geometry) {
          		self.setState({selectedPlace : place});
            	return;
          	}
        });
   	};

   	searchRestaurant() {
   		var data = {
   			lat : this.state.selectedPlace.geometry.location.lat(),
   			lng : this.state.selectedPlace.geometry.location.lng()
   		}
   		this.props.history.push('/listpage/' + btoa(JSON.stringify(data)));
   	};

    onClickDropdown() {
        this.setState({showDropdownMenu: !this.state.showDropdownMenu});
    };

    selectDropdownValue(e) {
        this.setState({selectedDropdownValue : e.target.textContent});
        this.onClickDropdown();
    }

   	render() {
      	return (
         	<div>
	            <Header />
	            <div class='firstFoldHome'>
	            	<div class='container'>
	            		<div class='row'>
	            			<h1>Find your favourite restaurant without hassle</h1>
	            			<div class='homeSearchBar'>
                                <div class='ul-dropdown'>
                                    <span className={this.state.showDropdownMenu ? 'selectedValue openDropdown' : 'selectedValue'} onClick={this.onClickDropdown}>{this.state.selectedDropdownValue}</span>
                                    <ul className={this.state.showDropdownMenu ? 'ul-dropdownlist' : 'hide'}>
                                        <li onClick={this.selectDropdownValue}>Bangalore</li>
                                        <li onClick={this.selectDropdownValue}>Mumbai</li>
                                        <li onClick={this.selectDropdownValue}>Delhi</li>
                                        <li onClick={this.selectDropdownValue}>Pune</li>
                                        <li onClick={this.selectDropdownValue}>Chennai</li>
                                    </ul>
                                </div>
				            	<input id="locationInput" type="text" placeholder="Enter a location" />
				            	<a href='javascript:void(0)' onClick={this.searchRestaurant} class='button'>Search</a>
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