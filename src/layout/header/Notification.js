import React from 'react';
import { Badge, Icon, Dropdown, List, Avatar } from 'antd';
import { connect } from "react-redux";
import reqwest from 'reqwest';

import './Notification.css';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class Notification extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.fetchData(res => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  render() {
    var { incomingContests, notificationCount } = this.props;
    let notification = (
      <div className="demo-infinite-container">
            <List
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email + " " + item.email}
                  />
                </List.Item>
              )}
            />
        </div>
    );
    return (
      <Dropdown overlay={notification} trigger={['click']}>
        <Badge count={notificationCount} overflowCount={10} onClick={() => this.setState({count: 0})}>
          <Icon type="bell" theme="twoTone" twoToneColor="red" style={{ fontSize: '20px' }} />
        </Badge>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  incomingContests: state.userReducer.incomingContests,
  notificationCount: state.userReducer.notificationCount,
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);