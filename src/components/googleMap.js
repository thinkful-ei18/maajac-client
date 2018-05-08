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
import image from '../images/map-marker.svg';
import thief from '../images/thief.svg';

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
        url: image,
        scaledSize: { width: 31, height: 43 }
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

// export const mapStateToProps = (state, props) => ({
// 	markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
// });

// export default connect(mapStateToProps)(GoogleMapComponent);

export default GoogleMapComponent;
