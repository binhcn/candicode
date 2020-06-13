import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Avatar, Tag, Icon,
  Badge, Divider, Rate, Button, List
} from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({});
}

function TutorialList(props) {
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
      dataSource={listData}
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
              width="100%"
              height="100%"
              alt="logo"
              src="https://eponaquest.com/wp-content/uploads/beautiful-scenery.jpg"
            />
          }
        >
          <div>
            <span className="title">
              Eight-queen problem
              </span>
            <Badge className="messages" count={5} style={{ backgroundColor: 'blue', color: 'white', top: '5px' }}>
              <Icon style={{ fontSize: '24px' }} type="message" />
            </Badge>
            <Badge count={15} style={{ backgroundColor: 'green', color: 'white', top: '5px' }}>
              <Icon style={{ fontSize: '24px' }} type="team" />
            </Badge>
          </div>
          <div>
            <Avatar size="large" src="https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/50654668_2359749710921468_7719574428836691968_n.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=A7gnCAwC2DMAX8evK4Z&_nc_ht=scontent-hkt1-1.xx&oh=ad83b5ac0cf79e94fa3657158cc34b08&oe=5EF4FED3" />
            <span style={{ marginLeft: '8px', marginRight: '20%' }}>Binh Cao</span>
            <span>Ngày tạo: <Tag color="magenta">19-5-2019</Tag></span>
          </div>

          <div style={{ margin: '4px 0' }}>Tags: <Tag color="gold">Algorithm</Tag> <Tag color="geekblue">Complexity</Tag></div>
          <div>
            Description: A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure.
            </div>

          <Divider style={{ margin: '4px 0' }} />

          <Rate disabled allowHalf={true} defaultValue={2.5} />
          <span>&nbsp;4.2 (25)</span>
          <Link to="/code-editor">
            <Button type="primary" >Fight</Button>
          </Link>
        </List.Item>
      )}
    />

  );
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialList);
