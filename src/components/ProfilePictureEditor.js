import React from 'react'
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { postProfileImage } from '../actions/modalActions';
import '../components/css/profileEditor.css'

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: require('../images/Profile_avatar_placeholder_large.png'),
      selectedFile: null
    }
  }

  onClickSave = () => {
    console.log(this.state.image)
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvasScaled = this.editor.getImageScaledToCanvas()

      this.props.dispatch(postProfileImage(this.state.selectedFile))
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
      <div className='profileEditor'>
        <AvatarEditor
          width={250}
          height={250}
          image={this.state.selectedFile}
          ref={this.setEditorRef} />
        <input type="file" onChange={this.fileChangedHandler}></input>
        <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(MyEditor);
