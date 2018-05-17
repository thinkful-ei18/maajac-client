import React from 'react';
import GoogleMapComponent from './googleMap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getMarkers } from '../actions/markerActions';
import { setUserLocation } from '../actions/reportActions';
import { setDefaultLocation } from '../actions/defaultLocationActions';

export class GoogleMapWrapper extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isMarkerShown: true,

			location: {
				lat: 40.650002,
				lng: -73.94997,
			},
			indicatorPin: {
				lat: -34.397,
				lng: 150.644,
			},
			popupIsOpen: false,
		};
	}

	componentDidMount() {
		// Get markers from server
		this.props.dispatch(getMarkers());

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const userlocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					this.props.dispatch(setDefaultLocation({ userlocation }));
					this.setState({
						location: userlocation,
					});
				},
				error => {
					console.log(error);
				}
			);
		}
	}

	handleMapClick(event) {
		let lat = event.latLng.lat();
		let lng = event.latLng.lng();
		console.log('lat:', lat);
		console.log('lng', lng);
		this.setState({
			indicatorPin: {
				lat,
				lng,
			},
		});
		// set the pin location in state
		this.props.dispatch(setUserLocation({ lat, lng }));
	}

	onToggleOpen() {
		this.setState({
			popupIsOpen: !this.state.popupIsOpen,
		});
	}

	render() {
		return (
			<GoogleMapComponent
				path={this.props.path}
				isMarkerShown={this.state.isMarkerShown}
				onMarkerClick={this.handleMarkerClick}
				position={this.props.defaultLocation}
				onHandleClick={e => this.handleMapClick(e)}
				markers={this.props.markersFromServer}
				indicatorPin={this.state.indicatorPin}
				isOpen={this.state.popupIsOpen}
				onToggleOpen={() => this.onToggleOpen()}
			/>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
	defaultLocation: state.defaultLocation.location,
});

export default connect(mapStateToProps)(GoogleMapWrapper);

/*
Resources:
 - https://tomchentw.github.io/react-google-maps/
*/
