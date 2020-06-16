import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Table } from 'antd';

import './Profile.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];


export default class RightSide extends Component {
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
					dataSource={data}
					bordered
					pagination={false}
				/>
			</div>
		)
	}
}
