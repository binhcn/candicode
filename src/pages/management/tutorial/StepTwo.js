import React from 'react';
import base64 from 'react-native-base64';
import { connect } from "react-redux";
import ReactQuill from 'react-quill';
import { Button, message, Row, Col, Typography, Icon, Upload } from 'antd';

import './Tutorial.css';
import { MODULE_SET, FORMAT_SET } from '../../../constants/index';
import {
  updateStepTwoTutorial, handleTutorialModal, updateTutorial, updateStepTutorial
} from "../../../actions/actions.creator";

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

class StepTwo extends React.Component {
  state = {
    loading: false,
    content: this.props.content,
    descriptionUrl: '',
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, descriptionUrl => {
        this.setState({
          descriptionUrl,
          content: base64.decode(descriptionUrl.split(",")[1]),
          loading: false,
        })
      },
      );
    }
  };

  onChange = ({ target: { value } }) => {
    this.setState({ content: value });
  };

  handlePrev = e => {
    const values = {content: this.state.content}
    this.props.updateStepTwoTutorial(values);
    const step = -1;
    this.props.updateStepTutorial(step);
  };

  handleChangeDescription = html => {
    this.setState({content: html});
  }

  onDownload = () => {
    var file = new File([this.state.content], "content.html", {
      type: "text/plain",
    });
    this.setState({descriptionUrl: window.URL.createObjectURL(file)});
  };

  handleComplete = e => {
    const values = {content: this.state.content}
    this.props.updateStepTwoTutorial(values);

    const formData = new FormData();
    if (this.props.tutorial.banner) {
      formData.append('banner', this.props.tutorial.banner);
    }
   
    formData.append('title', this.props.tutorial.title);
    formData.append('tags', this.props.tutorial.tagList ? this.props.tutorial.tagList : []);
    formData.append('description', this.props.tutorial.description);
    formData.append('content', this.state.content);

    var { data, visible, ...rest } = this.props.tutorial;
    const request = Object.assign({}, rest, {id: this.props.tutorial.id, content: this.state.content});
    this.props.updateTutorial({formData, request});

    this.props.handleTutorialModal(false);
  };

  render() {
    return (
        <div>
          <Row>
            <Col span={16} offset={1}>
              <Title level={4}>Describe challenge</Title>

            </Col>
            <Col span={3}>
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
            <Col span={4}>
              <a href={this.state.descriptionUrl} download="content.html">
                <Button onClick={this.onDownload}>
                  <Icon type="download" /> Download
                </Button>
              </a>
            </Col>
          </Row>

          <ReactQuill
            theme="snow"
            value={this.state.content}
            onChange={this.handleChangeDescription}
            modules={MODULE_SET}
            formats={FORMAT_SET}
            style={{height: '60vh'}}
          />

          <Row style={{marginTop: '50px'}}>
            <Col span={2} offset={18}>
              <Button type="primary" onClick={this.handleComplete}>
                Done
              </Button>
            </Col>
            <Col span={4}>
              <Button onClick={this.handlePrev}>
                Previous
            </Button>
            </Col>
          </Row>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.tutorialReducer.content,
  tutorial: state.tutorialReducer,
});
const mapDispatchToProps = dispatch => ({
  updateStepTwoTutorial: (payload) => dispatch(updateStepTwoTutorial(payload)),
  updateStepTutorial: (payload) => dispatch(updateStepTutorial(payload)),
  handleTutorialModal: status => dispatch(handleTutorialModal(status)),
  updateTutorial: request => dispatch(updateTutorial(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);