import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';

import './css/userProfile.css';
import { profileOpenDialog } from '../actions/modalActions';


export class UserProfile extends Component {

  ppUploadModal() {
    console.log('open modal')
    this.props.dispatch(profileOpenDialog());
  }

  render() {
    return (
      <section className='user-profile'>

        <div className='user-pic-div'>
          <img src={require('../images/avatar.png')} alt='profile-pic' className='profile-pic' />
        </div>
        <button className='report-button-large' onClick={() => this.ppUploadModal()}>Upload profile picture</button>
        <div className='user-info-div'>
          <p className='user username'>{this.props.currentUser.username}</p>
          <p className='user'>blahzay</p>
        </div>
        <Dialog
          bodyClassName="modal"
          title="Profile Picture"
          modal={false}
          autoScrollBodyContent={true}
          contentStyle={{ width: 300 }}
          open={this.props.dialog}
          onRequestClose={() => this.handleCloseDialog()}
        >
          <p>hi</p>
        </Dialog>
      </section>
    )
  }
}

export const mapStateToProps = (state, props) => ({
  // loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser ? state.auth.currentUser : '',
  dialog: state.modal.ppModal
});

export default connect(mapStateToProps)(UserProfile);