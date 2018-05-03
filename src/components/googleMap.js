import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const GoogleMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: `100vw` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.position}
    onClick={props.onHandleClick}
  >
    {props.isMarkerShown &&
      props.markers.map((marker, index) => {
        return (
          <Marker
            key={index}
            icon={marker.icon}
            position={{ lat: marker.location[0], lng: marker.location[1] }}
            onClick={props.onMarkerClick}
          />
        );
      })}) )
    <Marker position={props.indicatorPin} onClick={props.onToggleOpen}>
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <p>Hello from Canada</p>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

export const mapStateToProps = (state, props) => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : []
});

export default connect(mapStateToProps)(GoogleMapComponent);
