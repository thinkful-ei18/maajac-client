import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './Requires-Login';

import { getMarkersDashboard, deleteMarkerDashboard } from '../actions/markerActions';
import UserProfile from './UserProfile';
// import { jwtFetch } from './actions/login_actions';

import './css/dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount(props) {
    // if (this.props.jwt && this.props.reports.length < 1) {
    //   this.props.dispatch(jwtFetch(this.props.jwt));
    // }
    //changes background image to picture only for this component
    // document.body.className="body-component-dashboard";
    this.props.dispatch(getMarkersDashboard());
    document.body.style.backgroundColor = 'white';
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
        {/* {console.log(this.props.loggedIn)} */}
        {/* {this.props.loggedIn ? '' : (<Redirect to='/map' />)} */}
        <h2 className="incident-type">{report.incidentType}</h2>
        <img className="report-icon" alt={`Report icon for ${report.incidentType}`} src={report.icon} />
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
        <p className="instructions">
          To create a your first report, click the 'Menu' button above.
          If you're on a computer, click <em>'Map'</em>. If you're on a phone, click <em>'Report'</em>.
				</p>
      ) : null;

    return (
      <main className="dashboard">
        <UserProfile incidentCount={userReports.length}/>
        <section className="user-reports">{userReports}</section>
        {instructions}
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  markersFromServer: state.markers.allMarkers ? state.markers.allMarkers : [],
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser ? state.auth.currentUser : '',
});

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));

