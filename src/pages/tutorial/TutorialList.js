import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Avatar, Tag, Icon,
  Badge, Divider, Button, List
} from 'antd';
import { withRouter } from 'react-router-dom';

import {
  getAllTutorials,
} from "../../actions/actions.creator";
import { randomColor } from '../../constants';
import { getAvatarColor } from '../../util/Colors';

class TutorialList extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { search: params },
    } = this.props;
    this.props.getAllTutorials(params);
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
            className="tutorial-item"
            extra={
              <img
                alt="logo"
                width="100%"
                height="100%"
                src={item.banner ? item.banner : "tutorial.png"}
              />
            }
          >
            <div>
              <span className="title">
                {item.title}
              </span>
              <Badge className="messages"
                count={item.numComments}
                style={{ backgroundColor: 'blue', color: 'white', top: '5px' }}
              >
                <Icon style={{ fontSize: '24px' }} type="message" />
              </Badge>
              <Badge count={0}>
                <Icon style={{ fontSize: '24px', color: 'red' }} theme="filled" type="heart" />
              </Badge>
            </div>
            <div>
              {item &&
                <Avatar size="large" style={{ backgroundColor: getAvatarColor(item.author) }}
                  src="">
                  {item.author[0].toUpperCase()}
                </Avatar>
              }
              <span style={{ marginLeft: '8px', marginRight: '20%' }}>{item.author}</span>
              <span>Ngày tạo:
                  <Tag color="magenta">
                  {item.createdAt.substring(0, item.createdAt.length - 7)}
                </Tag>
              </span>
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
              {item.likes}
              <Icon type="dislike" />
              {item.dislikes}

              <Link to={'/tutorials/' + item.id}>
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
  data: state.tutorialReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getAllTutorials: params => dispatch(getAllTutorials(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialList));
