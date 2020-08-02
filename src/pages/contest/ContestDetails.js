import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Avatar, } from 'antd';
import { withRouter } from 'react-router-dom';

import './Contest.css';
import { getContestDetails } from '../../actions/actions.creator';
import Sidebar from '../common/Sidebar';
import ContestCard from './ContestCard';
import { getAvatarColor } from '../../util/Colors';
import LeaderBoard from './LeaderBoard';

class ContestDetails extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname: path },
    } = this.props;
    const contestId = path.split('/').slice(-1)[0];
    this.props.getContestDetails(contestId);
  }

  render() {
    var { author, title, createdAt, banner, description, content, leaders } = this.props;
    return (
      <Row className="container-fluid" gutter={32}>
        <Col lg={18} className="contest-details">
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
                createdAt.substring(0, createdAt.length - 7) :
                ""}
              </div>
            </Col>
          </Row>

          {leaders.length > 0 && 
            <LeaderBoard />
          }

          {banner &&
            <img src={banner} width="40%" alt="tutorial-banner" />
          }
          <div className="description">{description}</div>
          <div dangerouslySetInnerHTML={{ __html: content }} />

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
  banner: state.contestReducer.banner,
  leaders: state.contestReducer.leaders,
});

const mapDispatchToProps = dispatch => ({
  getContestDetails: (contestId) => dispatch(getContestDetails(contestId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContestDetails));
