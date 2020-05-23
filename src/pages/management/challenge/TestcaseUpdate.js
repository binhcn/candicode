import React from 'react';
import { connect } from "react-redux";
import { Form, Input, Icon, Button, Row, Col, Select } from 'antd';

class UpdateTestcase extends React.Component {
  
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    var count = keys.length;
    const nextKeys = keys.concat(count++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, input } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => input[key]));
      }
    });
  };

  runTestcase = index => {
    const { form } = this.props;
    const language = form.getFieldValue('language');
    const input = form.getFieldValue('input');
    console.log(language);
    console.log(input);
  } 

  render() {
    const languageOpt = this.props.language.sort().map(language => (
      <Select.Option key={language} value={language}>{language}</Select.Option>
    ));
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const languageLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
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
    const outputLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 22, offset: 2 },
      },
    };
    getFieldDecorator('keys', { initialValue: this.props.testcaseInput.map((item, index) => index) });
    const keys = getFieldValue('keys');
    const formItems = keys.map(item => (
      <Row key={item}>
        <Col span={11}>
          <Form.Item
            {...formItemLayout}
            label={`Testcase ${item + 1}`}
            required={false}
          >
            {getFieldDecorator(`input[${item}]`, {
              initialValue: this.props.testcaseInput[item],
              validateTrigger: ['onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter testcase input",
                },
              ],
            })(<Input placeholder="input" style={{ width: '85%', marginRight: 4 }} />)}
            {keys.length > 0 ? (
              <Icon
                type="minus-circle-o"
                onClick={() => this.remove(item)}
                style={{ marginRight: 8 }}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            {...outputLayout}
            label=''
            required={false}
          >
            {getFieldDecorator(`output[${item}]`, {
              initialValue: this.props.testcaseOutput[item],
            })(<Input placeholder="output" disabled={true} style={{ width: '75%', marginRight: 8 }} />)}
            <Icon type="check" />
            <Button type="link" onClick={() => this.runTestcase(item)}>
              Run
            </Button>
          </Form.Item>
        </Col>
      </Row>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Language" hasFeedback {...languageLayout}>
            {getFieldDecorator('language', {
              // rules: [{ required: true, message: 'Please select its language!' }],
            })(
              <Select placeholder="Please select a language" style={{width: '60%'}}>
                {languageOpt}
              </Select>,
            )}
        </Form.Item>
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
  language: state.challengeReducer.language,
  testcaseInput: state.challengeReducer.testcaseInput,
  testcaseOutput: state.challengeReducer.testcaseOutput,
});
const mapDispatchToProps = dispatch => ({
});

const WrappedTestcaseUpdate = Form.create({ name: 'updateTestcase' })(
  connect(mapStateToProps, mapDispatchToProps)(UpdateTestcase)
);

export default WrappedTestcaseUpdate;