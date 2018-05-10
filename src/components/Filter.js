import React from 'react';
import { connect } from 'react-redux';
import { filterMarkers } from '../actions/markerActions';
class Filter extends React.Component {
	onFilter(e) {
		this.props.dispatch(filterMarkers(e.currentTarget.value));
	}
	render() {
		return (
			<select onChange={e => this.onFilter(e)} className="filter">
				{' '}
				<option value="" >Incident Type: All</option>
				<option value="Crime">Crime</option>
				<option value="Theft">Theft</option>
				<option value="Road-Construction">Road Construction</option>
				<option value="Accident">Traffic Accident</option>
				<option value="Other">Other</option>
			</select>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
});

export default connect(mapStateToProps)(Filter);
