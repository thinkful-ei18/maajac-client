
import React from 'react';
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
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");




const GoogleMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: `100vw` }} />,
    mapElement: <div style={{ height: `93vh` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    defaultZoom={12}
    center={props.position}
    onClick={props.onHandleClick}
    defaultOptions={{ styles }}
  >


    {/* Marker that user drops */}
    <Marker position={props.indicatorPin} onClick={props.onToggleOpen}>
      {props.isOpen && (
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <p>Incident Marker</p>
        </InfoWindow>
      )}
    </Marker>
    {/* Marker cluster */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={30} // change for size of cluster area
      maxZoom={15} // change how far map zooms when clicking cluster
      defaultMinimumClusterSize={2} // mimimum cluster size
    >
      {/* Populated clusters */}
      {props.isMarkerShown &&
        props.markers.map((marker, index) => {
          return <Incident marker={marker} key={index} />;
        })
      }
    </MarkerClusterer>
  </GoogleMap>
);


export default GoogleMapComponent;
