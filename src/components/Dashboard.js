import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getMarkersDashboard,
  deleteMarkerDashboard,
} from '../actions/markerActions';
import { withRouter, Redirect } from 'react-router';
// import { jwtFetch } from './actions/login_actions';

export class Dashboard extends React.Component {
  componentDidMount(props) {
    // if (this.props.jwt && this.props.reports.length < 1) {
    //   this.props.dispatch(jwtFetch(this.props.jwt));
    // }

    this.props.dispatch(getMarkersDashboard());
  }
  onClick(e) {
    e.preventDefault();
    console.log(e.target.id);
    this.props.dispatch(deleteMarkerDashboard({ markerId: e.target.id }));
  }

  render() {
    // if (!this.props.jwt) {
    //   return <Redirect to="/signin" />;
    // }

    const reports = this.props.markersFromServer;

    let userReports = reports.map(report => (
      <div className="report-card" key={report._id}>
      {this.props.loggedIn ? '' : ( <Redirect to='/' />) }
        <h2>{report.incidentType}</h2>
        <h3>Date:{report.date}</h3>
        <p>
          Location:{report.location.lat},{report.location.lng}
        </p>
        <div>Description:</div>
        <p>{report.description}</p>
        <button onClick={e => this.onClick(e)} id={report._id}>
          Delete
        </button>
      </div>
    ));

    let instructions =
      1 > reports.length ? (
        <span className="instructions">
          To create a report, click the create report button above. If the
          button is hidden, tap the menu button to expand available options.
        </span>
      ) : null;

    return (
      <main>
        <h2>Dashboard</h2>
        <Link to={'/'}>Back to Map</Link>
        {userReports}
        {instructions}
      </main>
    );
  }
}

// const mapStateToProps = state => ({
//   jwt: window.localStorage.nomnom_token,
//   userReports: state.user.reports,
// });

export const mapStateToProps = state => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser ? state.auth.currentUser : '',
});

export default withRouter(connect(mapStateToProps)(Dashboard));

// export default connect(mapStateToProps)(Dashboard);
