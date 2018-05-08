import React from 'react';
import './css/about.css';

export default class About extends React.Component {
	componentDidMount() {
		//changes background image to picture only for this component
		document.body.className = 'body-component-about';
	}

	render() {
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
