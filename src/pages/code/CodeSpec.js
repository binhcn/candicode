import React from 'react';
import { Tabs, Icon, Typography, Divider } from 'antd';
import './CodeSpec.css';

const { Title, Text } = Typography;

const { TabPane } = Tabs;

export default function CodeSpec() {
  return (
    <Tabs type="card" size="small">
      <TabPane tab={
        <span>
          <Icon type="read" />
          Description
        </span>
      } key="description">
        <Title level={4}>Challenge Title</Title>
        <div className="challenge-info">
          <span>
            <Icon type="user" />&nbsp;
            Smith
        </span>
          <span><Text type="danger">Easy</Text></span>
          <span>
            <Icon type="heart" />&nbsp;
            100 Points
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
        <p>
          Given an array of integers, return <strong>indices</strong> of the two numbers such that
          they add up to a specific target.
          </p>
        <p>
          You may assume that each input would have <strong>exactly</strong> one solution, and you
          may not use the same element twice.
          </p>
          <Text strong>Input format</Text>
        <p>
          The first line contains an integer <code>n</code> , the number of socks represented in{' '}
          <code>arr</code>. The second line contains <code>n</code> space-separated integers
            describing the colors <code>arr[i]</code> of the socks in the pile.
          </p>
          <Text strong>Contrainsts</Text>
            <pre className="code">1 &lt; n &lt; 100 </pre>
        <Text strong>Output format</Text>
        <pre className="code">Becasue 1 + 1 = 2, so 2 - 1 = 1</pre>


      </TabPane>
      <TabPane tab={
        <span>
          <Icon type="ordered-list" />
          Leaderboard
        </span>
      } key="leaderboard">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab={
        <span>
          <Icon type="save" />
          Submission
        </span>
      } key="submission">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab={
        <span>
          <Icon type="aliwangwang" />
          Discussion
        </span>
      } key="discussion">
        Content of Tab Pane 4
      </TabPane>
    </Tabs>
  )
}