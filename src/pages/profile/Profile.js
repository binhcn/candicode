import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './Profile.scss';
import LeftSide from './LeftSide';
import RightSide from './RightSide';


class Profile extends Component {
	render() {
		return (
			<Row>
				<Col span={8}>
					<LeftSide />
				</Col>
				<Col span={16}>
					<RightSide />
				</Col>
			</Row>
		)
	}
}

export default Profile;