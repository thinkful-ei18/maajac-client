import React from 'react';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
const _ = require('lodash');
const google = window.google;

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
}
