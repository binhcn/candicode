import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './Profile.css';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

class Profile extends Component {
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

export default Profile;