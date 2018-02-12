import CustomHttp from './customHttp';

module.exports = function(){

	var customHttp = CustomHttp();

	return {
        getNearbyRestaurants : function getNearbyRestaurants(val) {
            return customHttp.sendGetRequest("https://developers.zomato.com/api/v2.1/geocode?lat="+val.lat+"&lon="+val.lon);
        },

        getRestaurantDetails : function getRestaurantDetails(val) {
            return customHttp.sendGetRequest("https://developers.zomato.com/api/v2.1/geocode?lat="+val.lat+"&lon="+val.lon);
        }
    }
}