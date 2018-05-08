import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import Incident from './IncidentMarker';
import { styles } from './mapStyle';
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const GoogleMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: `100vw` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={12}
    center={props.position}
    onClick={props.onHandleClick}
    defaultOptions={{ styles }}
  >
    {props.isMarkerShown &&
      props.markers.map((marker, index) => {
        return <Incident marker={marker} key={index} />;
      })
    }

    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      // enableRetinaIcons
      gridSize={90} // change for size of cluster area
    >
      <Marker position={props.indicatorPin} onClick={props.onToggleOpen}>
        {props.isOpen && (
          <InfoWindow onCloseClick={props.onToggleOpen}>
            <p>Incident Marker</p>
          </InfoWindow>
        )}
      </Marker>
    </MarkerClusterer>
  </GoogleMap>
);

export const mapStateToProps = (state, props) => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : []
});

export default connect(mapStateToProps)(GoogleMapComponent);
