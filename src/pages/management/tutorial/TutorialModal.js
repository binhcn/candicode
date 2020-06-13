import React from 'react';
import { connect } from "react-redux";
import { Steps, Row, Col } from 'antd';

import './Tutorial.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const { Step } = Steps;

class ChallengeModal extends React.Component {

  render() {
    var steps = [
      {
        title: 'First',
        content: <StepOne />,
      },
      {
        title: 'Second',
        content: <StepTwo />,
      },
    ];
    return (
      <Row>
        <Col span={4}>
          <Steps direction="vertical" current={this.props.currentStep} style={{width: '50%', margin: '10vh auto' }} >
            {steps.map(item => (
              <Step key={item.title} title={item.title}/>
            ))}
          </Steps>
        </Col>
        <Col span={20}>
          <div>{steps[this.props.currentStep].content}</div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentStep: state.tutorialReducer.currentStep,
  id: state.tutorialReducer.id,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeModal);