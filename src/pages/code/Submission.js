import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

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

export default class App extends React.Component {

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