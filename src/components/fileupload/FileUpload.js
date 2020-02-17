import React, { Component } from "react";
import { Upload, Button, Icon, message, Row, Col } from "antd";
import { connect } from "react-redux";
import {
  uploadMultipleTxtFiles,
  getAllProject
} from "../../actions/actions.creator";
import "./FileUpload.scss";

class FileUpload extends Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();

    fileList.forEach(file => {
      formData.append("files", file);
    });

    this.setState({ uploading: true });

    this.props
      .uploadTxtFiles(formData)
      .then(res => {
        this.setState({
          fileList: [],
          uploading: false
        });
        message.success("Upload successfully.");
        this.props.getAllProject();
      })
      .catch(err => {
        this.setState({ uploading: false });
        message.error("Upload failed.");
      });
  };

  render() {
    const { uploading, fileList } = this.state;
    const uploadProps = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    return (
      <div className="file-upload-container">
        <Row>
          <Col span={12}>
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" />
                Select File(s)
              </Button>
            </Upload>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  uploadTxtFiles: formData => dispatch(uploadMultipleTxtFiles(formData)),
  getAllProject: () => dispatch(getAllProject())
});

export default connect(null, mapDispatchToProps)(FileUpload);
