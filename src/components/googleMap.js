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
import Incident from './IncidentMarker';
import { styles } from './mapStyle';

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
    defaultOptions={{ styles }}
  >
    {props.isMarkerShown &&
      props.markers.map((marker, index) => {
        return <Incident marker={marker} key={index} />;
      })}) )
    <Marker
      position={props.indicatorPin}
      icon={{
        path:
          'M256,0C167.641,0,96,71.625,96,160c0,24.75,5.625,48.219,15.672,69.125C112.234,230.313,256,512,256,512l142.594-279.375 C409.719,210.844,416,186.156,416,160C416,71.625,344.375,0,256,0z M256,256c-53.016,0-96-43-96-96s42.984-96,96-96   c53,0,96,43,96,96S309,256,256,256z',
        fillColor: '#D80027',
        fillOpacity: 1,
        scale: 0.1
      }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <p>Incident Marker</p>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

export const mapStateToProps = (state, props) => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : []
});

export default connect(mapStateToProps)(GoogleMapComponent);
