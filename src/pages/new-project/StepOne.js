import React from 'react';
import { connect } from "react-redux";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Upload,
  Select,
  message
} from 'antd';

import './NewChallenge.css';
import { STEP_LENGTH } from '../../constants';
import {
  updateStepOne,
} from "../../actions/actions.creator";

const { Option } = Select;

const languageSet = [
  'Java',
  'Python',
  'C',
  'C++',
  'SQL',
  'Golang',
  'Javascript',
]

function getBase64(img, callback) {
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

class StepOne extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.imageUrl,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
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
        const payload = Object.assign({}, values, {imageUrl: this.state.imageUrl});
        this.props.updateStepOne(payload);
        console.log('Received values of form: ', payload);
        this.props.next()
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return [e.file];
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

    const languageOpt = languageSet.sort().map(language => (
      <Option key={language} value={language}>{language}</Option>
    ));

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span>
              Challenge name&nbsp;
              <Tooltip title="What is your new challenge's name?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('name', {
            initialValue: this.props.name,
            rules: [{ required: true, message: "Please input your new challenge's name!", whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Your challenge (.zip)">
          {getFieldDecorator('source', {
            initialValue: this.props.source,
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label="Language" hasFeedback>
          {getFieldDecorator('language', {
            initialValue: this.props.language,
            rules: [{ required: true, message: 'Please select your language!' }],
          })(
            <Select placeholder="Please select a language">
              {languageOpt}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Your banner">
          {getFieldDecorator('banner', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="banner"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.current < STEP_LENGTH - 1 && (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  name: state.newChallengeReducer.name,
  source: state.newChallengeReducer.source,
  language: state.newChallengeReducer.language,
  banner: state.newChallengeReducer.banner,
  imageUrl: state.newChallengeReducer.imageUrl,
});
const mapDispatchToProps = dispatch => ({
	updateStepOne: (payload) => dispatch(updateStepOne(payload)),
});

const WrappedStepOne = Form.create({ name: 'stepOne' })(
  connect(mapStateToProps, mapDispatchToProps)(StepOne)
);

export default WrappedStepOne;