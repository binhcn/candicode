import React from 'react';
import { Icon, Divider, Modal, Button, Radio, Col, } from 'antd';
import { connect } from "react-redux";

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
    var { currentUser } = this.props;
    var basicHtml =
      <>
        <li><strong><Icon type="check" /></strong> Save your submissions</li>
        <li><strong><Icon type="check" /></strong> Compile &amp; run challenge</li>
        <li><strong><Icon type="check" /></strong> View public testcases</li>
        <li><strong><Icon type="check" /></strong> Manage your dashboard</li>
        <li><strong><Icon type="check" /></strong> Participate contests</li>
      </>
    var standardHtml =
      <>
        <li><strong><Icon type="check" /></strong> View hidden testcases</li>
        <li><strong><Icon type="check" /></strong> Manage challenges</li>
        <li><strong><Icon type="check" /></strong> Manage tutorials</li>
      </>
    var premiumHtml =
      <>
        <li><strong><Icon type="check" /></strong> Manage your contests</li>
        <li><strong><Icon type="check" /></strong> View your contest statistics</li>
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
              <h3>Basic PACKAGE</h3>
              <div className="price">$Free<span>/PER MONTH</span>
              </div>
            </div>
            <div className="entry-content">
              <ul>
                {basicHtml}
              </ul>
            </div>
            {currentUser ?
              <Button type="primary" disabled={true}>
                ALREADY LOGIN
              </Button>
              :
              <Button type="danger" onClick={() => this.props.openUserForm('Login')}>
                ONLY LOGIN
              </Button>
            }
          </div>
        </div>

        <div className="plan standard">
          <div className="plan-inner">
            <div className="hot">hot</div>
            <div className="entry-title">
              <h3>STANDARD PACKAGE</h3>
              <div className="price">80k<span>/PER MONTH</span>
              </div>
            </div>
            <div className="entry-content">
              <ul>
                {standardHtml}
                <Divider />
                {basicHtml}
              </ul>
            </div>
            <Button disabled={currentUser ? false : true} type="danger" onClick={() => this.showModal("standard")}>
              UPGRADE
            </Button>
          </div>
        </div>

        <div className="plan ultimite">
          <div className="plan-inner">
            <div className="hot">hot</div>
            <div className="entry-title">
              <h3>PREMIUM PACKAGE</h3>
              <div className="price">100k<span>/PER MONTH</span>
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
            <Button disabled={currentUser ? false : true} type="danger" onClick={() => this.showModal("premium")}>
              UPGRADE
            </Button>
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
});

const mapDispatchToProps = dispatch => ({
  openUserForm: status => dispatch(openUserForm(status)),
  upgradeUserPlan: payload => dispatch(upgradeUserPlan(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPlan);