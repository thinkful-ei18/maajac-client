import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './css/about.css';

class About extends React.Component {
	componentWillMount() {
		document.body.style.backgroundColor = 'white';
	}
	render() {
		if (!this.props.currentUser) {
			return <Redirect to="/map" />;
		}

		return (
			<main role="main" className="about">
				<section className="about-the-app">
					<h4 className="about-h4">The App</h4>
					<p className="about-paragraph">
						safeR is a community driven and led app created for the purpose of improving community awareness
						of local incidents and events.
					</p>
				</section>

				<section className="about-the-team">
					<h4 className="about-h4">The Team</h4>
					<div className="team-member">
						<p className="member-name">Alisha Evans</p>
						<a
							className="member-portfolio-link"
							href="http://www.alishaantoinette.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							http://www.alishaantoinette.com
						</a>
					</div>

					<div className="team-member">
						<p className="member-name">Christina Moore</p>
						<a
							className="member-portfolio-link"
							href="http://www.christinamakes.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							http://www.christinamakes.com/
						</a>
					</div>

					<div className="team-member">
						<p className="member-name">Ali Ahmad</p>
						<a
							className="member-portfolio-link"
							href="https://aliahmad-code.github.io/"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://aliahmad-code.github.io/
						</a>
					</div>

					<div className="team-member">
						<p className="member-name">Muaath Alaraj</p>
						<a
							className="member-portfolio-link"
							href="http://muaath-alaraj.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							http://muaath-alaraj.com
						</a>
					</div>

					<div className="team-member">
						<p className="member-name">Adrian Ross</p>
						<a
							className="member-portfolio-link"
							href="https://github.com/adriantoddross"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://github.com/adriantoddross
						</a>
					</div>
				</section>
			</main>
		);
	}
}

export const mapStateToProps = state => ({
	currentUser: state.auth.currentUser ? state.auth.currentUser : 0,
});

export default connect(mapStateToProps)(About);
