import React from 'react';
import { Table } from 'antd';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import {
  getChallengeSubmissions,
} from "../../actions/actions.creator";

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
  },
  {
    title: 'Submitted at',
    dataIndex: 'submitAt',
  },
  {
    title: 'Execution time (ns)',
    dataIndex: 'execTime',
    render: time => {
      return Math.round(time / 1000000) / 1000;
    }
  },
  {
    title: 'Passed testcase',
    dataIndex: 'formattedTestcase',
  },
  {
    title: 'Score',
    dataIndex: 'point',
  },
];

class Submission extends React.Component {

  constructor(props) {
    super(props);
    const {
      location: { pathname: path },
    } = this.props;
    const challengeId = path.split('/').slice(-1)[0];
    this.props.getChallengeSubmissions(challengeId);
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
        dataSource={this.props.submissions}
        pagination={false}
        style={{margin: '3vh 3vh'}}
      />
    );
  }
}

const mapStateToProps = state => ({
  submissions: state.codeEditorReducer.submissions,
});

const mapDispatchToProps = dispatch => ({
  getChallengeSubmissions: id => dispatch(getChallengeSubmissions(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Submission));