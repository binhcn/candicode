import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Icon, Avatar, } from 'antd';
import { withRouter } from 'react-router-dom';

import './Contest.css';
import { getContestDetails } from '../../actions/actions.creator';
import Sidebar from '../common/Sidebar';
import ContestDiscussion from './ContestDiscussion';
import ContestCard from './ContestCard';

class ContestDetails extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname: path },
    } = this.props;
    const contestId = path.split('/').slice(-1)[0];
    console.log(contestId);
    this.props.getContestDetails(contestId);
  }

  render() {
    return (
      <Row className="container-fluid" gutter={32}>
        <Col lg={18} className="contest-details">
          <div className="like-dislike">
            <Icon type="like" onClick={() => this.handleLike(true)} />
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

          <ContestDiscussion />
        </Col>
        <Col lg={6}>
          <ContestCard />
          <Sidebar />
        </Col>

      </Row>
    );
  }
}

const mapStateToProps = state => ({
  title: state.contestReducer.title,
  author: state.contestReducer.author,
  description: state.contestReducer.description,
  content: state.contestReducer.content,
  createdAt: state.contestReducer.createdAt,
  likes: state.contestReducer.likes,
  dislikes: state.contestReducer.dislikes,
});

const mapDispatchToProps = dispatch => ({
  getContestDetails: (contestId) => dispatch(getContestDetails(contestId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContestDetails));
