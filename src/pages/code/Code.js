import React from 'react';
// import { Row, Col } from 'antd';
import $ from 'jquery';

import './Code.css';
import CodeSpec from './CodeSpec';
import CodeEditor from './CodeEditor';
import CodeOutput from './CodeOutput';

export default class Demo extends React.Component {

  state = {
    editorWidth: 678
  }

  componentDidMount() {
    const left = document.querySelector('.split_left');
    let mouse_is_down = false;

    $(document).ready(e => {
      $('.split_bar').mousedown(function () {
        mouse_is_down = true;
      });
      $(document).mousemove(e => {
        if (!mouse_is_down) return;
        left.style.width = `${e.clientX}px`;
        var width = 1366 - 5 - e.clientX;
        this.setState({
          editorWidth: width
        })
      });
      $(document).mouseup(e => {
        mouse_is_down = false;
      });
    })
  }
  render(){
    return (
      <div>
        
      
      {/* <Row style={{background: 'white', padding: '0 2px'}}>
        <Col xs={24} md={12}>
          <CodeSpec />
        </Col>
        <Col xs={24} md={12}>
          <CodeEditor />
          <CodeOutput />
        </Col>
      </Row> */}


      <div className="split">
        <div className="split_left">
          <CodeSpec />
        </div>
        <div className="split_bar"></div>
        <div className="split_right">
          <CodeEditor editorWidth={this.state.editorWidth}/>
          <CodeOutput />
        </div>
      </div>
      </div>
    )
  }
}