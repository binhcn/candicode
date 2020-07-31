import React from 'react';
import base64 from 'react-native-base64';
import { connect } from "react-redux";
import ReactQuill from 'react-quill';
import { Button, message, Row, Col, Typography, Icon, Upload } from 'antd';

import './Challenge.css';
import { MODULE_SET, FORMAT_SET } from '../../../constants/index';
import {
  updateStepThree, handleModal, updateChallenge, updateStep
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
    const step = -1;
    this.props.updateStep(step);
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
    var { challenge } = this.props;
    const values = {description: this.state.description}
    this.props.updateStepThree(values);

    const formData = new FormData();
    if (challenge.banner && typeof challenge.banner === 'object') {
      formData.append('banner', this.props.challenge.banner);
    }
    if (this.props.challenge.tagList.length > 0) {
      formData.append('tags', this.props.challenge.tagList);
    }
    if (this.props.challenge.id) {
      formData.append('title', this.props.challenge.title);
      formData.append('level', this.props.challenge.level);
      formData.append('description', this.state.description);
    } else {
      var { tcInputFormat } = this.props.challenge;
      var format = [];
      var i = 0;
      for (i = 0; i < tcInputFormat.length; i++) {
        if (tcInputFormat[i].startsWith('x2')) {
          if (i-1 < 0 || tcInputFormat[i-1].startsWith('x')) continue;
          format.push(tcInputFormat[i-1]);
        } else if (tcInputFormat[i].startsWith('x3')) {
          if (i-1 < 0 || tcInputFormat[i-1].startsWith('x')) continue;
          format.push(tcInputFormat[i-1]);
          format.push(tcInputFormat[i-1]);
        } else {
          format.push(tcInputFormat[i]);
        }
      }

      formData.append('title', this.props.challenge.title);
      formData.append('level', this.props.challenge.level);
      formData.append('language', this.props.challenge.language[0]);
      formData.append('compilePath', this.props.challenge.compilePath.slice(-1)[0]);
      formData.append('runPath', this.props.challenge.runPath.slice(-1)[0]);
      formData.append('implementedPath', this.props.challenge.implementedPath.slice(-1)[0]);
      formData.append('nonImplementedPath', this.props.challenge.nonImplementedPath.slice(-1)[0]);
      formData.append('tcInputFormat', format);
      formData.append('tcOutputFormat', this.props.challenge.tcOutputFormat);
      formData.append('contestChallenge', this.props.challenge.contestChallenge);
      formData.append('description', this.state.description);
      formData.append('challengeDir', this.props.challenge.challengeDir);
    }

    var { data, visible, ...rest } = this.props.challenge;
    const request = Object.assign({}, rest, {id: this.props.challenge.id, description: this.state.description});
    this.props.updateChallenge({formData, request});

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
  challenge: state.challengeReducer,
});
const mapDispatchToProps = dispatch => ({
  updateStepThree: (payload) => dispatch(updateStepThree(payload)),
  updateStep: (payload) => dispatch(updateStep(payload)),
  handleModal: status => dispatch(handleModal(status)),
  updateChallenge: request => dispatch(updateChallenge(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);