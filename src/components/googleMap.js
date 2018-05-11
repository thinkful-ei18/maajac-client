import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Incident from './IncidentMarker';
import { styles } from './mapStyle';
import image from '../images/map-marker.svg';

// renders the map
const GoogleMapsWrapper = withScriptjs(
	withGoogleMap(props => {
		return (
			<GoogleMap {...props} ref={props.onMapMounted}>
				{props.children}
			</GoogleMap>
		);
	})
);

// details of the map
const GoogleMapComponent = props => {
	let height = 'calc(100vh - 50px)';
	if (props.path === '/report') {
		height = '35vh';
	}
	return (
		<GoogleMapsWrapper
			googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
			loadingElement={<div style={{ height: `100vh` }} />}
			containerElement={<div style={{ height: height, width: `100vw` }} />}
			mapElement={<div style={{ height: height }} />}
			onBoundsChanged={props.onBoundsChanged}
			defaultZoom={12}
			center={props.position}
			onClick={props.onHandleClick}
			defaultOptions={{ styles }}
		>
			{/* Marker that user drops */}
			<Marker
				position={props.indicatorPin}
				icon={{
					url: image,
					scaledSize: { width: 31, height: 43 },
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
		</GoogleMapsWrapper>
	);
};

export default GoogleMapComponent;

/**
 Resources:
  - https://github.com/tomchentw/react-google-maps/issues/636
 */
