import React from 'react';
import { connect } from "react-redux";
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

function Router(props) {
  return (
    <Card
    style={{ width: 300 }}
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
  );
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
