import React from 'react';
import { connect } from "react-redux";
import {
  Form, Input, Icon, Button, Row, Col,
  Switch, Tooltip, notification, Popconfirm,
} from 'antd';

import {
  verifyTestcase, deleteTestcase, handleDeleteTestcaseModal,
} from "../../../../actions/actions.creator";


class DeleteTestcase extends React.Component {

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    keys.splice(k, 1);
    form.setFieldsValue({
      keys: keys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys } = values;
        var data = [];
        const idList = keys.map(item => item.testcaseId);
        this.props.testcases.forEach(item => {
          if (!idList.includes(item.testcaseId)) {
            data.push(item.testcaseId);
          }
        })
        var response = this.props.deleteTestcase({id: this.props.id, data: {testcaseIds: data}})
        response.then(result => {
          notification['success']({
            message: 'Successfully',
            description: `Deleted ${result.removedTestcase} testcases successfully`,
            duration: 2,
          });
          this.props.handleDeleteTestcaseModal(false);
        });

      }
    });
  };

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
    getFieldDecorator('keys', { initialValue: testcases ? [...testcases] : [] });
    var keys = getFieldValue('keys');
    var formItems = Array.isArray(keys) ? keys.map((item, index) => (
      <Row key={index} gutter={16}>
        <Col span={11}>
          {keys.length > 0 ? (
            <Popconfirm title="Sure to delete?"
            onConfirm={() => this.remove(index)}
            >
              <Icon
                type="minus-circle-o"
                className="remove-testcase-icon"
              />
            </Popconfirm>
          ) : null}
          <span>Testcase {index + 1}</span>
          <Form.Item className="switch">
            {getFieldDecorator(`isHidden[${index}]`, {
              valuePropName: 'checked',
              initialValue: item.hidden,
            })(<Switch disabled={true} />)}
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
              })(<Input placeholder={input} disabled={true} style={{ width: '100%', marginRight: 4 }} />)}
            </Form.Item>
          ))}
        </Col>
        <Col span={13}>
          <Form.Item className="output">
            {getFieldDecorator(`output[${index}]`, {
              initialValue: item.output,
            })(<Input placeholder="output" disabled={true} style={{ width: '85%' }} />)}
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
  deleteTestcase: payload => dispatch(deleteTestcase(payload)),
  handleDeleteTestcaseModal: status => dispatch(handleDeleteTestcaseModal(status)),
});

const WrappedTestcaseUpdate = Form.create({ name: 'deleteTestcase' })(
  connect(mapStateToProps, mapDispatchToProps)(DeleteTestcase)
);

export default WrappedTestcaseUpdate;