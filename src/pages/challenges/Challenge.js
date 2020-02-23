import React from 'react';
import { connect } from "react-redux";
import { Card, Avatar, Col } from 'antd';

const { Meta } = Card;

function Challenge() {
  return (
    <Col xs={24} sm={12} lg={8} xl={6}>
      <Card
        style={{ width: 250, margin: '2vh auto' }}
        cover={
          <img
            alt="example"
            src="https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg"
          />
        }
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Card title"
          description="This is the description"
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
