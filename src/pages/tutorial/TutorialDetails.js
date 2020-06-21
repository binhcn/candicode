import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Avatar, Icon, } from 'antd';
import { withRouter } from 'react-router-dom';

import './Tutorial.css';
import { getTutorialDetails } from '../../actions/actions.creator';

class TutorialDetails extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname: path },
    } = this.props;
    const tutorialId = path.split('/').slice(-1)[0];
    this.props.getTutorialDetails(tutorialId);
  }

  handleLike = (status) => {
    console.log(status)
  }

  render() {
    return (
      <Row className="container-fluid" gutter={32}>
        <Col span={18} className="tutorial-details">
          <div className="like-dislike">
            <Icon type="like" onClick={() => this.handleLike(true)}/>
            {this.props.likes > 0 ? this.props.likes : 9}
            <Icon type="dislike" onClick={() => this.handleLike(false)} />
            {this.props.dislikes > 0 ? this.props.dislikes : 3}
          </div>
          <div className="title">{this.props.title}</div>
          <Row>
            <Col span={2}>
              <Avatar size="large" src="https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/50654668_2359749710921468_7719574428836691968_n.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=A7gnCAwC2DMAX8evK4Z&_nc_ht=scontent-hkt1-1.xx&oh=ad83b5ac0cf79e94fa3657158cc34b08&oe=5EF4FED3" />
            </Col>
            <Col span={22} className="info">
              <div>{this.props.author}</div>
              <div>Created at {this.props.createdAt ?
                this.props.createdAt.substring(0, this.props.createdAt.length - 4) :
                ""}
              </div>
            </Col>
          </Row>
          <div className="description">{this.props.description}</div>
          <div dangerouslySetInnerHTML={{ __html: this.props.content }} />

        </Col>
        <Col span={6}>

          <div className="widget">
            <div className="widget-title">
              <h4>Recent Contests</h4>
            </div>
            <ul className="comments-list">
              <li>
                <div className="alignleft">
                  <a href="#0"><img src="http://via.placeholder.com/160x160.jpg" alt="" /></a>
                </div>
                <small>30.5.2020</small>
                <h3><a href="#0" title="">Hackathon</a></h3>
              </li>
              <li>
                <div className="alignleft">
                  <a href="#0"><img src="http://via.placeholder.com/160x160.jpg" alt="" /></a>
                </div>
                <small>25.5.2020</small>
                <h3><a href="#0" title="">Coding Fighter</a></h3>
              </li>
              <li>
                <div className="alignleft">
                  <a href="#0"><img src="http://via.placeholder.com/160x160.jpg" alt="" /></a>
                </div>
                <small>20.5.2020</small>
                <h3><a href="#0" title="">BK Innovation</a></h3>
              </li>
            </ul>
          </div>

          <div className="widget">
            <div className="widget-title">
              <h4>Challenge Categories</h4>
            </div>
            <ul className="cats">
              <li><a href="#0">Language Proficiency <span>(12)</span></a></li>
              <li><a href="#0">Problem solving <span>(21)</span></a></li>
              <li><a href="#0">Language Proficiency <span>(36)</span></a></li>
              <li><a href="#0">Problem solving <span>(48)</span></a></li>
            </ul>
          </div>

          <div className="widget">
            <div className="widget-title">
              <h4>Popular Tags</h4>
            </div>
            <div className="tags">
              <a href="#0">Database</a>
              <a href="#0">Functional Programming</a>
              <a href="#0">HTML</a>
              <a href="#0">OOP</a>
              <a href="#0">Algorithm</a>
            </div>
          </div>

        </Col>

      </Row>
    );
  }
}

const mapStateToProps = state => ({
  title: state.tutorialReducer.title,
  author: state.tutorialReducer.author,
  description: state.tutorialReducer.description,
  content: state.tutorialReducer.content,
  createdAt: state.tutorialReducer.createdAt,
  likes: state.tutorialReducer.likes,
  dislikes: state.tutorialReducer.dislikes,
});

const mapDispatchToProps = dispatch => ({
  getTutorialDetails: (tutorialId) => dispatch(getTutorialDetails(tutorialId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialDetails));
