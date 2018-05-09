import React from 'react'
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
      image: 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
      uploadedFileClodinaryUrl: ''
    }
  }
  // handleImageUpload(file) {
  //   let upload =
  //     request
  //       .post('url', 'http://res.cloudinary.com/dpg5znpau/')
  //       .field('upload_preset', 'btqsteza-unsigned')
  //       .field('file', file);

  //   upload.end((err, response) => {
  //     if (err) {
  //       console.error(err);
  //     }

  //     if (response.body.secure_url !== '') {
  //       this.setState({
  //         uploadedFileCloudinaryUrl: response.body.secure_url
  //       });
  //       console.log(this.uploadedFileClodinaryUrl)
  //     }
  //   });
  // }

  // handle image drop
  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
  }

  // handle capture canvas and handleImageUpload()
  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()
      this.props.dispatch(postProfileImage(this.image))
      console.log('saved')
      console.log(canvas)
    }
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
      </Dropzone>
    )
  }
}

export default MyEditor
