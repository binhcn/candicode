import React from 'react';
import { connect } from "react-redux";
import {
  Form, Input, Icon, Button, Row, Col,
  Switch, Tooltip, notification,
} from 'antd';

import {
  verifyTestcase, submitTestcase, handleUpdateTestcaseModal,
} from "../../../../actions/actions.creator";


class UpdateTestcase extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, input, output, isPublic } = values;
        if (keys.includes('') || keys.includes('error')) {
          notification['warning']({
            message: 'Validate testcase',
            description: "Please run your testcase input",
            duration: 0,
          });
        } else {
          var data = [];
          this.props.testcases.forEach((item, index) => {
            if (item.input !== input[index] || item.hidden !== isPublic[index]) {
              data.push({
                testcaseId: item.id,
                input: input[index],
                output: output[index],
                hidden: isPublic[index],
              })
            }
          })
          // var result = this.props.submitTestcase({id: this.props.id, data: {testcases: data}})
          // result.then(response => {
          //   notification['success']({
          //     message: 'Successfully',
          //     description: response.message,
          //     duration: 2,
          //   });
          //   this.props.handleUpdateTestcaseModal(false);
          // });
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
            language: "Java",
            input: input[index]
          }
        }
        var data = this.props.verifyTestcase(payload);
        var keys = form.getFieldValue('keys');
        console.log(keys)
        var output = form.getFieldValue('output');
        data.then(result => {
          if (result.validFormat && result.compiled) {
            keys[index] = 'success';
            output[index] = result.output;
          } else {
            keys[index] = 'error';
            output[index] = "none";
            if (!result.validFormat) {
              notification['error']({
                message: `Testcase ${index + 1}: invalid format input`,
                description: result.validFormatError,
                duration: 0,
              });
            } else {
              notification['error']({
                message: `Testcase ${index + 1}: compiled error`,
                description: result.compileError,
                duration: 0,
              });
            }

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
    var { tcInputFormat, testcases } = this.props;
    getFieldDecorator('keys', { initialValue: Array(testcases ? testcases.length : 0).fill('success') });
    var keys = getFieldValue('keys');
    var formItems = Array.isArray(testcases) ? testcases.map((item, index) => (
      <Row key={index} gutter={16}>
        <Col span={11}>
          <span>Testcase {index + 1}</span>
          <Form.Item className="switch">
            {getFieldDecorator(`isPublic[${index}]`, {
              valuePropName: 'checked',
              initialValue: item.hidden,
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
                initialValue: item.input,
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
              initialValue: item.output,
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
  testcases: state.challengeReducer.testcases,
  tcInputFormat: state.challengeReducer.tcInputFormat,
});
const mapDispatchToProps = dispatch => ({
  verifyTestcase: payload => dispatch(verifyTestcase(payload)),
  submitTestcase: payload => dispatch(submitTestcase(payload)),
  handleUpdateTestcaseModal: status => dispatch(handleUpdateTestcaseModal(status)),
});

const WrappedTestcaseUpdate = Form.create({ name: 'updateTestcase' })(
  connect(mapStateToProps, mapDispatchToProps)(UpdateTestcase)
);

export default WrappedTestcaseUpdate;