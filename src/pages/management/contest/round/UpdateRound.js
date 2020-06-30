import React from 'react';
import { connect } from "react-redux";
import {
  Form, Button, Row, Col, Divider,
  Select, DatePicker, notification, InputNumber,
} from 'antd';
import moment from 'moment';

import {
  handleUpdateRoundModal, editRound,
} from "../../../../actions/actions.creator";


class UpdateRound extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { challenges, period, attendeePercent, scorePercent } = values;
        var data = [];
        this.props.rounds.forEach((item, index) => {

          var oldChallenges = item.challenges.map(itm => itm.challengeId);
          var newChallenges = challenges[index].map(itm => parseInt(itm));

          if (JSON.stringify(oldChallenges) !== JSON.stringify(newChallenges)
                || period[index][0].format('YYYY-MM-DD HH:mm:ss.SSS') !== item.startsAt
                || period[index][1].format('YYYY-MM-DD HH:mm:ss.SSS') !== item.endsAt) {
            data.push({
              roundId: item.roundId,
              challenges: challenges[index],
              startsAt: period[index][0].format('YYYY-MM-DD HH:mm:ss.SSS'),
              endsAt: period[index][1].format('YYYY-MM-DD HH:mm:ss.SSS'),
              attendeePercent: attendeePercent[index],
              scorePercent: scorePercent[index],
            })
          }
        })
        if (data.length > 0) {
          var response = this.props.editRound({ id: this.props.id, data: { rounds: data } })
          response.then(result => {
            notification['success']({
              message: 'Successfully',
              description: `Edited ${data.length} rounds successfully`,
              duration: 2,
            });
            this.props.handleUpdateRoundModal(false);
          });
        } else {
          notification['success']({
            message: 'Candicode',
            description: 'Edited 0 rounds successfully',
            duration: 2,
          });
          this.props.handleUpdateRoundModal(false);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
    var formItems = Array.isArray(rounds) ? rounds.map((item, index) => (
      <div key={index}>
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
  contestChallengeList: state.contestReducer.contestChallengeList,
});
const mapDispatchToProps = dispatch => ({
  editRound: payload => dispatch(editRound(payload)),
  handleUpdateRoundModal: status => dispatch(handleUpdateRoundModal(status)),
});

const WrappedUpdateRound = Form.create({ name: 'updateRound' })(
  connect(mapStateToProps, mapDispatchToProps)(UpdateRound)
);

export default WrappedUpdateRound;