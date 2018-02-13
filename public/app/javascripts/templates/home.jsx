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
            selectedDropdownValue : 'Bangalore',
            mapBounds : {
                'bangalore': {
                    swlat: 12.5706,
                    swlon: 77.1075,
                    nelat: 13.4457,
                    nelon: 78.1430
                },
                'mumbai': {
                    swlat: 18.845553,
                    swlon: 72.743188,
                    nelat: 19.351654,
                    nelon: 73.226587
                },
                'pune': {
                    swlat: 18.221437,
                    swlon: 73.503848,
                    nelat: 18.763871,
                    nelon: 74.156848
                },
                'chennai': {
                    swlat: 12.832745,
                    swlon: 80.053772,
                    nelat: 13.289590,
                    nelon: 80.389541
                }
            },
            _autocomplete : null
      	}

      	this.searchRestaurant = this.searchRestaurant.bind(this);
        this.onClickDropdown = this.onClickDropdown.bind(this);
        this.selectDropdownValue = this.selectDropdownValue.bind(this);
        this.setCityBounds = this.setCityBounds.bind(this);
   	};

   	componentDidMount() {
   		var self = this;
      	var input = document.getElementById('locationInput');

        var selectedCity = this.state.selectedDropdownValue;
        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(self.state.mapBounds[selectedCity.toLowerCase()].swlat, self.state.mapBounds[selectedCity.toLowerCase()].swlon),
            new google.maps.LatLng(self.state.mapBounds[selectedCity.toLowerCase()].nelat, self.state.mapBounds[selectedCity.toLowerCase()].nelon));
        var autocompleteOptions = {
            bounds: defaultBounds,
            componentRestrictions: {'country': 'in'}
        }

      	var _autocomplete = new google.maps.places.Autocomplete(input);

        self.setState({_autocomplete : _autocomplete});

      	_autocomplete.addListener('place_changed', function() {
          	var place = _autocomplete.getPlace();
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
        this.setCityBounds();
        this.onClickDropdown();
    };

    setCityBounds() {
        var self = this;
        var selectedCity = this.state.selectedDropdownValue;
        var cityBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(self.state.mapBounds[selectedCity.toLowerCase()].swlat, self.state.mapBounds[selectedCity.toLowerCase()].swlon),
            new google.maps.LatLng(self.state.mapBounds[selectedCity.toLowerCase()].nelat, self.state.mapBounds[selectedCity.toLowerCase()].nelon));

        this.state._autocomplete.setBounds(cityBounds);
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
                                <div class='ul-dropdown'>
                                    <span className={this.state.showDropdownMenu ? 'selectedValue openDropdown' : 'selectedValue'} onClick={this.onClickDropdown}>{this.state.selectedDropdownValue}</span>
                                    <ul className={this.state.showDropdownMenu ? 'ul-dropdownlist' : 'hide'}>
                                        <li onClick={this.selectDropdownValue}>Bangalore</li>
                                        <li onClick={this.selectDropdownValue}>Mumbai</li>
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