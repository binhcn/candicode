import React from 'react';
import { connect } from "react-redux";
import {
  Form, InputNumber, Icon, Button, Row, Col,
  DatePicker, Select, Divider, notification,
} from 'antd';

import {
  submitRound, handleRoundModal,
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
        const { keys, challenges, period, attendeePercent, scorePercent } = values;
        var data = [];
        keys.forEach((item, index) => {
          data.push({
            challenges: challenges[index],
            startsAt: period[index][0].format('YYYY-MM-DD HH:mm:ss.SSS'),
            endsAt: period[index][1].format('YYYY-MM-DD HH:mm:ss.SSS'),
            attendeePercent: attendeePercent[index],
            scorePercent: scorePercent[index],
          })
        })
        var response = this.props.submitRound({ id: this.props.id, data: { rounds: data } })
        response.then(result => {
          notification['success']({
            message: 'Successfully',
            description: result.message,
            duration: 2,
          });
          this.props.handleRoundModal(false);
        });
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
    const challengeSet = this.props.contestChallengeList ?
      this.props.contestChallengeList.map((item, index) => (
      <Select.Option key={index} value={`${item.challengeId}`}>{item.title}</Select.Option>
    )) : [];
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
                initialValue: [],
                rules: [{
                  required: true,
                }],
              })(
                <Select mode="tags" style={{ width: '100%' }}>
                  {challengeSet}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item label="Period" {...periodLayout}>
              {getFieldDecorator(`period[${index}]`, {
                initialValue: [],
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: 'Please select round\'s period!'
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
  id: state.contestReducer.id,
  contestChallengeList: state.contestReducer.contestChallengeList,
});
const mapDispatchToProps = dispatch => ({
  submitRound: payload => dispatch(submitRound(payload)),
  handleRoundModal: status => dispatch(handleRoundModal(status)),
});

const WrappedAddRound = Form.create({ name: 'addRound' })(
  connect(mapStateToProps, mapDispatchToProps)(AddRound)
);

export default WrappedAddRound;