import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';

import './css/userProfile.css';
import { profileOpenDialog, profileCloseDialog } from '../actions/modalActions';
import MyEditor from './ProfilePictureEditor';


export class UserProfile extends Component {

  ppUploadModal() {
    console.log('open modal')
    this.props.dispatch(profileOpenDialog());
  }

  handleCloseDialog() {
    this.props.dispatch(profileCloseDialog());
  }
  render() {
    return (
      <section className='user-profile'>

        <div className='user-pic-div'>
          <img src={this.props.profilePicture} alt='profile-pic' className='profile-pic' />
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
          // autoDetectWindowHeight={true}
          contentStyle={{ height: 800 }}
          bodyStyle={{ textAlign: 'center', height: '400px', paddingTop: '25px', paddingBottom: '50px' }}
          open={this.props.ppModal}
          onRequestClose={() => this.handleCloseDialog()}
        >
          {/* Modal body */}
          <MyEditor />
          <button onClick={() => this.handleCloseDialog()}>Close</button>
          {/* End modal body */}
        </Dialog>
      </section>
    )
  }
}

export const mapStateToProps = (state, props) => ({
  // loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser ? state.auth.currentUser : '',
  ppModal: state.modal.ppModal,
  profilePicture: state.auth.currentUser !== null ? state.auth.currentUser.profilePicture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
});

export default connect(mapStateToProps)(UserProfile);