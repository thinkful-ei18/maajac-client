import React from 'react'
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { postProfileImage, profileCloseDialog } from '../actions/modalActions';
import '../components/css/profileEditor.css'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: require('../images/Profile_avatar_placeholder_large.png'),
      selectedFile: null
    }
  }

  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  uploadHandler = () => {
    console.log(this.state.selectedFile)
    this.props.dispatch(postProfileImage(this.state.selectedFile))
    this.props.dispatch(profileCloseDialog())
  }

  setEditorRef = (editor) => this.editor = editor

  render() {
    return (
      <div className='profileEditor'>
        <AvatarEditor
          width={250}
          height={250}
          image={this.state.selectedFile}
          ref={this.setEditorRef} />
        <input type="file" onChange={this.fileChangedHandler}></input>
        <div className='pp-form-buttons'>
          <button onClick={this.uploadHandler} className='report-button'>Upload</button>
          <button onClick={() => this.props.dispatch(profileCloseDialog())} className='report-button'>Cancel</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(MyEditor);
