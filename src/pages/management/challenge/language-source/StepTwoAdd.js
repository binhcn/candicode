import React from 'react';
import { connect } from "react-redux";
import { Form, Button, Cascader } from 'antd';

import '../Challenge.css';
import { STEP_LENGTH } from '../../../../constants';
import {
  updateStepTwo, updateStep, handleSourceModal, addLanguage
} from "../../../../actions/actions.creator";

class StepTwo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const data = {
          language: this.props.language[0],
          compilePath: values.compilePath.slice(-1)[0],
          runPath: values.runPath.slice(-1)[0],
          implementedPath: values.implementedPath.slice(-1)[0],
          nonImplementedPath: values.nonImplementedPath.slice(-1)[0],
          challengeDir: this.props.challengeDir,
        };
        this.props.addLanguage({data, id: this.props.id});
        this.props.handleSourceModal(false);
      }
    });
  };

  handlePrev = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateStepTwo(values);
        console.log('Received values of form: ', values);
        const step = -1;
        this.props.updateStep(step);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
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

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Compiled file path">
          {getFieldDecorator('compilePath', {
            initialValue: this.props.compilePath,
            rules: [
              { type: 'array', required: true, message: 'Please select your compiled file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Run file path">
          {getFieldDecorator('runPath', {
            initialValue: this.props.runPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your run file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Implemented file path">
          {getFieldDecorator('implementedPath', {
            initialValue: this.props.implementedPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your implemented file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item label="Non-implemented file path">
          {getFieldDecorator('nonImplementedPath', {
            initialValue: this.props.nonImplementedPath,
            rules: [
              { type: 'array', required: true, message: 'Please select your non-implemented file path!' },
            ],
          })(<Cascader options={this.props.projectStructure} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {this.props.currentStep < STEP_LENGTH - 1 && (
            <Button type="primary" htmlType="submit">
              Finish
            </Button>
          )}
          {this.props.currentStep > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={this.handlePrev}>
              Previous
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  projectStructure: state.challengeReducer.projectStructure,
  currentStep: state.challengeReducer.currentStep,
  language: state.challengeReducer.language,
  challengeDir: state.challengeReducer.challengeDir,
  id: state.challengeReducer.id,
});
const mapDispatchToProps = dispatch => ({
	updateStepTwo: (payload) => dispatch(updateStepTwo(payload)),
	updateStep: (payload) => dispatch(updateStep(payload)),
	handleSourceModal: (status) => dispatch(handleSourceModal(status)),
	addLanguage: (payload) => dispatch(addLanguage(payload)),
});

const WrappedStepTwo = Form.create({ name: 'stepTwoLanguage' })(
  connect(mapStateToProps, mapDispatchToProps)(StepTwo)
);

export default WrappedStepTwo;