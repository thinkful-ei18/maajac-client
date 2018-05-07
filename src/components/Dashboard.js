import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import {
  getMarkersDashboard,
  deleteMarkerDashboard,
} from '../actions/markerActions';
import UserProfile from './UserProfile';
import { reload } from '../actions/userActions';
// import { jwtFetch } from './actions/login_actions';

import './css/dashboard.css'

export class Dashboard extends React.Component {

  componentDidMount(props) {
    // if (this.props.jwt && this.props.reports.length < 1) {
    //   this.props.dispatch(jwtFetch(this.props.jwt));
    // }

    if (!this.props.loggedIn) {
      this.handleReload();
    }

    this.props.dispatch(getMarkersDashboard());
  }

  handleReload() {
    this.props.dispatch(reload());
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
      {/* {this.props.loggedIn ? '' : ( <Redirect to='/' />) } */}
        <h2 className="incident-type">{report.incidentType}</h2>
        <h3 className="incident-date">Date: {report.date}</h3>
        {/* <p className="incident-location">
          Location: {report.location.lat + report.location.lng}
        </p> */}
        <div className="incident-description-title">Description:</div>
        <p className="incident-description">{report.description}</p>
        <button onClick={e => this.onClick(e)} id={report._id} className="delete-incident">
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
      <main className="dashboard">
        {/* <h2>Dashboard</h2> */}
        <UserProfile />
        <Link to={'/'}>Back to Map</Link>
        <section className="user-reports">
          {userReports}
        </section>
        {instructions}
      </main>
    );
  }
}

// const mapStateToProps = state => ({
//   jwt: window.localStorage.nomnom_token,
//   userReports: state.user.reports,
// });

// export default connect(mapStateToProps)(Dashboard);

export const mapStateToProps = state => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser ? state.auth.currentUser : '',
});

export default withRouter(connect(mapStateToProps)(Dashboard));

