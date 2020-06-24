import React from 'react';
import { connect } from "react-redux";
import {
  Form, InputNumber, Icon, Button, Row, Col,
  DatePicker, Select, Divider,
} from 'antd';

import {
  submitTestcase, handleRoundModal,
} from "../../../../actions/actions.creator";


class AddRound extends React.Component {
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
        console.log(values)
        // const { keys, input, output, isHidden } = values;
        // if (keys.includes('') || keys.includes('error')) {
        //   notification['warning']({
        //     message: 'Validate testcase',
        //     description: "Please run your testcase input or fix bugs",
        //     duration: 0,
        //   });
        // } else {
        //   var data = [];
        //   input.forEach((item, index) => {
        //     data.push({
        //       input: input[index].replace(/\s/g, ''),
        //       output: output[index].replace(/\s/g, ''),
        //       hidden: isHidden[index],
        //     })
        //   })
        //   var response = this.props.submitTestcase({ id: this.props.id, data: { testcases: data } })
        //   response.then(result => {
        //     notification['success']({
        //       message: 'Successfully',
        //       description: result.message,
        //       duration: 2,
        //     });
        //     this.props.handleRoundModal(false);
        //   });
        // }
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const challengeLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 0 },
      },
    };
    const periodLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 0 },
      },
    };
    const attendeePercentLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 8, offset: 0 },
      },
    };
    const scorePercentLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 0 },
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
    const tagOpt = ['1', '2', '3'].map((item, index) => (
      <Select.Option key={index} value={item}>{item}</Select.Option>
    ));
    getFieldDecorator('keys', { initialValue: [] });
    var keys = getFieldValue('keys');
    var formItems = Array.isArray(keys) ? keys.map((item, index) => (
      <div key={index}>
        {keys.length > 0 ? (
          <Icon
            type="minus-circle-o"
            onClick={() => this.remove(index)}
            className="remove-round-icon"
          />
        ) : null}
        <span>Round {index + 1}</span>
        <Row>
          <Col span={11}>
            <Form.Item label="Challenges" {...challengeLayout}>
              {getFieldDecorator(`challenges[${index}]`, {
                initialValue: this.props.tagList,
                rules: [{
                  required: true,
                }],
              })(
                <Select mode="tags" style={{ width: '100%' }}>
                  {tagOpt}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item label="Period" {...periodLayout}>
              {getFieldDecorator(`period[${index}]`, {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: 'Please select contest\'s period!'
                  }
                ],
              })(
                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item label="Passed attendee percentage" {...attendeePercentLayout}>
              {getFieldDecorator(`attendeePercent[${index}]`, {
                initialValue: 100,
                rules: [{
                  required: true,
                }],
              })(<InputNumber
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />)}
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item label="Passed score percentage" {...scorePercentLayout}>
              {getFieldDecorator(`scorePercent[${index}]`, {
                initialValue: 0,
                rules: [{
                  required: true,
                }],
              })(<InputNumber
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />)}
            </Form.Item>
          </Col>
        </Row>
        <Divider />
      </div>
    )) : null;
    return (
      <Form onSubmit={this.handleSubmit} className="round-modal">
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add round
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
});
const mapDispatchToProps = dispatch => ({
  submitTestcase: payload => dispatch(submitTestcase(payload)),
  handleRoundModal: status => dispatch(handleRoundModal(status)),
});

const WrappedAddRound = Form.create({ name: 'addRound' })(
  connect(mapStateToProps, mapDispatchToProps)(AddRound)
);

export default WrappedAddRound;