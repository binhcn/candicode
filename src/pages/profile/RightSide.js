import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Table } from 'antd';
import { connect } from "react-redux";

import {
  getProfileSubmissions,
} from "../../actions/actions.creator";

import './Profile.css';

const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
  },
  {
    title: 'Challenge',
    dataIndex: 'challengeTitle',
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

class RightSide extends Component {

  constructor(props) {
    super(props);
    this.props.getProfileSubmissions();
  }

	render() {
		return (
			<div className="rightside-profile">
				<CalendarHeatmap
					startDate={new Date('2019-1-1')}
					endDate={new Date('2019-11-20')}

					values={[
						{ date: '2019-11-1', count: 1 },
						{ date: '2019-11-10', count: 4 },
						{ date: '2019-11-15', count: 2 },
					]}
					classForValue={(value) => {
						if (!value) {
							return 'color-empty';
						}
						return `color-scale-${value.count}`;
					}}
				/>

        <div className="table-title">RECENT HISTORY</div>

				<Table
					columns={columns}
					dataSource={this.props.submissions}
					bordered
					pagination={false}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  submissions: state.userReducer.submissions,
});

const mapDispatchToProps = dispatch => ({
  getProfileSubmissions: () => dispatch(getProfileSubmissions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSide);