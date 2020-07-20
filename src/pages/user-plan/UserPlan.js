import React from 'react';
import { Icon, Divider, Modal, Button, Radio, Col, } from 'antd';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import './UserPlan.css';
import {
  openUserForm, upgradeUserPlan,
} from "../../actions/actions.creator";

class UserPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userPlan: 'standard',
    };
  }

  showModal = userPlan => {
    this.setState({
      visible: true,
      userPlan,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = () => {
    this.props.changeUserPassword();
    this.onClose();
  };

  upgradeUserPlan = () => {
    var payload = { plan: this.state.userPlan.toLowerCase() };
    this.props.upgradeUserPlan(payload);
  }

  render() {
    var { userPlan, visible } = this.state;
    var { currentUser, roles } = this.props;
    var basicHtml =
      <>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='save_your_submissions' />
        </li>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='compile_&_run_challenge' />
        </li>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='view_public_testcases' />
        </li>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='manage_your_dashboard' />
        </li>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='participate_contests' />
        </li>
      </>
    var standardHtml =
      <>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='view_hidden_testcases' />
        </li>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='manage_challenges' />
        </li>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='manage_tutorials' />
        </li>
      </>
    var premiumHtml =
      <>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='manage_your_contests' />
        </li>
        <li>
          <strong><Icon type="check" /></strong>
          <FormattedMessage id='view_your_contest_statistics' />
        </li>
      </>
    return (
      <div id="price" className="container-fluid">
        <img
          className="paper-plane"
          src="https://pngimg.com/uploads/paper_plane/paper_plane_PNG83.png"
          alt="paper-plane"
        />
        <div className="plan basic">
          <div className="plan-inner">
            <div className="entry-title">
              <h3>
                <FormattedMessage id='BASIC_PACKAGE' />
              </h3>
              <div className="price">$Free
                <span>
                  <FormattedMessage id='PER_MONTH' />
                </span>
              </div>
            </div>
            <div className="entry-content">
              <ul>
                {basicHtml}
              </ul>
            </div>
            {currentUser ?
              <Button type="primary" disabled={true}>
                <FormattedMessage id='ALREADY_LOGIN' />
              </Button>
              :
              <Button type="danger" onClick={() => this.props.openUserForm('Login')}>
                <FormattedMessage id='ONLY_LOGIN' />
              </Button>
            }
          </div>
        </div>

        <div className="plan standard">
          <div className="plan-inner">
            <div className="hot">
              <FormattedMessage id='HOT' />
            </div>
            <div className="entry-title">
              <h3>
                <FormattedMessage id='STANDARD_PACKAGE' />
              </h3>
              <div className="price">80k
                <span>
                  <FormattedMessage id='PER_MONTH' />
                </span>
              </div>
            </div>
            <div className="entry-content">
              <ul>
                {standardHtml}
                <Divider />
                {basicHtml}
              </ul>
            </div>
            {roles && (roles.includes('challenge creator') || roles.includes('admin')) ?
              <Button type="primary" disabled={true}>
                <FormattedMessage id='ALREADY_UPGRADED' />
              </Button>
              :
              <Button disabled={currentUser ? false : true} type="danger" onClick={() => this.showModal("standard")}>
                <FormattedMessage id='UPGRADE' />
              </Button>
            }

          </div>
        </div>

        <div className="plan ultimite">
          <div className="plan-inner">
            <div className="hot">
              <FormattedMessage id='HOT' />
            </div>
            <div className="entry-title">
              <h3>
                <FormattedMessage id='PREMIUM_PACKAGE' />
              </h3>
              <div className="price">100k
                <span>
                  <FormattedMessage id='PER_MONTH' />
                </span>
              </div>
            </div>
            <div className="entry-content">
              <ul>
                {premiumHtml}
                <Divider />
                {standardHtml}
                <Divider />
                {basicHtml}
              </ul>
            </div>
            {roles && (roles.includes('contest creator') || roles.includes('admin')) ?
              <Button type="primary" disabled={true}>
                <FormattedMessage id='ALREADY_UPGRADED' />
              </Button>
              :
              <Button disabled={currentUser ? false : true} type="danger" onClick={() => this.showModal("premium")}>
                <FormattedMessage id='UPGRADE' />
            </Button>
            }
          </div>
        </div>

        {visible &&
          <Modal
            className="payment-modal"
            title="UPGRADE USER PLAN"
            width="500px"
            visible={visible}
            onCancel={() => this.onClose()}
            footer={null}
          >
            <div className="user-plan">
              <p className="header">User plan</p>
              <p className="details">
                <span className="name">
                  {userPlan.toLowerCase() === 'standard' ? 'STANDARD' : 'PREMIUM'}
                </span>
                <span className="price">
                  {userPlan.toLowerCase() === 'standard' ? '80.000VND' : '100.000VND'}
                </span>
              </p>
            </div>

            <div>
              <p className="header">Payment method</p>
              <Radio defaultChecked={true} disabled={true}>
                <img alt="momo" src="img/momo.jpeg" width="40px" />
                &nbsp;
                Thanh toán bằng Momo
              </Radio>
            </div>

            <Divider />

            <Col offset={18}>
              <Button htmlType="submit" type="primary" onClick={this.upgradeUserPlan}>
                Upgrade
              </Button>
            </Col>

          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
  roles: state.userReducer.roles,
});

const mapDispatchToProps = dispatch => ({
  openUserForm: status => dispatch(openUserForm(status)),
  upgradeUserPlan: payload => dispatch(upgradeUserPlan(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPlan);