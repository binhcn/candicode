import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Cascader, Input } from 'antd';

import './Challenge.css';
import { STEP_LENGTH } from '../../../constants';
import {
  updateStepTwo,
} from "../../../actions/actions.creator";

const directoryTree = [
  {
    value: 'zhejiang',
    label: 'Zhejiang_label',
    type: "directory",
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou_label',
        type: "directory",
        children: [
          {
            value: 'xihu',
            label: 'West Lake_label',
            type: "directory",
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

class StepTwo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepTwo(values);
        console.log('Received values of form: ', values);
        this.props.next()
      }
    });
  };

  handlePrev = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepTwo(values);
        console.log('Received values of form: ', values);
        this.props.prev()
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
            // rules: [
            //   { type: 'array', required: true, message: 'Please select your edited file!' },
            // ],
          })(<Cascader options={directoryTree} />)}
        </Form.Item>
        <Form.Item label="Build path">
          {getFieldDecorator('buildPath', {
            initialValue: this.props.buildPath,
            // rules: [
            //   { type: 'array', required: true, message: 'Please select your build path!' },
            // ],
          })(<Cascader options={directoryTree} />)}
        </Form.Item>
        <Form.Item label="Testcase Input Format" >
          {getFieldDecorator('testcaseInputFormat', {
            initialValue: this.props.testcaseInputFormat,
            // rules: [{ required: true, message: "Please input your testcase input format!", whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Testcase Output Format" >
          {getFieldDecorator('testcaseOutputFormat', {
            initialValue: this.props.testcaseOutputFormat,
            // rules: [{ required: true, message: "Please input your testcase output format!", whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.current < STEP_LENGTH - 1 && (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
          {this.props.current > 0 && (
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
  testcaseInputFormat: state.challengeReducer.testcaseInputFormat,
  testcaseOutputFormat: state.challengeReducer.testcaseOutputFormat,
});
const mapDispatchToProps = dispatch => ({
	updateStepTwo: (payload) => dispatch(updateStepTwo(payload)),
});

const WrappedStepTwo = Form.create({ name: 'stepTwo' })(
  connect(mapStateToProps, mapDispatchToProps)(StepTwo)
);

export default WrappedStepTwo;