import React from 'react';
import { connect } from "react-redux";
import { Steps, Row, Col } from 'antd';

import './Contest.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const { Step } = Steps;

class ContestModal extends React.Component {

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
  currentStep: state.contestReducer.currentStep,
  id: state.contestReducer.id,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestModal);