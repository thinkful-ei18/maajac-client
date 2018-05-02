import React from 'react';
import { connect } from 'react-redux';
import GoogleMapComponenet from './googleMap';
import { getMarkers } from '../actions/markerActions';

export class GoogleMapWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      location: {
        lat: -34.397,
        lng: 150.644
      }
    };
  }

  componentDidMount() {
    // Get markers from server
    this.props.dispatch(getMarkers())


    this.delayedShowMarker();
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
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {

    return (
      <GoogleMapComponenet
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        position={this.state.location}
        onHandleClick={e => this.handleMapClick(e)}
        markers={this.props.markersFromServer}
      />
    );
  }
}

export const mapStateToProps = (state, props) => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : []
});

export default (connect(mapStateToProps)(GoogleMapWrapper));
