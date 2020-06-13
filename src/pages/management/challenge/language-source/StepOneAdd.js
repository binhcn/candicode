import React from 'react';
import { connect } from "react-redux";
import { Form, Icon, Button, Upload, Select } from 'antd';

import '../Challenge.css';
import {
  updateStepOne, uploadSource, updateStep
} from "../../../../actions/actions.creator";
import { LANGUAGE_SET } from '../../../../constants';

class SourceUpdate extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        
        console.log('Received values of form: ', values);
        this.props.updateStepOne(values);

        const formData = new FormData();
        var step = 1;
        if (values.sourceCode) { 
          formData.append('source', values.sourceCode[0].originFileObj);
          this.props.uploadSource(formData);
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

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="challenge-source-modal">
        <Form.Item label="Language">
          {getFieldDecorator('language', {
            initialValue: this.props.language,
            rules: [{ required: true, message: 'Please select its language!' }],
          })(
            <Select placeholder="Select a language">
              {languageOpt}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Your challenge (.zip)">
          {getFieldDecorator('sourceCode', {
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
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
          Next
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  language: state.challengeReducer.language,
  source: state.challengeReducer.source,
});
const mapDispatchToProps = dispatch => ({
  updateStepOne: payload => dispatch(updateStepOne(payload)),
  updateStep: step => dispatch(updateStep(step)),
  uploadSource: src => dispatch(uploadSource(src)),
});

const WrappedSourceUpdate = Form.create({ name: 'StepOneLanguage' })(
  connect(mapStateToProps, mapDispatchToProps)(SourceUpdate)
);

export default WrappedSourceUpdate;