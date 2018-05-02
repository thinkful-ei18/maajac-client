import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { getMarkers } from '../actions/markerActions'

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      this.props.allMarkers.map(marker => {
        return (<Marker
          position={{ lat: marker.location[0], lng: marker.location[1] }}
          onClick={props.onMarkerClick}
        />)
      })
    )}
    {console.log(props.onMarkerClick)}
  </GoogleMap>
));

export class GoogleMapComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false
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
        },
        error => {
          console.log(error);
        }
      );
    }
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
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

export const mapStateToProps = (state, props) => ({
  allMarkers: state.markers.allMarkers ? state.markers.allMarkers : []
})

export default (connect(mapStateToProps)(GoogleMapComponent));
