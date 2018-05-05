import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/userProfile.css';


class UserProfile extends Component {
  render() {
    return(
      <section className='user-profile'>

        <div className='user-pic-div'>
          <img src={require('../images/avatar.png')} alt='profile-pic' className='profile-pic'/>
        </div>

        <div className='user-info-div'>
          <p className='user username'>{this.props.currentUser.username}</p>
          <p className='user'>blahzay</p>
        </div>
      </section>
    )
  }
}

export const mapStateToProps = (state, props) => ({
  // loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser ? state.auth.currentUser : ''
});

export default connect(mapStateToProps)(UserProfile);