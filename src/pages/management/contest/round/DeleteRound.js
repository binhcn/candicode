import React from 'react';
import { connect } from "react-redux";
import {
  Form, Icon, Button, Row, Col, DatePicker,
  notification, Popconfirm, Divider,
  InputNumber, Select,
} from 'antd';
import moment from 'moment';

import {
  deleteRound, handleDeleteRoundModal,
} from "../../../../actions/actions.creator";


class DeleteRound extends React.Component {

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
        const idList = keys.map(item => item.roundId);
        this.props.rounds.forEach(item => {
          if (!idList.includes(item.roundId)) {
            data.push(item.roundId);
          }
        })
        var response = this.props.deleteRound({ id: this.props.id, data: { roundIds: data } })
        response.then(result => {
          notification['success']({
            message: 'Successfully',
            description: `Deleted ${data.length} rounds successfully`,
            duration: 2,
          });
          this.props.handleDeleteRoundModal(false);
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
    var { rounds } = this.props;
    getFieldDecorator('keys', { initialValue: rounds ? [...rounds] : [] });
    var keys = getFieldValue('keys');
    var formItems = Array.isArray(keys) ? keys.map((item, index) => (
      <div key={index}>
        {keys.length > 0 ? (
          <Popconfirm title="Sure to delete?"
            onConfirm={() => this.remove(index)}
          >
            <Icon
              type="minus-circle-o"
              className="remove-round-icon"
            />
          </Popconfirm>
        ) : null}
        <span>Round {index + 1}</span>
        <Row>
          <Col span={11}>
            <Form.Item label="Challenges" {...challengeLayout}>
              {getFieldDecorator(`challenges[${index}]`, {
                initialValue: item.challenges.map(itm => `${itm.challengeId}`),
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
                initialValue: [moment(item.startsAt), moment(item.endsAt)],
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
  rounds: state.contestReducer.rounds,
});
const mapDispatchToProps = dispatch => ({
  deleteRound: payload => dispatch(deleteRound(payload)),
  handleDeleteRoundModal: status => dispatch(handleDeleteRoundModal(status)),
});

const WrappedDeleteRound = Form.create({ name: 'deleteRound' })(
  connect(mapStateToProps, mapDispatchToProps)(DeleteRound)
);

export default WrappedDeleteRound;