import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import { REACT_APP_API_KEY } from '../config'
 
 
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    /* ==== MARKERS TEMPLATE ONCE BACKEND IS FUNCTIONAL ==== */
    // let markers = arrayOfMarkersFromServer.map(obj => (
    //   <Marker
    //       onClick={this.onMarkerClick}
    //       name={obj.name}
    //       position={{lat: obj.lat, lng: obj.lng}} 
    //     />
    // ))

    return (
      <Map 
        google={this.props.google} 
        zoom={12} 
        onClick={this.onMapClicked}
      >

        <Marker
          onClick={this.onMarkerClick}
          name={'Petco Park'}
          position={{lat: 32.7077, lng: -117.1569}} 
        />

        <Marker
          onClick={this.onMarkerClick}
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} 
        />

        <Marker
          onClick={this.onMarkerClick}
          name={'AT&T Park'}
          position={{lat: 37.7786, lng: -122.3893}} 
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: REACT_APP_API_KEY
})(MapContainer)


/*
Resources:
 - https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
 - https://www.npmjs.com/package/google-maps-react
 - https://github.com/fullstackreact/google-maps-react
*/