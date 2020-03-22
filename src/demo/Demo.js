import React from 'react';
import $ from 'jquery';

// import './Demo.css';

class Demo extends React.Component {
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
      });
      $(document).mouseup(e => {
        mouse_is_down = false;
      });
    })
  }
  render() {
    return (
      <div className="split">
        <div className="split_left">
          o dau va
        </div>
        <div className="split_bar"></div>
        <div className="split_right">
          Taji sao lai bor toi
        </div>
      </div>
    );
  }
}

export default Demo;