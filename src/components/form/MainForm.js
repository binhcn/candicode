import React from "react";
import { Form, Input, Button, message, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { createProject } from "../../actions/actions.creator";
import PropTypes from "prop-types";
import "./Form.scss";

const propTypes = {};

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add a new project record"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Project Name">
              {getFieldDecorator("projectName", {
                rules: [
                  {
                    required: true,
                    message: "Please input the name of project!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="IP Addresss">
              {getFieldDecorator("ipAddress", {
                rules: [
                  { required: true, message: "Please input the IP address!" }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class MainForm extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);

      this.props
        .createProject(values)
        .then(() => {
          message.success("Insert new project success!");
          form.resetFields();
          this.setState({ visible: false });
        })
        .catch(e => {
          message.error("Insert new project failed!");
          console.log(e);
        });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div style={{ position: "absolute", bottom: 20 }}>
        <Button type="primary" onClick={this.showModal}>
          Insert Manually
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

MainForm.propTypes = propTypes;

const mapStateToProps = state => ({
  loading: state.userReducer.loading,
  projects: state.userReducer.projects
});

const mapDispatchToProps = dispatch => ({
  createProject: payload => dispatch(createProject(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
