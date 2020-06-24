import React from 'react';
import { connect } from "react-redux";
import {
  Form, Input, Icon, Button, Row, Col,
  Switch, Tooltip, notification,
} from 'antd';

import {
  verifyTestcase, handleUpdateTestcaseModal,
  editTestcase,
} from "../../../../actions/actions.creator";


class UpdateTestcase extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, input, output, isHidden } = values;
        var { tcInputFormat } = this.props;
        if (keys.includes('') || keys.includes('error')) {
          notification['warning']({
            message: 'Validate testcase',
            description: "Please run your testcase input",
            duration: 0,
          });
        } else {
          var data = [];
          this.props.testcases.forEach((item, index) => {
            var formattedInput = input.filter((itm, idx) =>
                idx >= index * tcInputFormat.numArgs && idx < (index + 1) * tcInputFormat.numArgs)
                .reduce((accumulator, currentValue) => accumulator + '|' + currentValue);
            if (item.input !== formattedInput || item.hidden !== isHidden[index]) {
              data.push({
                testcaseId: item.testcaseId,
                input: formattedInput.replace(/\s/g, ''),
                output: output[index].replace(/\s/g, ''),
                hidden: isHidden[index],
              })
            }
          })
          if (data.length > 0) {
            var response = this.props.editTestcase({ id: this.props.id, data: { testcases: data } })
            response.then(result => {
              notification['success']({
                message: 'Successfully',
                description: result.message,
                duration: 2,
              });
              this.props.handleUpdateTestcaseModal(false);
            });
          } else {
            notification['success']({
              message: 'Candicode',
              description: 'Edited 0 testcases successfully',
              duration: 2,
            });
            this.props.handleUpdateTestcaseModal(false);
          }

        }
      }
    });
  };

  runTestcase = index => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { form, tcInputFormat } = this.props;
        const inputList = form.getFieldValue('input');
        var formattedInput = inputList.filter((input, idx) =>
            idx >= index * tcInputFormat.numArgs && idx < (index + 1) * tcInputFormat.numArgs)
            .reduce((accumulator, currentValue) => accumulator + '|' + currentValue);

        var payload = {
          id: this.props.id,
          data: {
            input: formattedInput.replace(/\s/g, '')
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
    var { tcInputFormat, testcases } = this.props;
    getFieldDecorator('keys', { initialValue: Array(testcases ? testcases.length : 0).fill('success') });
    var keys = getFieldValue('keys');
    var formItems = Array.isArray(testcases) ? testcases.map((item, index) => (
      <Row key={index} gutter={16}>
        <Col span={11}>
          <span>Testcase {index + 1}</span>
          <Form.Item className="switch">
            {getFieldDecorator(`isHidden[${index}]`, {
              valuePropName: 'checked',
              initialValue: item.hidden,
            })(<Switch />)}
            <Tooltip title="Is hidden testcase?" className="is-hidden-testcase-icon">
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
  editTestcase: payload => dispatch(editTestcase(payload)),
  handleUpdateTestcaseModal: status => dispatch(handleUpdateTestcaseModal(status)),
});

const WrappedTestcaseUpdate = Form.create({ name: 'updateTestcase' })(
  connect(mapStateToProps, mapDispatchToProps)(UpdateTestcase)
);

export default WrappedTestcaseUpdate;