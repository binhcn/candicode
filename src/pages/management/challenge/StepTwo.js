import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Cascader, Input } from 'antd';

import './Challenge.css';
import { STEP_LENGTH } from '../../../constants';
import {
  updateStepTwo, updateStep,
} from "../../../actions/actions.creator";

class StepTwo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepTwo(values);
        console.log('Received values of form: ', values);
        const step = 1;
        this.props.updateStep(step);
      }
    });
  };

  handlePrev = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepTwo(values);
        console.log('Received values of form: ', values);
        const step = -1;
        this.props.updateStep(step);
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

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Edited file">
          {getFieldDecorator('targetPath', {
            initialValue: this.props.targetPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your edited file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Build file">
          {getFieldDecorator('buildPath', {
            initialValue: this.props.buildPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your build path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Prototype file">
          {getFieldDecorator('editPath', {
            initialValue: this.props.editPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your prototype file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Testcase Input Format" >
          {getFieldDecorator('tcInputFormat', {
            initialValue: this.props.tcInputFormat,
            validateTrigger: ['onBlur'],
            rules: [{ required: true, message: "Please input your testcase input format!", whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Testcase Output Format" >
          {getFieldDecorator('tcOutputFormat', {
            initialValue: this.props.tcOutputFormat,
            validateTrigger: ['onBlur'],
            rules: [{ required: true, message: "Please input your testcase output format!", whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.currentStep < STEP_LENGTH - 1 && (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
          {this.props.currentStep > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={this.handlePrev}>
              Previous
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  targetPath: state.challengeReducer.targetPath,
  buildPath: state.challengeReducer.buildPath,
  editPath: state.challengeReducer.editPath,
  tcInputFormat: state.challengeReducer.tcInputFormat,
  tcOutputFormat: state.challengeReducer.tcOutputFormat,
  projectStructure: state.challengeReducer.projectStructure,
  currentStep: state.challengeReducer.currentStep,
});
const mapDispatchToProps = dispatch => ({
	updateStepTwo: (payload) => dispatch(updateStepTwo(payload)),
	updateStep: (payload) => dispatch(updateStep(payload)),
});

const WrappedStepTwo = Form.create({ name: 'stepTwo' })(
  connect(mapStateToProps, mapDispatchToProps)(StepTwo)
);

export default WrappedStepTwo;