import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Card, Avatar, Col, Typography, Tag, Icon, 
        Badge, Divider, Rate, Button 
      } from 'antd';

const { Title } = Typography;

function Challenge(props) {
  return (
    <Col xs={24} sm={8}>
      <Card
        className="challenge-card"
        style={{ width: 250, margin: '2vh auto' }}
        cover={
          <img
            alt="example"
            src={props.banner}
          />
        }
      >
        <span>
            <Avatar size="large" src="https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/50654668_2359749710921468_7719574428836691968_n.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=A7gnCAwC2DMAX8evK4Z&_nc_ht=scontent-hkt1-1.xx&oh=ad83b5ac0cf79e94fa3657158cc34b08&oe=5EF4FED3" />
            <span style={{marginLeft: '8px'}}>Binh Cao</span>
            <Badge count={5} style={{float:'right', backgroundColor: 'blue', color: 'white' }}>
              <Icon style={{fontSize:'24px'}} type="unordered-list" />
            </Badge>
            <Badge count={15} style={{float:'right', backgroundColor: 'green', color: 'white' }}>
              <Icon style={{fontSize:'24px'}} type="team" />
            </Badge>
        </span>

        <Title level={4}>
          <Typography.Paragraph ellipsis={{ rows: 1, expandable: false }}>
            {props.title}
          </Typography.Paragraph>
        </Title>

        <p className="challenge-level">Moderate</p>

        <div>Ngôn ngữ: <Tag color="magenta">Java</Tag> <Tag color="red">Python</Tag></div>

        <div>Tags: <Tag color="gold">Algorithm</Tag> <Tag color="geekblue">Complexity</Tag></div>
        <Divider style={{margin: '8px 0'}} />

        <Rate disabled allowHalf={true} defaultValue={2.5} />
        <span>&nbsp;4.2/25</span>
        <Link to="/code-editor">
          <Button type="primary" >Fight</Button>
        </Link>
      </Card>
    </Col>

  );
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
