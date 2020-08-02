import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  Avatar, Tag, Icon,
  Badge, Divider, Button, List
} from 'antd';

import {
  getAllContests,
} from "../../actions/actions.creator";
import { randomColor, randomBanner, } from '../../constants';
import { getAvatarColor } from '../../util/Colors';

class ContestList extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { search: params },
    } = this.props;
    this.props.getAllContests(params);
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
          pageSize: 2,
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
                src={item.banner ? item.banner : randomBanner()}
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

              <Badge className="messages" count={0} style={{ backgroundColor: 'blue', color: 'white', top: '5px' }}>
                <Icon style={{ fontSize: '24px' }} type="message" />
              </Badge>
              <Badge count={0}>
                <Icon style={{ fontSize: '24px', color: 'red' }} theme="filled" type="heart" />
              </Badge>
            </div>

            <div>
              {item.author &&
                <Avatar size="large" style={{ backgroundColor: getAvatarColor(item.author) }}
                  src="">
                  {item.author[0].toUpperCase()}
                </Avatar>
              }
              <span style={{ marginLeft: '8px', marginRight: '20%' }}>{item.author}</span>
              <span>Hạn đăng ký: <Tag color="magenta">
                {typeof item.registrationDeadline === 'string' &&
                  item.registrationDeadline.substring(0, item.registrationDeadline.length - 7)
                }
              </Tag></span>
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

            <Link to={'/contests/' + item.id}>
              <Button type="primary" >View details</Button>
            </Link>

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
  getAllContests: params => dispatch(getAllContests(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContestList));
