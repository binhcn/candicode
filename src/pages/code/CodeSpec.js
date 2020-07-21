import React from 'react';
import { connect } from "react-redux";
import { Tabs, Icon, Typography, Divider, Statistic } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import './Code.css';
import LeaderBoard from './LeaderBoard';
import Discussion from './Discussion';
import Submission from './Submission';

const { Title, Text } = Typography;

const { TabPane } = Tabs;

class CodeSpec extends React.Component {

  onFinish = () => {
    this.props.history.push('/contests/' + this.props.contestId);
  }

  render() {
    var { isContest, title, level, point, endsAt, author, likes, dislikes } = this.props;
    const deadline = Date.now() - moment().diff(endsAt);
    return (
      <Tabs type="card" defaultActiveKey="description">
        <TabPane className="description"
          tab={
            <span>
              <Icon type="read" />
            Description
          </span>
          } key="description">
          <Title level={4}>{title}</Title>
          <div className="challenge-info">
            <span>
              <Icon type="user" />&nbsp;
              {author}
            </span>
            <span><Text type="danger">{level}</Text></span>
            <span>
              <Icon type="heart" />&nbsp;
              {point} Points
            </span>
            <span>
              <Icon type="like" />&nbsp;
              {likes}
            </span>
            <span>
              <Icon type="dislike" />&nbsp;
              {dislikes}
            </span>
            {isContest &&
              <span>
                <Icon type="hourglass" />&nbsp;
              <Statistic.Countdown title="" value={deadline} onFinish={this.onFinish} />
              </span>
            }
          </div>

          <Divider />
          <Text strong>Description</Text>
          <div dangerouslySetInnerHTML={{ __html: this.props.description }} />

        </TabPane>
        <TabPane tab={
          <span>
            <Icon type="ordered-list" />
            Leaderboard
          </span>
        } key="leaderboard">
          <LeaderBoard />
        </TabPane>
        <TabPane tab={
          <span>
            <Icon type="save" />
            Submission
          </span>
        } key="submission">
          <Submission />
        </TabPane>
        {!isContest &&
          <TabPane tab={
            <span>
              <Icon type="aliwangwang" />
            Discussion
          </span>
          } key="discussion">
            <Discussion />
          </TabPane>
        }
      </Tabs>
    )
  }
}

const mapStateToProps = state => ({
  title: state.codeEditorReducer.title,
  author: state.codeEditorReducer.author,
  level: state.codeEditorReducer.level,
  point: state.codeEditorReducer.point,
  likes: state.codeEditorReducer.likes,
  dislikes: state.codeEditorReducer.dislikes,
  description: state.codeEditorReducer.description,
  isContest: state.codeEditorReducer.isContest,
  endsAt: state.codeEditorReducer.endsAt,
  contestId: state.codeEditorReducer.contestId,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CodeSpec));