import React from 'react';
// import { Row, Col } from 'antd';
import $ from 'jquery';

import './Code.css';
import CodeSpec from './CodeSpec';
import CodeEditor from './CodeEditor';
import CodeOutput from './CodeOutput';

export default class Demo extends React.Component {

  componentDidMount() {
    const left = document.querySelector('.split_left');
    const right = document.querySelector('.split_right');
    let mouse_is_down = false;
    let right_width;

    $(document).ready(e => {
      $('.split_bar').mousedown(function () {
        mouse_is_down = true;
      });
      $(document).mousemove(e => {
        if (!mouse_is_down) return;
        left.style.width = `${e.clientX}px`;
        right_width = $(window).width() - 10 - e.clientX;
        right.style.width = `${right_width}px`;
      });
      $(document).mouseup(e => {
        mouse_is_down = false;
      });
      $(window).resize(e => {
        var width = $(window).width() - 10 - right_width;
        left.style.width = `${width}px`;
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
          <CodeEditor/>
          <CodeOutput />
        </div>
      </div>
      </div>
    )
  }
}