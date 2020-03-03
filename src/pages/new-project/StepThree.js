import React from 'react';
import { connect } from "react-redux";
import {
  Form,
  Input,
  Icon,
  Button,
  Row,
  Col
} from 'antd';

import './NewChallenge.css';
import { STEP_LENGTH } from '../../constants';
import {
  updateStepThree,
} from "../../actions/actions.creator";

let id = 0;

class StepThree extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepThree(values);
        console.log('Received values of form: ', values);
        this.props.next()
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 3 },
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 21 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: this.props.keys });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item label={`Testcase ` + k + `: `} {...formItemLayout} key={k}>
        <Row>
          <Col span={11}>
            <Form.Item
              style={{ display: 'inline-block', width: '90%' }}
            >
              {getFieldDecorator(`inputTestcase[${k}]`, {
                initialValue: this.props.inputTestcase[k],
                validateTrigger: ['onChange'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your testcase",
                  },
                ],
              })(<Input placeholder="input" />)}
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item style={{ display: 'inline-block', width: '90%' }}>
              <Input placeholder="output" disabled />
            </Form.Item>
          </Col>
          <Col span={2}>
            {keys.length > 1 ? (
              <Icon
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            ) : null}
          </Col>
        </Row>

      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.current < STEP_LENGTH - 1 && (
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          )}
          {this.props.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
              Previous
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.newChallengeReducer.keys,
  inputTestcase: state.newChallengeReducer.inputTestcase,
});
const mapDispatchToProps = dispatch => ({
	updateStepThree: (payload) => dispatch(updateStepThree(payload)),
});

const WrappedStepThree = Form.create({ name: 'stepThree' })(
  connect(mapStateToProps, mapDispatchToProps)(StepThree)
);

export default WrappedStepThree;