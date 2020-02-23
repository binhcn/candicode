import React from 'react';
import { connect } from "react-redux";
import {
  Form,
  Button,
  Cascader,
  Input,
} from 'antd';

import './NewChallenge.css';
import { STEP_LENGTH } from '../../constants';
import {
  updateStepTwo,
} from "../../actions/actions.creator";

const directoryTree = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
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

const { TextArea } = Input;

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
          {getFieldDecorator('editedFile', {
            initialValue: this.props.editedFile,
            rules: [
              { type: 'array', required: true, message: 'Please select your edited file!' },
            ],
          })(<Cascader options={directoryTree} />)}
        </Form.Item>
        <Form.Item label="Running commands">
          {getFieldDecorator('commands', {
            initialValue: this.props.commands,
            rules: [
              { required: true, message: 'Please select your running commands!' },
            ],
          })(<TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
          />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.current < STEP_LENGTH - 1 && (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
          {this.props.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
              Previous
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  editedFile: state.newChallengeReducer.editedFile,
  commands: state.newChallengeReducer.commands,
});
const mapDispatchToProps = dispatch => ({
	updateStepTwo: (payload) => dispatch(updateStepTwo(payload)),
});

const WrappedStepTwo = Form.create({ name: 'stepTwo' })(
  connect(mapStateToProps, mapDispatchToProps)(StepTwo)
);

export default WrappedStepTwo;