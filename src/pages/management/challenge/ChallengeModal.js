import React from 'react';
import { connect } from "react-redux";
import { Steps, Row, Col } from 'antd';

import './Challenge.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const { Step } = Steps;

class ChallengeModal extends React.Component {

  render() {
    var steps = this.props.id ?
    [
      {
        title: 'First',
        content: <StepOne />,
      },
      {
        title: 'Second',
        content: <StepThree />,
      },
    ] :
    [
      {
        title: 'First',
        content: <StepOne />,
      },
      {
        title: 'Second',
        content: <StepTwo />,
      },
      {
        title: 'Third',
        content: <StepThree />,
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
  currentStep: state.challengeReducer.currentStep,
  id: state.challengeReducer.id,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeModal);