import React from 'react';
import ReactQuill from 'react-quill';

const html = '<h1 class="ql-align-center">QUÀ TẶNG CUỘC SỐNG</h1><blockquote>If you frequently need to manipulate the DOM or use the&nbsp;<a href="https://quilljs.com/docs/api/" rel="noopener noreferrer" target="_blank">Quill API</a>s imperatively, you might consider switching to fully uncontrolled mode. ReactQuill will initialize the editor using&nbsp;defaultValue, but won\'t try to reset it after that. The&nbsp;onChange&nbsp;callback will still work as expected.</blockquote><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/DApM-3LxtyA?showinfo=0"></iframe><p><br></p><p><br></p>'

export default class Editor extends React.Component {
    constructor (props) {
      super(props)
      this.state = { editorHtml: html }
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange (html) {
        this.setState({ editorHtml: html });
        console.log(this.state.editorHtml)
    }
    
    render () {
      return (
        <div>
          <ReactQuill 
            theme="snow"
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={'.app'}
            placeholder={this.props.placeholder}
           />
         </div>
       )
    }
  }
  
  Editor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean'],
      [{ 'align': [] }],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
 
  Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align'
  ]