import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import './Profile.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import {
  getProfileSubmissions, getUserDetails, getCurrentUser,
} from "../../actions/actions.creator";

class Profile extends Component {

	constructor(props) {
		super(props);
		const {
      location: { pathname: path },
    } = this.props;
		const userId = path.split('/').slice(-1)[0];
		if (userId === 'profile') {
			this.props.getProfileSubmissions();
			this.props.getCurrentUser();
		} else {
			this.props.getUserDetails(userId);
		}
	}
	
	render() {
		return (
			<Row>
				<Col span={7}>
					<LeftSide />
				</Col>
				<Col span={17}>
					<RightSide />
				</Col>
			</Row>
		)
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	getProfileSubmissions: () => dispatch(getProfileSubmissions()),
	getUserDetails: userId => dispatch(getUserDetails(userId)),
	getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));