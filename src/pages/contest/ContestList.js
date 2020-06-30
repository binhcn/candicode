import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Avatar, Tag, Icon,
  Badge, Divider, Button, List
} from 'antd';

import {
  getAllContests,
} from "../../actions/actions.creator";
import { randomColor } from '../../constants';

class ContestList extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAllContests();
  }
  render() {
    return (
      <List
        itemLayout="vertical"
        size="large"
        split={false}
        pagination={{
          onChange: page => {
          },
          pageSize: 3,
        }}
        dataSource={this.props.data}
        // header={
        //   <Button>
        //     <b>ant design</b> &nbsp; footer part
        //   </Button>
        // }
        renderItem={item => (
          <List.Item
            className="contest-item"
            extra={
              <img
                width="100%"
                height="100%"
                alt="logo"
                src="https://eponaquest.com/wp-content/uploads/beautiful-scenery.jpg"
              />
            }
          >
            <div style={{ height: '0px' }}>
              <p className="contest-status">{item.status}</p>
            </div>
            <div className="contest-header">
              <span className="title">
                {item.title}
              </span>

              <Badge className="messages" count={5} style={{ backgroundColor: 'blue', color: 'white', top: '5px' }}>
                <Icon style={{ fontSize: '24px' }} type="message" />
              </Badge>
              <Badge count={0}>
                <Icon style={{ fontSize: '24px', color: 'red' }} theme="filled" type="heart" />
              </Badge>
            </div>

            <div>
              <Avatar size="large" src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-1/p160x160/50654668_2359749710921468_7719574428836691968_n.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=O6ZrNsDjdC4AX8SXrUI&_nc_ht=scontent-xsp1-1.xx&_nc_tp=6&oh=57d32bad83905fe4a9990e4f1843ac91&oe=5F1D9F6A" />
              <span style={{ marginLeft: '8px', marginRight: '20%' }}>{item.author}</span>
              <span>Ngày tạo: <Tag color="magenta">{
                item.registrationDeadline.substring(0, item.registrationDeadline.length - 4)
              }</Tag></span>
            </div>

            <div style={{ margin: '4px 0' }}>Tags:
              {item.tagList && item.tagList.map((tag, index) => {
              return <Tag key={index} color={randomColor()}>{tag}</Tag>
            })}
            </div>
            <div className="description">
              Description: {item.description}
            </div>

            <Divider style={{ margin: '4px 0' }} />

            <div className="like-dislike">
              <Icon type="like" />
              {item.likes > 0 ? item.likes : 9}
              <Icon type="dislike" />
              {item.dislikes > 0 ? item.dislikes : 3}

              <Link to={'/contests/' + item.id}>
                <Button type="primary" >Read</Button>
              </Link>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.contestReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getAllContests: () => dispatch(getAllContests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestList);
