import React from 'react';
import { Card, Avatar, Descriptions, Progress, Row, Col, Divider } from 'antd';
import Setting from './Setting';

import './Profile.css';
import { getAvatarColor } from '../../util/Colors';

const { Meta } = Card;
const username = "binh";

export default class LeftSide extends React.Component {
	state = {
		exp: 700,
		maxExp: 1000,
	}
	render() {
		const { exp, maxExp } = this.state;
		const value = exp / maxExp * 100;
		return (
			<div className="leftside-profile">
				<Card
					title="INFORMATION"
					extra={<Setting />}
				>
					<Meta
						avatar={
							<Avatar key="avatar" size="large" style={{ backgroundColor: getAvatarColor(username) }}>
								{username[0].toUpperCase()}
							</Avatar>
						}
						title="Binh Cao Nguyen"
						description="Không gì quý hơn độc lập, tự do"
					/>

					<Progress
						strokeColor={{
							from: 'red',
							to: 'yellow',
						}}
						percent={value}
						status="active"
						format={percent => {
							return exp + '/' + maxExp;
						}}
					/>

					<Descriptions>
						<Descriptions.Item label="Level">18</Descriptions.Item>
						<Descriptions.Item label="Title">Golden </Descriptions.Item>
					</Descriptions>

					<Row className="logo">
						<Col span={8}><img src="img/facebook.png" alt="facebook" /></Col>
						<Col span={8}><img src="img/github.svg" alt="github" /></Col>
						<Col span={8}><img src="img/linkin.png" alt="facebook" /></Col>
					</Row>
					<Divider />
					<span><i className="fas fa-map-marker-alt fa-lg" style={{ color: "tomato" }}></i> Location</span>
					<span style={{ float: 'right' }}>TpHCM, Vietnam</span>
					<Divider />
					<span><i className="fas fa-building fa-lg" style={{ color: "limegreen" }}></i> Company</span>
					<span style={{ float: 'right' }}>VNG Group</span>
					<Divider />
					<span><i className="fas fa-university fa-lg" style={{ color: "teal" }}></i> University</span>
					<span style={{ float: 'right' }}>Bach Khoa University</span>
				</Card>

				<Card title="PROGRESS">
					<span><i className="fas fa-code fa-lg" style={{ color: "dimgray" }}></i> Coding Challenge</span>
					<span style={{ float: 'right' }}>35/130</span>
					<Divider />
					<span><i className="fas fa-book-open fa-lg" style={{ color: "aqua" }}></i> Tutorial</span>
					<span style={{ float: 'right' }}>15/45</span>
					<Divider />
					<span><i className="fas fa-crown fa-lg" style={{ color: "gold" }}></i> Finished Contests</span>
					<span style={{ float: 'right' }} >35</span>
					<Divider />
					<span><i className="fas fa-chart-area fa-lg" style={{ color: "sienna" }}></i> Global Ranking</span>
					<span style={{ float: 'right' }}>2001/1610228</span>
				</Card>
			</div>
		)
	}
}