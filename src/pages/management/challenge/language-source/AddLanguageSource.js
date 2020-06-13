import React from 'react';
import { connect } from "react-redux";
import { Steps, Row, Col } from 'antd';

import '../Challenge.css';
import StepOne from './StepOneAdd';
import StepTwo from './StepTwoAdd';

const { Step } = Steps;

class SourceUpdate extends React.Component {

  render() {
    var steps = [
      {
        title: '',
        content: <StepOne />,
      },
      {
        title: '',
        content: <StepTwo />,
      },
    ];
    return (
      <Row>
        <Col span={4}>
          <Steps direction="vertical" current={this.props.currentStep} style={{width: '50%', margin: '10vh auto' }} >
            {steps.map((item, index) => (
              <Step key={index} title={item.title}/>
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
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SourceUpdate);