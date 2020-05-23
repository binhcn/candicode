import React from 'react';
import base64 from 'react-native-base64';
import { connect } from "react-redux";
import ReactQuill from 'react-quill';
import { Button, message, Row, Col, Typography, Icon, Upload } from 'antd';

import './Challenge.css';
import { MODULE_SET, FORMAT_SET } from '../../../constants/index';
import {
  updateStepThree, handleModal, updateChallenge
} from "../../../actions/actions.creator";
import { uploadChallenge } from '../../../services/project.services';

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

class StepThree extends React.Component {
  state = {
    loading: false,
    description: this.props.description,
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
          description: base64.decode(descriptionUrl.split(",")[1]),
          loading: false,
        })
      },
      );
    }
  };

  onChange = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  handlePrev = e => {
    const values = {description: this.state.description}
    this.props.updateStepThree(values);
    this.props.prev()
  };

  handleChangeDescription = html => {
    this.setState({description: html});
  }

  onDownload = () => {
    var file = new File([this.state.description], "description.html", {
      type: "text/plain",
    });
    this.setState({descriptionUrl: window.URL.createObjectURL(file)});
  };

  handleComplete = e => {
    const values = {description: this.state.description}
    this.props.updateStepThree(values);

    var file = new File([this.state.description], "description.md", {
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
    // uploadChallenge(formData);

    var { data, visible, ...rest } = this.props.challange;
    const request = Object.assign({}, rest, {id: this.props.challange.id, description: this.state.description});
    this.props.updateChallenge(request);

    message.success('Create new challenge successfully!');
    this.props.handleModal(false);
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
              <a href={this.state.descriptionUrl} download="description.html">
                <Button onClick={this.onDownload}>
                  <Icon type="download" /> Download
                </Button>
              </a>
            </Col>
          </Row>

          <ReactQuill 
            theme="snow"
            value={this.state.description}
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
  description: state.challengeReducer.description,
  challange: state.challengeReducer,
});
const mapDispatchToProps = dispatch => ({
  updateStepThree: (payload) => dispatch(updateStepThree(payload)),
  handleModal: status => dispatch(handleModal(status)),
  updateChallenge: request => dispatch(updateChallenge(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);