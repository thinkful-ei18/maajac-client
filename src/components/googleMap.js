import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={12} center={props.position}>
    {props.isMarkerShown && (
      // this.props.markersFromServer.map(marker => {
      //   return (
      <Marker
        position={{ lat: 21, lng: 11 }}
        onClick={props.onMarkerClick}
      />)
      // })
      // )
    })
)
  </GoogleMap>
));


export const mapStateToProps = (state, props) => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : []
})

export default (connect(mapStateToProps)(GoogleMapComponent));