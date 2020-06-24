import React from 'react';
import { connect } from "react-redux";
import $ from 'jquery';

import './Home.css';
import ChallengeCard from '../challenge/ChallengeCard';
import {
  getAllChallenges,
} from "../../actions/actions.creator";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAllChallenges();
  }

  componentDidMount() {
    $(document).ready(function () {
      (function ($) {
        $('.owl-carousel').owlCarousel({
          items: 4,
          center: false,
          loop: false,
          margin: 0,
          rewind: false,
          nav: true,
          dotsEach: true,
        });
      })(window.jQuery);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ margin: '50px 0' }}>
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
          {this.props.data[2] && <div className="item">
            <ChallengeCard item={this.props.data[2]} />
          </div>}
          {this.props.data[3] && <div className="item">
            <ChallengeCard item={this.props.data[3]} />
          </div>}
          {this.props.data[4] && <div className="item">
            <ChallengeCard item={this.props.data[4]} />
          </div>}
          {this.props.data[5] && <div className="item">
            <ChallengeCard item={this.props.data[5]} />
          </div>}
          {this.props.data[6] && <div className="item">
            <ChallengeCard item={this.props.data[6]} />
          </div>}
        </div>

      </div>
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