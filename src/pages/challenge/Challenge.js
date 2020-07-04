import React from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';

import './Challenge.css';
import ChallengeList from './ChallengeList';
import Sidebar from '../common/Sidebar';
import Filter from '../common/Filter';

function Challenges() {
	return (
		<Row className="container-fluid" gutter={16}>
			<Col span={18}>
				<Row style={{marginRight:'30px'}}>
					<Filter />
				</Row>
				<ChallengeList />
			</Col>
			<Col span={6}>
				<Sidebar />
			</Col>

		</Row>
	);
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
