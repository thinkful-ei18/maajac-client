
import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { REACT_APP_API_KEY } from '../config'
import { connect } from 'react-redux';
import { getMarkers } from '../actions/markerActions';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      location: null
    };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            location: {
              lng: position.coords.longitude,
              lat: position.coords.latitude
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    this.props.dispatch(getMarkers());
    console.log('done');
  }

  render() {
    /* ==== MARKERS TEMPLATE ONCE BACKEND IS FUNCTIONAL ==== */
    // let markers = arrayOfMarkersFromServer.map(obj => (
    //   <Marker
    //       onClick={this.onMarkerClick}
    //       name={obj.name}
    //       position={{lat: obj.lat, lng: obj.lng}}
    //     />
    // ))
    let location =
      this.state.location !== null ? this.state.location : undefined;

    return (
      <Map
        google={this.props.google}
        center={location}
        zoom={12}
        onClick={this.onMapClicked}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Petco Park'}
          position={{ lat: 32.7077, lng: -117.1569 }}
        />

        <Marker
          onClick={this.onMarkerClick}
          name={'Dolores park'}
          position={{ lat: 37.759703, lng: -122.428093 }}
        />

        <Marker
          onClick={this.onMarkerClick}
          name={'AT&T Park'}
          position={{ lat: 37.7786, lng: -122.3893 }}
        />

        <InfoWindow
          marker={this.state.activeMarker}

          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>
              {this.state.location !== null ? this.state.location.lat : 'Hello'}
            </h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}


export const mapStateToProps = (state, props) => ({
  markers: state.markers.allMarkers,
})

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: REACT_APP_API_KEY
})(MapContainer))


/*
Resources:
 - https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
 - https://www.npmjs.com/package/google-maps-react
 - https://github.com/fullstackreact/google-maps-react
*/
