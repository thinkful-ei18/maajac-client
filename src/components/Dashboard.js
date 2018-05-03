import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';
// import { jwtFetch } from './actions/login_actions';
import { DeleteButton } from './DeleteButton';

export class Dashboard extends React.Component {
  componentDidMount() {
    // if (this.props.jwt && this.props.reports.length < 1) {
    //   this.props.dispatch(jwtFetch(this.props.jwt));
    // }
  }

  render() {
    // if (!this.props.jwt) {
    //   return <Redirect to="/signin" />;
    // }
    const reports = [1, 2, 3];
    let userReports = reports.map(report => (
      <div className="report-card" key={report.id}>
        user report
        <div>
          <DeleteButton id={report.id} />
        </div>
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

export default (Dashboard = withRouter(Dashboard));

// export default connect(mapStateToProps)(Dashboard);
