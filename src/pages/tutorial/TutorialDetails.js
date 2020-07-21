import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Avatar, Icon, } from 'antd';
import { withRouter } from 'react-router-dom';

import './Tutorial.css';
import { getTutorialDetails } from '../../actions/actions.creator';
import Sidebar from '../common/Sidebar';
import TutorialDiscussion from './TutorialDiscussion';
import { getAvatarColor } from '../../util/Colors';

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
    var { author, title, likes, dislikes, createdAt, banner, description, content } = this.props;
    return (
      <Row className="container-fluid" gutter={32}>
        <Col span={18} className="tutorial-details">
          <div className="like-dislike">
            <Icon type="like" onClick={() => this.handleLike(true)} />
            {likes > 0 ? likes : 9}
            <Icon type="dislike" onClick={() => this.handleLike(false)} />
            {dislikes > 0 ? dislikes : 3}
          </div>
          <div className="title">{title}</div>
          <Row>
            <Col span={2}>
              {author &&
                <Avatar size="large" style={{ backgroundColor: getAvatarColor(author) }}
                  src="">
                  {author[0].toUpperCase()}
                </Avatar>
              }
            </Col>
            <Col span={22} className="info">
              <div>{author}</div>
              <div>Created at {createdAt ?
                createdAt.substring(0, createdAt.length - 4) :
                ""}
              </div>
            </Col>
          </Row>
          {banner &&
            <img src={banner} width="40%" alt="tutorial-banner" />
          }
          <div className="description">{description}</div>
          <div dangerouslySetInnerHTML={{ __html: content }} />

          <TutorialDiscussion />
        </Col>
        <Col span={6}>
          <Sidebar />
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
  banner: state.tutorialReducer.banner,
});

const mapDispatchToProps = dispatch => ({
  getTutorialDetails: (tutorialId) => dispatch(getTutorialDetails(tutorialId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialDetails));
