import React from 'react';
import base64 from 'react-native-base64';
import { connect } from "react-redux";
import ReactQuill from 'react-quill';
import { Button, message, Row, Col, Typography, Icon, Upload } from 'antd';

import './Contest.css';
import { MODULE_SET, FORMAT_SET } from '../../../constants/index';
import {
  updateStepTwoContest, handleContestModal, updateContest, updateStepContest
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
    this.props.updateStepTwoContest(values);
    const step = -1;
    this.props.updateStepContest(step);
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
    this.props.updateStepTwoContest(values);

    const formData = new FormData();
    if (this.props.contest.banner) {
      formData.append('banner', this.props.contest.banner);
    }
   
    formData.append('title', this.props.contest.title);
    formData.append('tags', this.props.contest.tagList);
    formData.append('description', this.props.contest.description);
    formData.append('content', this.state.content);

    var { data, visible, ...rest } = this.props.contest;
    const request = Object.assign({}, rest, {id: this.props.contest.id, content: this.state.content});
    this.props.updateContest({formData, request});

    this.props.handleContestModal(false);
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
  content: state.contestReducer.content,
  contest: state.contestReducer,
});
const mapDispatchToProps = dispatch => ({
  updateStepTwoContest: (payload) => dispatch(updateStepTwoContest(payload)),
  updateStepContest: (payload) => dispatch(updateStepContest(payload)),
  handleContestModal: status => dispatch(handleContestModal(status)),
  updateContest: request => dispatch(updateContest(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);