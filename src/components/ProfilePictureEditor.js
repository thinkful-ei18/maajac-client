import React from 'react'
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'btqsteza';
const CLOUDINARY_UPLOAD_URL = 'http://res.cloudinary.com/dpg5znpau'; // http://res.cloudinary.com/dpg5znpau/image/upload/sample.jpg

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
      uploadedFileClodinaryUrl: ''
    }
  }
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
  }

  render() {
    return (
      <Dropzone
        onDrop={this.handleDrop}
        multiple={false}
        disableClick
        accept="image/jpg,image/png"
        style={{ width: '250px', height: '250px' }}
      >
        <p>Drop and image to change your profile picture</p>
        <AvatarEditor width={250} height={250} image={this.state.image} />
      </Dropzone>
    )
  }
}

export default MyEditor
