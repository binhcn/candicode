import React from 'react';
import { connect } from "react-redux";
import {
  Form, Input, Icon, Row, Col,
  Switch, Tooltip,
} from 'antd';

class AddResult extends React.Component {

  state = { visible: false };

  handleModal = status => {
    this.setState({
      visible: status,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    var { tcInputFormat, testcases } = this.props;
    getFieldDecorator('keys', { initialValue: testcases ? [...testcases] : [] });
    var keys = getFieldValue('keys');
    var formItems = Array.isArray(keys) ? keys.map((item, index) => (
      <Row key={index} gutter={16}>
        <Col span={11}>
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
          <Form.Item className="output" hasFeedback validateStatus={item.passed ? 'success' : 'error'}>
            {getFieldDecorator(`output[${index}]`, {
              initialValue: item.actualOutput,
            })(<Input placeholder="output" disabled={true} style={{ width: '85%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    )) : null;
    return (
      <Form onSubmit={this.handleSubmit} className="add-language-result">
        {formItems}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  tcInputFormat: state.challengeReducer.tcInputFormat,
  testcases: state.challengeReducer.addResult.details,
});
const mapDispatchToProps = dispatch => ({
});

const WrappedAddResult = Form.create({ name: 'addResult' })(
  connect(mapStateToProps, mapDispatchToProps)(AddResult)
);

export default WrappedAddResult;