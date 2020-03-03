import React from 'react';
import ReactMarkdown from 'react-markdown';
import base64 from 'react-native-base64';
import { connect } from "react-redux";
import {
  Button,
  message,
  Row,
  Col,
  Input,
  Typography,
  Icon,
  Upload
} from 'antd';

import './NewChallenge.css';
import {
  updateStepFour,
} from "../../actions/actions.creator";


const { Title } = Typography;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isJpgOrPng = true;
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class StepFour extends React.Component {
  state = {
    loading: false,
    value: this.props.description
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          value: base64.decode(imageUrl.split(",")[1]),
          loading: false,
        })
      },
      );
    }
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handlePrev = e => {
    const values = {description: this.state.value}
    this.props.updateStepFour(values);
    console.log('Received values of form: ', values);
    this.props.prev()
  };

  render() {
    return (
      <Row>
        <Col span={12}>
          <Row>
            <Col span={12} offset={1}>
              <Title level={4}>Markdown Editor</Title>

            </Col>
            <Col span={5}>
              <Upload
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                <Button>
                  <Icon type="upload" /> Upload
                </Button>
              </Upload>

            </Col>
            <Col span={6}>
              <a href={this.state.imageUrl} download="description.md">
                <Button>
                  <Icon type="download" /> Download
                </Button>
              </a>
            </Col>
          </Row>

          <Input.TextArea
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Markdown Editor"
            autoSize={{ minRows: 25, maxRows: 25 }}
          />

          <Row style={{ margin: '2px' }}>
            <Col span={14} offset={1}>

            </Col>
            <Col span={4}>
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            </Col>
            <Col span={5}>
              <Button onClick={this.handlePrev}>
                Previous
            </Button>
            </Col>
          </Row>
        </Col>
        <Col className="markdown-rendering" span={12} style={{ height: '75vh', overflow: 'auto' }}>
          <Title level={4}>Preview</Title>
          <ReactMarkdown source={this.state.value} escapeHtml={false} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  description: state.newChallengeReducer.description,
});
const mapDispatchToProps = dispatch => ({
  updateStepFour: (payload) => dispatch(updateStepFour(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);