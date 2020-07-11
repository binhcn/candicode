import React from 'react';
import { connect } from "react-redux";
import $ from 'jquery';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

import './Home.css';
// import ChallengeCard from '../challenge/ChallengeCard';
import {
  getAllChallenges,
} from "../../actions/actions.creator";

const ChallengeCard = loadable(() => import('../challenge/ChallengeCard'))

class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.props.getAllChallenges('');
  }

  componentDidMount() {
    $(document).ready(function () {
      (function ($) {
        // $('.owl-carousel').owlCarousel({
        //   items: 4,
        //   center: false,
        //   loop: false,
        //   margin: 0,
        //   rewind: false,
        //   nav: true,
        //   dotsEach: true,
        //   navText: ['&lt;', '&gt;'],
        // });
      })(window.jQuery);
    });
  }

  render() {
    return (
      <div className="container" style={{marginTop:'30px'}}>
        <div className="row">
          <div className="col-lg-4">
            <div className="box_feat" id="icon_1">
              <span></span>
              <h3>Get knowledge</h3>
              <p>We provides a various tutorials covering a wide range of computer science domains. Deep into them and get strong backgrounds for yourself.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box_feat" id="icon_2">
              <span></span>
              <h3>Practice them</h3>
              <p>A large community that is willing to help you change your mind in programming world. More passed challenges more rewards. We are here to enjoy programming.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box_feat" id="icon_3">
              <h3>Be a champion</h3>
              <p>Weekly contests and various official bootcamp tour from well-known corporations. Participating in and proving your abilities with the employers.</p>
            </div>
          </div>
        </div>

        <div id="recommended" className="owl-carousel owl-theme">
          <div className="item">
            {this.props.data[0] && <ChallengeCard item={this.props.data[0]} />}
          </div>
          <div className="item">
            {this.props.data[1] && <ChallengeCard item={this.props.data[1]} />}
          </div>
          <div className="item">
           {this.props.data[2] && <ChallengeCard item={this.props.data[2]} />}
          </div>
          <div className="item">
           {this.props.data[3] && <ChallengeCard item={this.props.data[3]} />}
          </div>
          <div className="item">
           {this.props.data[4] && <ChallengeCard item={this.props.data[4]} />}
          </div>
          <div className="item">
           {this.props.data[0] && <ChallengeCard item={this.props.data[0]} />}
          </div>
          <div className="item">
           {this.props.data[1] && <ChallengeCard item={this.props.data[1]} />}
          </div>
        </div>

        <Row>
          <Col sm={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }} className="tutorial-contest">
            <div className="item tutorial-item">
              <p className="topic">TUTORIALS</p>
              <div className="divider" />
              <Link to="/tutorials">View details <Icon type="arrow-right" /></Link>
            </div>
          </Col>
          <Col sm={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }} className="tutorial-contest">
            <div className="item contest-item">
              <p className="topic">CONTESTS</p>
              <div className="divider" />
              <Link to="/contests">View details <Icon type="arrow-right" /></Link>
            </div>
          </Col>
        </Row>

      </div >
    );
  }
}

const mapStateToProps = state => ({
  data: state.challengeReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getAllChallenges: () => dispatch(getAllChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);