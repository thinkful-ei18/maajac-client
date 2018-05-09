import _ from 'lodash';
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

import Incident from './IncidentMarker';
import { styles } from './mapStyle';

import image from '../images/map-marker.svg';

const {
  MarkerClusterer
} = require('react-google-maps/lib/components/addons/MarkerClusterer');

const GoogleMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: `100vw` }} />,
    mapElement: <div style={{ height: `93vh` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          // refs.map.fitBounds(bounds);
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    defaultZoom={12}
    center={props.position}
    onClick={props.onHandleClick}
    defaultOptions={{ styles }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      controlPosition={1}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </SearchBox>
    {/* Marker that user drops */}
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

    {/* Marker cluster */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={30} // change for size of cluster area
      maxZoom={15} // change how far map zooms when clicking cluster
      defaultMinimumClusterSize={2} // mimimum cluster size
    >
      {/* Populated markers */}
      {props.isMarkerShown &&
        props.markers.map((marker, index) => {
          return <Incident marker={marker} key={index} />;
        })}
    </MarkerClusterer>
  </GoogleMap>
));

export default GoogleMapComponent;
