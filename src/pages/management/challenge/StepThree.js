import React from 'react';
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
} from 'antd';

import './Challenge.css';
import { STEP_LENGTH } from '../../../constants';
import {
  updateStepThree,
} from "../../../actions/actions.creator";


class StepThree extends React.Component {

  handlePrev = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepThree(values);
        console.log('Received values of form: ', values);
      }
    });
    this.props.prev();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepThree(values);
        console.log('Received values of form: ', values);
        this.props.next()
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
  testcaseInputFormat: state.challengeReducer.testcaseInputFormat,
  testcaseOutputFormat: state.challengeReducer.testcaseOutputFormat,
});
const mapDispatchToProps = dispatch => ({
	updateStepThree: (payload) => dispatch(updateStepThree(payload)),
});

const WrappedStepThree = Form.create({ name: 'stepThree' })(
  connect(mapStateToProps, mapDispatchToProps)(StepThree)
);

export default WrappedStepThree;