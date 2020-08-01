import React from 'react';
import { Badge, Icon, Dropdown, List, Avatar } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import './Notification.css';
import {
  getAllContests, getContestDetails,
} from "../../actions/actions.creator";

class Notification extends React.Component {

  render() {
    var { incomingContests, notificationCount } = this.props;
    incomingContests.forEach(item => {
      setTimeout(() => {
        this.props.getAllContests();
        this.props.getContestDetails(item.contestId)
      }, item.incoming * 60 * 1000);
    });
    let notification = (
      <div className="demo-infinite-container">
            <List
              dataSource={incomingContests}
              renderItem={item => (
                <List.Item key={item.contestId}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={64} src={item.banner} />
                    }
                    title={<Link to={`/contests/${item.contestId}`}>{item.name}</Link>}
                    description={`The contest happens in ${item.incoming} minutes`}
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
  getAllContests: params => dispatch(getAllContests(params)),
  getContestDetails: id => dispatch(getContestDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);