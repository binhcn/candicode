import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Cascader, Select, Checkbox, } from 'antd';

import './Challenge.css';
import { STEP_LENGTH, TESTCASE_FORMAT_SET } from '../../../constants';
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

    const testcaseFormatOpt = TESTCASE_FORMAT_SET.map(type => (
      <Select.Option key={type} value={type}>{type}</Select.Option>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Compiled file path">
          {getFieldDecorator('compilePath', {
            initialValue: this.props.compilePath,
            rules: [
              { type: 'array', required: true, message: 'Please select your compiled file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Run file path">
          {getFieldDecorator('runPath', {
            initialValue: this.props.runPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your run file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Implemented file path">
          {getFieldDecorator('implementedPath', {
            initialValue: this.props.implementedPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your implemented file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Non-implemented file path">
          {getFieldDecorator('nonImplementedPath', {
            initialValue: this.props.nonImplementedPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your non-implemented file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Testcase Input Format" >
          {getFieldDecorator('tcInputFormat', {
            initialValue: this.props.tcInputFormat,
            validateTrigger: ['onBlur'],
            rules: [{ required: true, message: "Please input your testcase input format!" }],
          })(
            <Select mode="multiple" style={{ width: '100%' }}>
              {testcaseFormatOpt}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Testcase Output Format" >
          {getFieldDecorator('tcOutputFormat', {
            initialValue: this.props.tcOutputFormat,
            validateTrigger: ['onBlur'],
            rules: [{ required: true, message: "Please input your testcase output format!" }],
          })(
            <Select mode="multiple" style={{ width: '100%' }}>
              {testcaseFormatOpt}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Is contest challenge?" >
          {getFieldDecorator('contestChallenge', {
            valuePropName: 'checked',
            initialValue: this.props.contestChallenge,
            validateTrigger: ['onBlur'],
          })(
            <Checkbox />
          )}
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
  compilePath: state.challengeReducer.compilePath,
  runPath: state.challengeReducer.runPath,
  implementedPath: state.challengeReducer.implementedPath,
  nonImplementedPath: state.challengeReducer.nonImplementedPath,
  tcInputFormat: state.challengeReducer.tcInputFormat,
  tcOutputFormat: state.challengeReducer.tcOutputFormat,
  contestChallenge: state.challengeReducer.contestChallenge,
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