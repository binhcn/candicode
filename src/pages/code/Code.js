import React from 'react';
import $ from 'jquery';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import './Code.css';
import CodeSpec from './CodeSpec';
import CodeEditor from './CodeEditor';
import CodeOutput from './CodeOutput';
import { getChallengeDetails, } from '../../actions/actions.creator';

class Code extends React.Component {

  constructor(props) {
    super(props);
    const {
      location: { pathname: path },
    } = this.props;
    const challengeId = path.split('/').slice(-1)[0];
    this.props.getChallengeDetails(challengeId);
  }

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

  render() {
    return (
      <div>
        <div className="split">
          <div className="split_left">
            <CodeSpec />
          </div>
          <div className="split_bar"></div>
          <div className="split_right">
            <CodeEditor />
            <CodeOutput />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  getChallengeDetails: (challengeId) => dispatch(getChallengeDetails(challengeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Code));