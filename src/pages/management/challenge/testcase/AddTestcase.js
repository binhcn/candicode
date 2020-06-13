import React from 'react';
import { connect } from "react-redux";
import {
  Form, Input, Icon, Button, Row, Col,
  Switch, Tooltip, notification,
} from 'antd';

import {
  verifyTestcase, submitTestcase, handleTestcaseModal,
} from "../../../../actions/actions.creator";


class AddTestcase extends React.Component {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    keys.splice(k, 1);
    form.setFieldsValue({
      keys: keys,
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat("");
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, input, output, isPublic } = values;
        if (keys.includes('') || keys.includes('error')) {
          notification['warning']({
            message: 'Validate testcase',
            description: "Please run your testcase input or fix bugs",
            duration: 0,
          });
        } else {
          var data = [];
          input.forEach((item, index) => {
            data.push({
              input: input[index],
              output: output[index],
              hidden: isPublic[index],
            })
          })
          var result = this.props.submitTestcase({id: this.props.id, data: {testcases: data}})
          result.then(response => {
            notification['success']({
              message: 'Successfully',
              description: response.message,
              duration: 2,
            });
            this.props.handleTestcaseModal(false);
          });
        }
      }
    });
  };

  runTestcase = index => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { form } = this.props;
        const input = form.getFieldValue('input');
        var payload = {
          id: this.props.id,
          data: {
            input: input[index]
          }
        }
        var data = this.props.verifyTestcase(payload);
        var keys = form.getFieldValue('keys');
        var output = form.getFieldValue('output');
        data.then(result => {
          if (result.validFormat) {
            result.details.forEach(item => {
              if (item.compiled) {
                keys[index] = 'success';
                output[index] = item.output;
              } else {
                keys[index] = 'error';
                output[index] = "none";
                notification['error']({
                  message: `Testcase ${index + 1}: compiled error`,
                  description: item.compileError ? item.compileError : item.runtimeError,
                  duration: 0,
                });
              }
            })
          } else {
            keys[index] = 'error';
            output[index] = "none";
            notification['error']({
              message: `Testcase ${index + 1}: invalid format input`,
              description: result.validFormatError,
              duration: 0,
            });
          }
          form.setFieldsValue({
            keys: keys,
            output: output,
          });
        })
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    var keys = getFieldValue('keys');
    var { tcInputFormat } = this.props;
    var formItems = Array.isArray(keys) ? keys.map((item, index) => (
      <Row key={index} gutter={16}>
        <Col span={11}>
          {keys.length > 0 ? (
            <Icon
              type="minus-circle-o"
              onClick={() => this.remove(index)}
              className="remove-testcase-icon"
            />
          ) : null}
          <span>Testcase {index + 1}</span>
          <Form.Item className="switch">
            {getFieldDecorator(`isPublic[${index}]`, {
              valuePropName: 'checked',
              initialValue: true,
            })(<Switch />)}
            <Tooltip title="Is public testcase?" className="is-public-testcase-icon">
              <Icon type="question-circle-o" />
            </Tooltip>
          </Form.Item>
          {tcInputFormat.format && tcInputFormat.format.map((input, idx) => (
            <Form.Item
              required={false}
              key={idx}
            >
              {getFieldDecorator(`input[${index * tcInputFormat.numArgs + idx}]`, {
                validateTrigger: ['onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter testcase input",
                  },
                ],
              })(<Input placeholder={input} style={{ width: '100%', marginRight: 4 }} />)}
            </Form.Item>
          ))}
        </Col>
        <Col span={13}>
          <Form.Item className="output" hasFeedback validateStatus={keys[index]}>
            {getFieldDecorator(`output[${index}]`, {
            })(<Input placeholder="output" disabled={true} style={{ width: '85%' }} />)}
            <Button type="link" onClick={() => this.runTestcase(index)}>
              Run
            </Button>
          </Form.Item>
        </Col>
      </Row>
    )) : null;
    return (
      <Form onSubmit={this.handleSubmit} className="testcase-update">
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add testcase
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  id: state.challengeReducer.id,
  tcInputFormat: state.challengeReducer.tcInputFormat,
});
const mapDispatchToProps = dispatch => ({
  verifyTestcase: payload => dispatch(verifyTestcase(payload)),
  submitTestcase: payload => dispatch(submitTestcase(payload)),
  handleTestcaseModal: status => dispatch(handleTestcaseModal(status)),
});

const WrappedTestcaseUpdate = Form.create({ name: 'addTestcase' })(
  connect(mapStateToProps, mapDispatchToProps)(AddTestcase)
);

export default WrappedTestcaseUpdate;