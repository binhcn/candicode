import React from 'react';
import { Layout, Menu, Row, Avatar, Dropdown, Icon, Col, Modal, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import './Header.css';
import Notification from './Notification';
import {
  logout,
} from "../../actions/actions.creator";
import { getAvatarColor } from '../../util/Colors';
import Login from '../../pages/login/Login';
import Signup from '../../pages/signup/Signup';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      status: "",
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  showModal = (status) => {
    this.setState({
      visible: true,
      status: status,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleMenuClick({ key }) {
    if (key === "/logout") {
      this.props.history.push('/');
      this.props.logout();
    }
  }

  render() {
    let userInfo;
    if (this.props.isAuthenticated) {
      let { username } = this.props.currentUser;
      userInfo = [
        <Notification key="notification" />,
        <Avatar key="avatar" className="avatar" style={{ backgroundColor: getAvatarColor(username) }}>
          {username[0].toUpperCase()}
        </Avatar>,
        <ProfileDropdownMenu key="ProfileDropdownMenu" handleMenuClick={this.handleMenuClick} />,
      ];
    } else {
      let { status } = this.state;
      let component = <Login 
                        convertModal={() => this.showModal("Signup")} 
                        handleCancel={() => this.handleCancel()}
                      />;
      if (status.toLowerCase() === "signup") {
        component = <Signup 
                      convertModal={() => this.showModal("Login")} 
                      handleCancel={() => this.handleCancel()} 
                    />
      } 
      userInfo = [
        <Button key="login" type="primary" onClick={() => this.showModal("Login")}>
          Login
        </Button>,
        <Button key="signup" type="primary" onClick={() => this.showModal("Signup")}>
          Signup
        </Button>,
        <Modal
          key="modal"
          title={status}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          {component}
        </Modal>,
      ];
    }
    return (
      <Layout.Header>
        <Row>
          <Col span={5}>
            <Link to="/">
              <img className="logo" src='img/logo.png' alt="logo" />
            </Link>
          </Col>
          <Col span={14}>
            <Menu
              selectedKeys={[this.props.location.pathname]}
              mode="horizontal"
            >
              <Menu.SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    Challenges
            </span>
                }
              >
                <Menu.ItemGroup title="Coding Challenge">
                  <Menu.Item key="/challenges/language-proficiency">
                    <Link to="/challenges/language-proficiency">Language Proficiency</Link>
                  </Menu.Item>
                  <Menu.Item key="/challenges/problem-solving">
                    <Link to="/challenges/problem-solving">Problem Solving</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.Item key="/challenges/theory-quiz">
                  <Link to="/challenges/theory-quiz">Theory Quiz</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    Tutorials
            </span>
                }
              >
                <Menu.ItemGroup title="Fundalmental">
                  <Menu.Item key="/tutorials/algorithm">
                    <Link to="/tutorials/algorithm">Algorithm</Link>
                  </Menu.Item>
                  <Menu.Item key="/tutorials/data-structure">
                    <Link to="/tutorials/data-structure">Data structure</Link>
                  </Menu.Item>
                  <Menu.Item key="/tutorials/database">
                    <Link to="/tutorials/database">Database</Link>
                  </Menu.Item>
                  <Menu.Item key="/tutorials/oop">
                    <Link to="/tutorials/oop">OOP</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Language">
                  <Menu.Item key="/tutorials/java">
                    <Link to="/tutorials/java">Java</Link>
                  </Menu.Item>
                  <Menu.Item key="/tutorials/python">
                    <Link to="/tutorials/python">Python</Link>
                  </Menu.Item>
                  <Menu.Item key="/tutorials/sql">
                    <Link to="/tutorials/sql">SQL</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
              <Menu.Item key="/contests">
                <Link to="/contests">Contests</Link>
              </Menu.Item>
              <Menu.Item key="/user-plans">
                <Link to="/user-plans">Upgrade</Link>
              </Menu.Item>
              <Menu.Item key="/code-editor">
                <Link to="/code-editor">Code Editor</Link>
              </Menu.Item>
            </Menu>
          </Col>

          <Col span={5} className="noti-ava-acc">
            {userInfo}
          </Col>

        </Row>
      </Layout.Header>
    );
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick}>
      <Menu.Item key="/new-challenge">
        <Link to="/new-challenge">New challenge</Link>
      </Menu.Item>
      <Menu.Item key="/profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="/settings">
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="/logout">
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={dropdownMenu} trigger={['click']}>
      <a className="ant-dropdown-link" href="/">
        Binh Cao <Icon type="setting" />
      </a>
    </Dropdown>
  );
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
  isAuthenticated: state.userReducer.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));