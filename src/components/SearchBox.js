import React from 'react';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
const _ = require('lodash');
const google = window.google;

export default class Search extends React.Component {
  componentDidMount() {
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
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
          center: nextCenter,
          markers: nextMarkers
        });
        // refs.map.fitBounds(bounds);
      }
    });
  }
  render() {
    console.log(this.state.center);
    return (
      <SearchBox
        ref={this.onSearchBoxMounted}
        bounds={this.bounds}
        controlPosition={5}
        onPlacesChanged={this.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
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
    );
  }
}
