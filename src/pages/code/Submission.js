import React from 'react';
import { Table } from 'antd';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import {
  getChallengeSubmissions,
} from "../../actions/actions.creator";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Submitted at',
    dataIndex: 'submittedAt',
  },
];

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    id: i+1,
    name: `Submission ${i+1}`,
    submittedAt: moment().fromNow(),
  });
}

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
        dataSource={data}
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