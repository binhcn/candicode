import React from 'react';
import { connect } from "react-redux";
import { Card, Avatar, Col } from 'antd';

const { Meta } = Card;

function Challenge(props) {
  return (
    <Col xs={24} sm={12} lg={8} xl={6}>
      <Card
        style={{ width: 200, margin: '2vh auto' }}
        hoverable={true}
        cover={
          <img
            alt="example"
            src={props.banner}
          />
        }
      >
        <Meta
          avatar={<Avatar src={props.avatar} />}
          title={props.title}
          description={props.description}
        />
      </Card>
    </Col>

  );
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
