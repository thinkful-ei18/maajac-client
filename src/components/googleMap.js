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
			googleMapURL="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96873.73653502829!2d-74.01503741591657!3d40.64522284217501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24416947c2109%3A0x82765c7404007886!2sBrooklyn%2C+NY!5e0!3m2!1sen!2sus!4v1539994390229"
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
	- https://help.webriti.com/common-docs/tutorials/how-to-get-google-map-url/
 */
