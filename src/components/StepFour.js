import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  message,
  Row,
  Col,
  Input,
} from 'antd';

import './NewChallenge.css';
import { STEP_LENGTH } from '../../constants';

var sampletext = ""

class StepFour extends React.Component {
  state = {
    value: sampletext
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <Input.TextArea
              value={this.state.value}
              onChange={this.onChange}
              placeholder="Controlled autosize"
              autoSize={{ minRows: 15, maxRows: 18 }}
            />
          </Col>
          <Col className="markdown-rendering" span={12}>
            <ReactMarkdown source={this.state.value} escapeHtml={true}/>
            <Input.TextArea
              value={this.state.value}
              disabled
              autoSize={{ minRows: 15, maxRows: 18 }}
            />
          </Col>
        </Row>
        {this.props.current === STEP_LENGTH - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
            </Button>
        )}
        {this.props.current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
            Previous
            </Button>
        )}
      </div>
    );
  }
}

export default StepFour;