import React from 'react';
import { Table, Avatar } from 'antd';
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';

import {
  getChallengeLeaderBoard,
} from "../../actions/actions.creator";
import { getAvatarColor } from '../../util/Colors';

const columns = [
  {
    title: 'Rank',
    dataIndex: 'key',
    render: rank => {
      if (rank === 1) return <img width="50px" src='/img/golden.png' alt="logo" />
      else if (rank === 2) return <img width="50px" src='/img/silver.jpg' alt="logo" />
      else if (rank === 3) return <img width="50px" src='/img/bronze.png' alt="logo" />
      else return <span>{rank}</span>
    },
  },
  {
    title: 'Username',
    dataIndex: 'fullName',
    render: (fullName, record) => {
      return <Link to={`/profile/${record.id}`}>
        <Avatar key="avatar" src={record.avatar ? record.avatar : null} className="avatar"
          style={{ backgroundColor: getAvatarColor(record.firstName + record.lastName) }}>
          {record.firstName[0].toUpperCase()}
        </Avatar>
        &nbsp;{fullName}
      </Link>
    }
  },
  {
    title: 'Score',
    dataIndex: 'formattedScore',
  },
  {
    title: 'Execution time',
    dataIndex: 'time',
  },
  {
    title: 'Submitted at',
    dataIndex: 'submitAt',
  },
];

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
    var { leaderBoard } = this.props;
    return (
      <Table
        columns={columns.map(item => {
          if (item.dataIndex === "score" || item.dataIndex === "rank")
            return { ...item, align: 'center' }
          else return { ...item }
        }
        )}
        dataSource={leaderBoard}
        pagination={{ pageSize: 5 }}
        style={{ margin: '3vh 3vh' }}
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