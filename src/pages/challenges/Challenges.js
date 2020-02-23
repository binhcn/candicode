import React from 'react';
import { connect } from "react-redux";
import { Row } from 'antd';
import Challenge from './Challenge';

function Challenges() {
	return (
		<Row className="container-fluid">
			<Challenge />
			<Challenge />
			<Challenge />
			<Challenge />
			<Challenge />
			<Challenge />
			<Challenge />
		</Row>
	);
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
