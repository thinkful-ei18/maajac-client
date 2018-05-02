import React from 'react';
import { connect } from 'react-redux';
import GoogleMapComponenet from './googleMap';
import { getMarkers } from '../actions/markerActions';

export class GoogleMapWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: true,
      location: {
        lat: -34.397,
        lng: 150.644
      },
      indicatorPin: {
        lat: -34.397,
        lng: 150.644
      }
    };
  }

  componentDidMount() {
    // Get markers from server
    // this.props.dispatch(getMarkers()).then(() => {
    //   console.log(this.props.markersFromServer)

    // })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
          this.setState({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  handleMapClick(event) {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    console.log(lat, lng);
    this.setState({
      indicatorPin: {
        lat,
        lng
      }
    });
  }

  render() {
    return (
      <GoogleMapComponenet
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        position={this.state.location}
        onHandleClick={e => this.handleMapClick(e)}
        indicatorPin={this.state.indicatorPin}
      />
    );
  }
}

export default GoogleMapWrapper;
