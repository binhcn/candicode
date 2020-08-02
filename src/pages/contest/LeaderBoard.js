import React from 'react';
import { Table, Avatar } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { getAvatarColor } from '../../util/Colors';
import './Contest.css';

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
    width: '5%',
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
    },
    width: '30%',
  },
  {
    title: 'Score',
    dataIndex: 'formattedScore',
    width: '25%',
  },
  {
    title: 'Duration (min)',
    dataIndex: 'time',
  },
];

class LeaderBoard extends React.Component {

  render() {
    var { leaders } = this.props;
    return (
      <Table
        className="leader-board"
        columns={columns.map(item => {
          if (item.dataIndex === "score" || item.dataIndex === "rank")
            return { ...item, align: 'center' }
          else return { ...item }
        }
        )}
        dataSource={leaders}
        pagination={{ pageSize: 5 }}
        style={{ margin: '3vh 3vh' }}
      />
    );
  }
}

const mapStateToProps = state => ({
  leaders: state.contestReducer.leaders,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);