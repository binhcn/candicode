import React from 'react';
import { Table, Button, Modal } from 'antd';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { ControlledEditor } from '@monaco-editor/react';

import {
  getChallengeSubmissions, getSubmissionDetails,
} from "../../actions/actions.creator";

class Submission extends React.Component {

  constructor(props) {
    super(props);
    const {
      location: { pathname: path },
    } = this.props;
    const challengeId = path.split('/').slice(-1)[0];
    this.props.getChallengeSubmissions(challengeId);
  }

  showSubmissionModel = id => {
    var resp = this.props.getSubmissionDetails(id);
    resp.then(response => {
      Modal.info({
        title: 'Submission details',
        content: (
          <ControlledEditor height='50vh'
            theme='dark'
            value={response.data.result.code}
            language={response.data.result.language}
          />
        ),
        width: "800px",
        onOk() { },
      });
    })

  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
      },
      {
        title: 'Submitted at',
        dataIndex: 'submitAt',
        render: (item, record) => {
          return (
            <Button type='link' onClick={() => this.showSubmissionModel(record.id)}>
              {item}
            </Button>
          )
        }
      },
      {
        title: 'Language',
        dataIndex: 'language',
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
        style={{ margin: '3vh 3vh' }}
      />
    );
  }
}

const mapStateToProps = state => ({
  submissions: state.codeEditorReducer.submissions,
});

const mapDispatchToProps = dispatch => ({
  getChallengeSubmissions: id => dispatch(getChallengeSubmissions(id)),
  getSubmissionDetails: id => dispatch(getSubmissionDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Submission));