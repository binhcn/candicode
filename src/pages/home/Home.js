import React from 'react';
import $ from 'jquery';
import './Home.css';
import Challenge from '../challenge/ChallengeList';

export default class Home extends React.Component {
  componentDidMount() {
    $(document).ready(function () {
      // (function ($) {
      //   $('.owl-carousel').owlCarousel({
      //     center: true,
      //     items: 2,
      //     loop: true,
      //     margin: 10,
      //     responsive: {
      //       0: {
      //         items: 1
      //       },
      //       600: {
      //         items: 2
      //       },
      //       1000: {
      //         items: 4
      //       }
      //     }
      //   });
      // })(window.jQuery);
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
            <Challenge style={{ zIndex: '-5' }} />
          </div>
        </div>
      </div>
    );
  }
}