import React from 'react';
import ReactMarkdown from 'react-markdown';
import base64 from 'react-native-base64';
import { connect } from "react-redux";
import { Button, message, Row, Col, Input, Typography, Icon, Upload } from 'antd';

import './Challenge.css';
import {
  updateStepFour, handleModal
} from "../../../actions/actions.creator";
import { uploadChallenge } from '../../../services/project.services'


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
    this.props.prev()
  };

  handleComplete = e => {
    const values = {description: this.state.value}
    this.props.updateStepFour(values);

    var file = new File([this.props.challange.description], "description.md", {
      type: "text/plain",
    });

    const formData = new FormData();
    formData.append('title', this.props.challange.title);
    formData.append('level', this.props.challange.level);
    formData.append('language', this.props.challange.language);
    formData.append('targetPath', this.props.challange.targetPath);
    formData.append('buildPath', this.props.challange.buildPath);
    formData.append('testcaseInputFormat', this.props.challange.testcaseInputFormat);
    formData.append('testcaseOutputFormat', this.props.challange.testcaseOutputFormat);
    formData.append('banner', this.props.challange.banner);
    formData.append('description', file);
    uploadChallenge(formData);

    console.log('Received values of form: ', values);
    message.success('Create new challenge successfully!')
    this.props.handleModal(false);
  };

  render() {
    return (
      <Row gutter={10}>
        <Col span={12}>
          <Row>
            <Col span={12} offset={1}>
              <Title level={4}>Describe challenge</Title>

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
            rows={20}
            value={this.state.value}
            onChange={this.onChange}
            // placeholder="Describe challenge"
            style={{margin: '8px 0'}}
          />

          <Row style={{ margin: '2px' }}>
            <Col span={14} offset={1}>

            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.handleComplete}>
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
        <Col className="markdown-rendering" span={12} style={{ height: '72vh', overflow: 'auto' }}>
          <Title level={4}>Preview</Title>
          <ReactMarkdown source={this.state.value} escapeHtml={false} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  description: state.challengeReducer.description,
  challange: state.challengeReducer,
});
const mapDispatchToProps = dispatch => ({
  updateStepFour: (payload) => dispatch(updateStepFour(payload)),
  handleModal: status => dispatch(handleModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);