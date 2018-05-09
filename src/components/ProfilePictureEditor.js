import React from 'react'
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { postProfileImage } from '../actions/modalActions';

// import request from 'superagent';

// const CLOUDINARY_UPLOAD_PRESET = 'btqsteza-unsigned';
// const CLOUDINARY_UPLOAD_URL = 'http://res.cloudinary.com/dpg5znpau/image/upload'; // http://res.cloudinary.com/dpg5znpau/image/upload/sample.jpg

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: require('../images/Profile_avatar_placeholder_large.png'),
      uploadedFileClodinaryUrl: [],
      selectedFile: null
    }
  }


  // handle image drop
  handleDrop = dropped => {
    this.setState({ uploadedFileClodinaryUrl: dropped[0] })
    console.log(this.state.uploadedFileClodinaryUrl)
  }

  // handle capture canvas and handleImageUpload()
  onClickSave = () => {
    console.log(this.state.image)
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvasScaled = this.editor.getImageScaledToCanvas()

      this.props.dispatch(postProfileImage(this.state.uploadedFileClodinaryUrl.preview))
      console.log('saved')
      console.log(canvasScaled)
    }
  }
  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  uploadHandler = () => {
    console.log(this.state.selectedFile)
    this.props.dispatch(postProfileImage(this.state.selectedFile))
  }

  setEditorRef = (editor) => this.editor = editor

  render() {
    return (
      <Dropzone
        onDrop={this.handleDrop}
        multiple={false}
        disableClick
        accept="image/jpg,image/png"
        style={{ width: '250px', height: '250px' }}
      >
        <p>Drop an image to change your profile picture</p>
        <AvatarEditor
          width={250}
          height={250}
          image={this.state.image}
          ref={this.setEditorRef} />
        <button onClick={() => this.onClickSave()}>Save</button>
        <input type="file" onChange={this.fileChangedHandler}></input>
        <button onClick={this.uploadHandler}>Upload!</button>
      </Dropzone>
    )
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(MyEditor);
