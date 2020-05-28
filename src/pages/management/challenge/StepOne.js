import React from 'react';
import { connect } from "react-redux";
import { Form, Input, Tooltip, Icon, Button, Upload, Select, message } from 'antd';

import './Challenge.css';
import { STEP_LENGTH } from '../../../constants';
import {
  updateStepOne, uploadSource, updateStep,
} from "../../../actions/actions.creator";
import { LANGUAGE_SET, LEVEL_SET } from '../../../constants';

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

        const formData = new FormData();
        var step = 1;
        if (values.source) { 
          formData.append('sourceCode', values.source[0].originFileObj);
          this.props.uploadSource(formData);
          this.props.updateStep(step);
        } else {
          this.props.updateStep(step);
        }
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

    const languageOpt = LANGUAGE_SET.sort().map(language => (
      <Select.Option key={language} value={language}>{language}</Select.Option>
    ));

    const levelOpt = LEVEL_SET.sort().map(level => (
      <Select.Option key={level} value={level}>{level}</Select.Option>
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
          {getFieldDecorator('title', {
            initialValue: this.props.title,
            validateTrigger: ['onBlur'],
            rules: [{ 
              required: true, message: "Please input your new challenge's name!", 
              whitespace: true 
            }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Level" hasFeedback>
          {getFieldDecorator('level', {
            initialValue: this.props.level,
            rules: [{ required: true, message: 'Please select its level!' }],
          })(
            <Select placeholder="Please select a level">
              {levelOpt}
            </Select>,
          )}
        </Form.Item>
        {this.props.id === '' && 
          <Form.Item label="Language" hasFeedback>
            {getFieldDecorator('language', {
              initialValue: this.props.language,
              rules: [{ required: true, message: 'Please select its language!' }],
            })(
              <Select placeholder="Please select a language">
                {languageOpt}
              </Select>,
            )}
          </Form.Item>
        }
        {this.props.id === '' && 
          <Form.Item label="Your challenge (.zip)">
            {getFieldDecorator('source', {
              initialValue: this.props.source,
              rules: [{ required: true, message: 'Please select project source!' }],
              valuePropName: 'fileList',
              getValueFromEvent: (e) => { return [e.file]; },
            })(
              <Upload 
                name="source"
                method="get"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
        }
        <Form.Item label="Your banner">
          {getFieldDecorator('banner', {
            initialValue: this.props.banner,
            valuePropName: 'file',
            getValueFromEvent: (e) => { return e.file.originFileObj; }
          })(
            <Upload
              name="banner"
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
        <Form.Item {...tailFormItemLayout}>
          {this.props.currentStep < STEP_LENGTH - 1 && (
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
  id: state.challengeReducer.id,
  title: state.challengeReducer.title,
  source: state.challengeReducer.source,
  language: state.challengeReducer.language,
  level: state.challengeReducer.level,
  banner: state.challengeReducer.banner,
  imageUrl: state.challengeReducer.imageUrl,
  projectStructure: state.challengeReducer.projectStructure,
  currentStep: state.challengeReducer.currentStep,
});
const mapDispatchToProps = dispatch => ({
  updateStepOne: (payload) => dispatch(updateStepOne(payload)),
  uploadSource: (payload) => dispatch(uploadSource(payload)),
  updateStep: (payload) => dispatch(updateStep(payload)),
});

const WrappedStepOne = Form.create({ name: 'stepOne' })(
  connect(mapStateToProps, mapDispatchToProps)(StepOne)
);

export default WrappedStepOne;