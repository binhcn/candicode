import React from 'react';
import { connect } from "react-redux";
import {
  Modal, Form, Button, Input,
} from 'antd';
import { withRouter } from 'react-router-dom';

import {
  changeUserPassword,
} from "../../actions/actions.creator";

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.changeUserPassword(values);
      }
      this.onClose();
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 16,
        },
      },
    };
    return (
      <div>
        <Button className="password" type="link" onClick={this.showModal}>
          Change password
        </Button>
        {this.state.visible && 
        <Modal
          className="password-modal"
          title="Change password"
          width="500px"
          visible={this.state.visible}
          onCancel={() => this.onClose(false)}
          footer={null}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label="Old password">
              {getFieldDecorator('oldPassword', {
              })(
                <Input.Password />
              )}
            </Form.Item>

            <Form.Item label="New password">
              {getFieldDecorator('newPassword', {
              })(
                <Input.Password />
              )}
            </Form.Item>

            <Form.Item label="Confirm password">
              {getFieldDecorator('confirmPassword', {
              })(
                <Input.Password />
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>

          </Form>
        </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  changeUserPassword: data => dispatch(changeUserPassword(data)),
});

const WrappedPassword = Form.create({ name: 'password' })(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Password))
);

export default WrappedPassword;
