import React from 'react';
import { connect } from "react-redux";
import { Form, Icon, Button, Upload, Select, message } from 'antd';

import './Challenge.css';
import {
  updateStepOne, handleSourceModal, updateLanguage,
} from "../../../actions/actions.creator";
import { uploadSource } from '../../../services/project.services';
import { LANGUAGE_SET } from '../../../constants';

class SourceUpdate extends React.Component {
  state = {
    removedSource: [],
  };

  handleChange = removedSource => {
    this.setState({ removedSource });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.props.updateStepOne(values);
        console.log('Received values of form: ', values);

        const formData = new FormData();
        if (values.source) { 
          formData.append('language', values.language);
          formData.append('sourceFile', values.source[0].originFileObj);
          formData.append('removedSource', values.removedSource);
          // uploadSource(formData);
        }
        this.props.updateLanguage(values);
        this.props.handleSourceModal(false);
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
    
    const { removedSource } = this.state;
    const filteredOptions = this.props.language.filter(item => !removedSource.includes(item));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="challenge-source-modal">
        <Form.Item label="Language" hasFeedback>
          {getFieldDecorator('addedLanguage', {
            // rules: [{ required: true, message: 'Please select its language!' }],
          })(
            <Select placeholder="Select a language">
              {languageOpt}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Your challenge (.zip)">
          {getFieldDecorator('source', {
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
        <Form.Item label="Remove source:" hasFeedback>
          {getFieldDecorator('removedLanguage', {
            // rules: [{ required: true, message: 'Please select its language!' }],
          })(
            <Select
              mode="multiple"
              placeholder="Language inserted are removed"
              onChange={this.handleChange}
            >
              {filteredOptions.map(item => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Finish
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  language: state.challengeReducer.language,
});
const mapDispatchToProps = dispatch => ({
  updateStepOne: (payload) => dispatch(updateStepOne(payload)),
  handleSourceModal: status => dispatch(handleSourceModal(status)),
  updateLanguage: payload => dispatch(updateLanguage(payload)),
});

const WrappedSourceUpdate = Form.create({ name: 'sourceUpdate' })(
  connect(mapStateToProps, mapDispatchToProps)(SourceUpdate)
);

export default WrappedSourceUpdate;