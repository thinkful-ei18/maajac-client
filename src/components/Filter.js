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
				<option value="" />
				<option value="crime">Crime</option>
				<option value="theft">Theft</option>
				<option value="roadconstruction">Road Construction</option>
				<option value="accident">Traffic Accident</option>
				<option value="other">Other</option>
			</select>
		);
	}
}

export const mapStateToProps = (state, props) => ({
	markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
});

export default connect(mapStateToProps)(Filter);
