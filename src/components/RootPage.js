import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from '../components/Login';
import RegistrationForm from '../components/register';
import phoneImage from '../images/phone.jpg';
import groupImage from '../images/group.svg';
import anonymousUserImage from '../images/user-15.svg';
import writingImage from '../images/user-10.svg';
import { closeDialog } from '../actions/modalActions';

class RootPage extends Component {
  handleCloseDialog() {
    this.props.dispatch(closeDialog());
  }

  render() {
    // if (this.props.currentUser) {
    //   return <Redirect to="/landingpage" />;
    // }
    const linkStyle = {
      color: 'white',
      display: 'block',
      fontWeight: 'bold',
      fontSize: 16,
      textTransform: 'uppercase',
      textDecoration: 'none'
    };

    let modalForm;
    if (this.props.currentTab) {
      if (this.props.currentTab === 'signup') {
        modalForm = <RegistrationForm />;
      } else {
        modalForm = <LoginForm />;
      }
    }

    return (
      <div className="rootpage">
        <Dialog
          bodyClassName="modal"
          title="safeR"
          modal={false}
          autoScrollBodyContent={true}
          contentStyle={{ width: 300 }}
          open={this.props.dialog}
          onRequestClose={() => this.handleCloseDialog()}
        >
          {modalForm}
        </Dialog>

        <header className="tagline-header">
          <h1 className="tagline-title">Be safe</h1>
          <p className="tagline-desc">Know your neighborhood</p>
        </header>
        <main>
          <div
            className="landing-container"
            style={{
              background: 'url(' + phoneImage + ')',
              backgroundSize: 'cover'
            }}
          >
            <div className="landing-signup">
              <span className="landing-title">
                <h2>View and report incidents in your community</h2>
              </span>
              <Link to="/map" style={linkStyle}>
                <p>Get started &#8594;</p>
              </Link>
            </div>
          </div>
          <div className="feature-container">
            <div className="feature">
              <img src={writingImage} alt="Icon of user with a pen" />
              <h3>No registration required</h3>
              <p>View incidents at home or on the go.</p>
            </div>
            <div className="feature">
              <img src={groupImage} alt="Icon of 3 users" />
              <h3>Community driven</h3>
              <p>Register to report incidents locally.</p>
            </div>
            <div className="feature">
              <img src={anonymousUserImage} alt="Icon of user crossed out" />
              <h3>Anonymous and easy to use</h3>
              <p>Keep your privacy.</p>
            </div>
          </div>
        </main>
        <footer className="footer">
          <ul className="footer-credits">
            <h4>Team MAJAAC</h4>
            <li>
              <a
                href="http://www.alishaantoinette.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alisha Evans
              </a>
            </li>
            <li>
              <a
                href="http://www.christinamakes.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Christina Moore
              </a>
            </li>
            <li>
              <a
                href="https://aliahmad-code.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ali Ahmad
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Mistermo716"
                target="_blank"
                rel="noopener noreferrer"
              >
                Muaath Alaraj
              </a>
            </li>
            <li>
              <a
                href="https://github.com/adriantoddross"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adrian Ross
              </a>
            </li>
          </ul>
          <div className="github-container">
            <h4>View on GitHub</h4>
            <a
              className="github-link"
              href="https://github.com/thinkful-ei18/maajac-client"
              target="_blank"
              rel="noopener noreferrer"
            >
              Client Repo
            </a>
            <a
              className="github-link"
              href="https://github.com/thinkful-ei18/majaac-server"
              target="_blank"
              rel="noopener noreferrer"
            >
              Server Repo
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTab: state.modal.currentTab,
  dialog: state.modal.dialog,
  currentUser: state.auth.currentUser ? state.auth.currentUser : 0
});

export default connect(mapStateToProps)(RootPage);
