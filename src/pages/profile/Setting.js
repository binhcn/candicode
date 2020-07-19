import React from 'react';
import { connect } from "react-redux";
import {
  Drawer, Form, Button, Upload, Input,
  Icon, message, Row, Col,
} from 'antd';

import {
  updateUserProfile,
} from "../../actions/actions.creator";
import Password from './Password';

function getBase64(img, callback) {
  console.log(img)
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: "",
      visible: false,
    };
    if (this.props.banner) {
      getBase64(this.props.banner, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        });
      });
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    console.log(info)
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        });
      }
      );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('slogan', values.slogan);
        formData.append('facebook', values.facebook);
        formData.append('github', values.github);
        formData.append('linkedin', values.linkedin);
        formData.append('location', values.location);
        formData.append('company', values.company);
        formData.append('university', values.university);
        var payload = { formData: formData, data: values };
        this.props.updateUserProfile(payload);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload avatar</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="setting" /> Setting
        </Button>
        <Drawer
          title="Setting"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row>
              <Col span={4}>
                <Form.Item className="upload-avatar">
                  {getFieldDecorator('avatar', {
                    initialValue: this.props.banner,
                    valuePropName: 'file',
                    getValueFromEvent: (e) => { return e.file.originFileObj; }
                  })(
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      method="get"
                      beforeUpload={beforeUpload}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>,
                  )}
                </Form.Item>
              </Col>
              <Row>
                <Col span={10}>
                  <Form.Item label="First name">
                    {getFieldDecorator('firstName', {
                      initialValue: this.props.currentUser.firstName,
                      validateTrigger: ['onBlur'],
                      rules: [{
                        required: true, message: "Please input your first name!",
                        whitespace: true
                      }],
                    })(<Input style={{ width: "150%" }} />)}
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="Last name">
                    {getFieldDecorator('lastName', {
                      initialValue: this.props.currentUser.lastName,
                      validateTrigger: ['onBlur'],
                      rules: [{
                        required: true, message: "Please input your last name!",
                        whitespace: true
                      }],
                    })(<Input style={{ width: "150%" }} />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={2} />
                <Col span={16}>
                  <Form.Item label="Slogan">
                    {getFieldDecorator('slogan', {
                      initialValue: this.props.currentUser.slogan,
                      validateTrigger: ['onBlur'],
                      rules: [{
                        whitespace: true
                      }],
                    })(<Input style={{ width: "150%" }} />)}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Password />
                </Col>
              </Row>
            </Row>
            <Form.Item label="Facebook">
              {getFieldDecorator('facebook', {
                initialValue: this.props.currentUser.facebook,
                validateTrigger: ['onBlur'],
                rules: [{
                  whitespace: true
                }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Github">
              {getFieldDecorator('github', {
                initialValue: this.props.currentUser.github,
                validateTrigger: ['onBlur'],
                rules: [{
                  whitespace: true
                }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Linkedin">
              {getFieldDecorator('linkedin', {
                initialValue: this.props.currentUser.linkedin,
                validateTrigger: ['onBlur'],
                rules: [{
                  whitespace: true
                }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Location">
              {getFieldDecorator('location', {
                initialValue: this.props.currentUser.location,
                validateTrigger: ['onBlur'],
                rules: [{
                  whitespace: true
                }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Company">
              {getFieldDecorator('company', {
                initialValue: this.props.currentUser.company,
                validateTrigger: ['onBlur'],
                rules: [{
                  whitespace: true
                }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="University">
              {getFieldDecorator('university', {
                initialValue: this.props.currentUser.university,
                validateTrigger: ['onBlur'],
                rules: [{
                  whitespace: true
                }],
              })(<Input />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
});
const mapDispatchToProps = dispatch => ({
  updateUserProfile: payload => dispatch(updateUserProfile(payload)),
});

const WrappedSetting = Form.create({ name: 'setting' })(
  connect(mapStateToProps, mapDispatchToProps)(Setting)
);

export default WrappedSetting;
