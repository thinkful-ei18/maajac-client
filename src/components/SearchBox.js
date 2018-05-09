import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const google = window.google;

<<<<<<< HEAD
export default class LocationSearchInput extends React.Component {
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
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
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
=======
export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: {
				lat: 41.9,
				lng: -87.624,
				text: '',
			},
		};
	}

	render() {
		return (
			<SearchBox
				ref={this.onSearchBoxMounted}
				bounds={this.bounds}
				controlPosition={5}
				onPlacesChanged={() => console.log(this.state.text)}
			>
				<input
					onChange={e => this.setState({ text: e.currentTarget.value })}
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
						textOverflow: `ellipses`,
					}}
				/>
			</SearchBox>
		);
	}
>>>>>>> bda6eefff551e7c72534aba8c62a367b9c9ce7b8
}
