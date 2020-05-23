import React from 'react';
import { Steps, Row, Col } from 'antd';

import './Challenge.css';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const { Step } = Steps;

export default class ChallengeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const steps = [
      {
        title: 'First',
        content: <StepOne current={current} next={this.next} />,
      },
      {
        title: 'Second',
        content: <StepTwo current={current} next={this.next} prev={this.prev} />,
      },
      {
        title: 'Third',
        content: <StepThree current={current} prev={this.prev} />,
      },
    ];
    return (
      <Row>
        <Col span={4}>
          <Steps direction="vertical" current={current} style={{width: '50%', margin: '10vh auto' }} >
            {steps.map(item => (
              <Step key={item.title} title={item.title}/>
            ))}
          </Steps>
        </Col>
        <Col span={20}>
          <div>{steps[current].content}</div>
        </Col>
      </Row>
    );
  }
}