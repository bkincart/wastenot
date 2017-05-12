import React, { Component } from 'react';

class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: ''
    }

    this.loadJS = this.loadJS.bind(this);
    this.initMap = this.initMap.bind(this);
  }



  componentWillMount() {
    // Prepare store address for geocoding
    const storeAddressText = `${this.props.storeAddress} ${this.props.storeCity} ${this.props.storeState} ${this.props.storeZip}`;
    const storeAddressWords = storeAddressText.split(' ');
    const storeAddressQuery = storeAddressWords.join('+');
    const GMAPS_DIRECTIONS_KEY = 'AIzaSyBouyQf7iBzl02N2sYIOB3IxwYqq0RY3TQ';

    // Grab latitude and longitude from Gmaps Geocoding API
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${storeAddressQuery}&key=${GMAPS_DIRECTIONS_KEY}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json()
  ).then(addressData => {
      this.setState({
        latitude: addressData.results[0].geometry.location.lat,
        longitude: addressData.results[0].geometry.location.lng
      });
    }).catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  loadJS(src) {
    const ref = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    const GMAPS_DIRECTIONS_KEY = 'AIzaSyBouyQf7iBzl02N2sYIOB3IxwYqq0RY3TQ';

    this.loadJS(`https://maps.googleapis.com/maps/api/js?key=${GMAPS_DIRECTIONS_KEY}&callback=initMap`);
  }

  initMap() {
    const coordinates = {lat: this.state.latitude, lng: this.state.longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: coordinates
      });
      var marker = new google.maps.Marker({
        position: coordinates,
        map: map
      });
  }

  render () {
    return(
      <div id='map' style={{height: '300px', width: '300px'}}></div>
    );
  }
}

export default GoogleMapComponent;
