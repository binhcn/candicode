import React from 'react';
import { connect } from "react-redux";
import { Tabs, Icon, Typography, Divider } from 'antd';

import './Code.css';
import LeaderBoard from './LeaderBoard';
import Discussion from './Discussion';
import Submission from './Submission';

const { Title, Text } = Typography;

const { TabPane } = Tabs;

class CodeSpec extends React.Component {
  render() {
    return (
      <Tabs type="card" defaultActiveKey="description">
        <TabPane className="description"
          tab={
            <span>
              <Icon type="read" />
            Description
          </span>
          } key="description">
          <Title level={4}>{this.props.title}</Title>
          <div className="challenge-info">
            <span>
              <Icon type="user" />&nbsp;
              Binh Cao
            </span>
            <span><Text type="danger">{this.props.level}</Text></span>
            <span>
              <Icon type="heart" />&nbsp;
              {this.props.points} Points
          </span>
            <span>
              <Icon type="like" />&nbsp;
              1000
          </span>
            <span>
              <Icon type="dislike" />&nbsp;
              100
          </span>
            <span>
              <Icon type="share-alt" />&nbsp;
              Share
          </span>
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
        {!this.props.isContest &&
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
  level: state.codeEditorReducer.level,
  points: state.codeEditorReducer.points,
  description: state.codeEditorReducer.description,
  isContest: state.codeEditorReducer.isContest,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CodeSpec);