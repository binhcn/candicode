import React from 'react';
import { Layout, Menu, Row, Avatar, Dropdown, Icon, Col, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import './Header.css';
import Notification from './Notification';
import {
  logout, openUserForm,
} from "../../actions/actions.creator";
import { getAvatarColor } from '../../util/Colors';
import UserForm from './UserForm';

class Header extends React.Component {

  handleMenuClick = key => {
    if (key.key === "/logout") {
      this.props.history.push('/');
      this.props.logout();
    }
  }

  render() {
    var { openUserForm, isAuthenticated, roles, avatar } = this.props;
    let userInfo;
    if (isAuthenticated) {
      var { firstName, lastName } = this.props.currentUser;
      userInfo = [
        <Notification key="notification" />,
        <Avatar key="avatar" src={avatar ? avatar : null} className="avatar" 
            style={{ backgroundColor: getAvatarColor(firstName + lastName) }}>
          {firstName[0].toUpperCase()}
        </Avatar>,
        <ProfileDropdownMenu key="ProfileDropdownMenu"
          handleMenuClick={this.handleMenuClick}
          username={firstName + lastName}
        />,
      ];
    } else {
      userInfo = [
        <Button key="login" className="mr-10" type="primary" onClick={() => openUserForm("Login")}>
          <FormattedMessage id='login' />
        </Button>,
        <Button key="signup" type="primary" onClick={() => openUserForm("Signup")}>
          <FormattedMessage id='signup' />
        </Button>,
        <UserForm key="modal" />,
      ];
    }
    return (
      <Layout.Header className="header">
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
              {/* <Menu.SubMenu
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
              </Menu.SubMenu> */}

              <Menu.Item key="/challenges">
                <Link to="/challenges">
                  <FormattedMessage id='challenge' />
                </Link>
              </Menu.Item>
              <Menu.Item key="/tutorials">
                <Link to="/tutorials">
                  <FormattedMessage id='tutorial' />
                </Link>
              </Menu.Item>
              <Menu.Item key="/contests">
                <Link to="/contests">
                  <FormattedMessage id='contest' />
                </Link>
              </Menu.Item>
              <Menu.Item key="/user-plans">
                <Link to="/user-plans">
                  <FormattedMessage id='upgrade' />
                </Link>
              </Menu.Item>
              {roles && (roles.includes('challenge creator')
                || roles.includes('tutorial creator')
                || roles.includes('contest creator')
                || roles.includes('admin')
                ) &&
                < Menu.Item key="/management">
                  <Link to="/management">
                    <FormattedMessage id='management' />
                  </Link>
                </Menu.Item>
              }
            </Menu>
          </Col>

          <Col span={5} className="noti-ava-acc">
            {userInfo}
          </Col>

        </Row>
      </Layout.Header >
    );
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick}>
      <Menu.Item key="/profile">
        <Link to="/profile">
          <FormattedMessage id='profile' />
        </Link>
      </Menu.Item>
      <Menu.Item key="/logout">
        <Link to="/logout">
          <FormattedMessage id='logout' />
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={dropdownMenu} trigger={['click']}>
      <a className="ant-dropdown-link" href="/">
        {props.username} <Icon type="setting" />
      </a>
    </Dropdown>
  );
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
  isAuthenticated: state.userReducer.isAuthenticated,
  roles: state.userReducer.roles,
  avatar: state.userReducer.avatar,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openUserForm: status => dispatch(openUserForm(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));