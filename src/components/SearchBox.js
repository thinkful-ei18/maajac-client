import React from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { setSearchLocation } from '../actions/defaultLocationActions';

const google = window.google;

class LocationSearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { address: '' };
	}

	handleChange = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => this.props.dispatch(setSearchLocation(latLng)))
			.catch(error => console.error('Error', error));
	};

	render() {
		return (
			<PlacesAutocomplete value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect}>
				{({ getInputProps, suggestions, getSuggestionItemProps }) => (
					<div>
						<input
							{...getInputProps({
								placeholder: 'Search Places ...',
								className: 'location-search-input',
							})}
						/>
						<div className="autocomplete-dropdown-container" style={{ color: 'black' }}>
							{suggestions.map(suggestion => {
								const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default (LocationSearchInput = connect()(LocationSearchInput));
