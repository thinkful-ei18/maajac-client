import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './css/about.css';

class About extends React.Component {
	// componentDidMount() {
	// 	//changes background image to picture only for this component
	// 	document.body.className = 'body-component-about';
	// }

	render() {
		if (!this.props.currentUser) {
			return <Redirect to='/map'/>;
		}
		return (
			<div className="about">
				<h1>About safeR</h1>
				<p>
					Our app is community driven. safeR was made to improve community awareness of incident and events in
					the local area. Neigborhood apps are social network oriented. We wanted to create something the
					community can use to report and identify certain patterns in their area. Safety is our #1 Priority,
					user intgrety and identies will always be anonymous
				</p>
			</div>
		);
	}
}

export const mapStateToProps = state => ({
  currentUser: state.auth.currentUser ? state.auth.currentUser : 0,
});

export default connect(mapStateToProps)(About);