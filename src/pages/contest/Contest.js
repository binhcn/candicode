import React from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';

import './Contest.css';
import ContestList from './ContestList';
import Sidebar from '../common/Sidebar';

function Contest() {
	return (
		<Row className="container-fluid" gutter={32}>
			<Col span={18}>
				<ContestList />
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

export default connect(mapStateToProps, mapDispatchToProps)(Contest);
