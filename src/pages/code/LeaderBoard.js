import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import {
  getChallengeLeaderBoard,
} from "../../actions/actions.creator";

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    render: rank => {
      if (rank === 1) return <img width="50px" src='img/golden.png' alt="logo" />
      else if (rank === 2) return <img width="50px" src='img/silver.jpg' alt="logo" />
      else if (rank === 3) return <img width="50px" src='img/bronze.png' alt="logo" />
      else return <span>{rank}</span>
    },
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Score',
    dataIndex: 'score',
  },
  {
    title: 'Completed at',
    dataIndex: 'completedAt',
  },
];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    rank: i+1,
    username: `Edward King ${i}`,
    score: 100,
    completedAt: moment().fromNow(),
  });
}

class LeaderBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    const {
      location: { pathname: path },
    } = this.props;
    const challengeId = path.split('/').slice(-1)[0];
    this.props.getChallengeLeaderBoard(challengeId);
  }

  render() {
    return (
      <Table
        columns={columns.map(item => {
          if (item.dataIndex === "score" || item.dataIndex === "rank")
            return { ...item, align: 'center' }
            else return { ...item }
          }
        )}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        style={{margin: '3vh 3vh'}}
      />
    );
  }
}

const mapStateToProps = state => ({
  leaderBoard: state.codeEditorReducer.leaderBoard,
});

const mapDispatchToProps = dispatch => ({
  getChallengeLeaderBoard: data => dispatch(getChallengeLeaderBoard(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeaderBoard));