import React from 'react';
import { Modal } from 'antd';
import { connect } from "react-redux";

import './Header.css';
import Login from '../../pages/login/Login';
import Signup from '../../pages/signup/Signup';
import {
  openUserForm, closeUserForm,
} from "../../actions/actions.creator";

class UserForm extends React.Component {

  render() {
    var { visible, status, openUserForm, closeUserForm } = this.props;
    var component = status.toLowerCase() === "signup" ?
      <Signup
        convertModal={() => openUserForm("Login")}
        handleCancel={() => closeUserForm()}
      />
      :
      <Login
        convertModal={() => openUserForm("Signup")}
        handleCancel={() => closeUserForm()}
      />;

    return (
      <Modal
        key="modal"
        title={status}
        visible={visible}
        onCancel={closeUserForm}
        footer={null}
      >
        {component}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.userReducer.visible,
  status: state.userReducer.status,
});

const mapDispatchToProps = dispatch => ({
  openUserForm: status => dispatch(openUserForm(status)),
  closeUserForm: () => dispatch(closeUserForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);