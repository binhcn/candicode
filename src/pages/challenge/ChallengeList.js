import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Card, Avatar, List, Typography, Tag, Icon,
  Badge, Divider, Rate, Button
} from 'antd';

import {
  getAllChallenges,
} from "../../actions/actions.creator";
import { randomColor, randomBanner } from '../../constants';

class ChallengeList extends React.Component {
  constructor(props) {
    super(props);
    this.props.getAllChallenges();
  }
  render() {
    return (
      <List
        grid={{ gutter: 8, column: 3 }}
        dataSource={this.props.data}
        pagination={{
          onChange: page => {
          },
          pageSize: 9,
        }}
        renderItem={item => (
          <List.Item>
            <Card
              className="challenge-card"
              style={{ width: 250, margin: '2vh auto' }}
              cover={
                <img
                  alt="example"
                  src={item.banner ? item.banner : randomBanner()}
                  height='150px'
                />
              }
            >
              <span>
                <Avatar size="large" src="https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/50654668_2359749710921468_7719574428836691968_n.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=A7gnCAwC2DMAX8evK4Z&_nc_ht=scontent-hkt1-1.xx&oh=ad83b5ac0cf79e94fa3657158cc34b08&oe=5EF4FED3" />
                <span style={{ marginLeft: '8px' }}>{item.author}</span>
                <Badge count={item.numComments} style={{ float: 'right', backgroundColor: 'blue', color: 'white' }}>
                  <Icon style={{ fontSize: '24px' }} type="message" />
                </Badge>
                <Badge count={item.numAttendees} style={{ float: 'right', backgroundColor: 'green', color: 'white' }}>
                  <Icon style={{ fontSize: '24px' }} type="team" />
                </Badge>
              </span>

              <Typography.Paragraph className="title" ellipsis={{ rows: 1, expandable: false }}>
                {item.title}
            </Typography.Paragraph>

            <p className="challenge-level">{item.level}</p>

              <div style={{ margin: '6px 0' }}>Ngôn ngữ: &nbsp;
                {item.language && item.language.map((lang, index) => {
                  return <Tag key={index} color={randomColor()}>{lang}</Tag>
                })}
              </div>

              <div>Tags: &nbsp;
                {item.tags && item.tags.map((tag, index) => {
                  return <Tag key={index} color={randomColor()}>{tag}</Tag>
                })}
              </div>
              <Divider style={{ margin: '8px 0' }} />

              <Rate disabled allowHalf={true} defaultValue={2.5} />
              <span>&nbsp;{item.rate} ({item.numRates})</span>
              <Link to={"/code-editor/" + item.id}>
                <Button type="primary" >Fight</Button>
              </Link>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.challengeReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getAllChallenges: () => dispatch(getAllChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);
