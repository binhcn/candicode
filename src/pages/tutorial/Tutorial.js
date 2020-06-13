import React from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';

import './Tutorial.css';
import TutorialList from './TutorialList';

function Tutorial() {
	return (
		<Row className="container-fluid" gutter={32}>
			<Col span={18}>
				<TutorialList />
			</Col>
			<Col span={6}>
		
			<div className="widget">
				<div className="widget-title">
					<h4>Recent Contests</h4>
				</div>
				<ul className="comments-list">
					<li>
						<div className="alignleft">
							<a href="#0"><img src="http://via.placeholder.com/160x160.jpg" alt="" /></a>
						</div>
						<small>30.5.2020</small>
						<h3><a href="#0" title="">Hackathon</a></h3>
					</li>
					<li>
						<div className="alignleft">
							<a href="#0"><img src="http://via.placeholder.com/160x160.jpg" alt="" /></a>
						</div>
						<small>25.5.2020</small>
						<h3><a href="#0" title="">Coding Fighter</a></h3>
					</li>
					<li>
						<div className="alignleft">
							<a href="#0"><img src="http://via.placeholder.com/160x160.jpg" alt="" /></a>
						</div>
						<small>20.5.2020</small>
						<h3><a href="#0" title="">BK Innovation</a></h3>
					</li>
				</ul>
			</div>

			<div className="widget">
				<div className="widget-title">
					<h4>Challenge Categories</h4>
				</div>
				<ul className="cats">
					<li><a href="#0">Language Proficiency <span>(12)</span></a></li>
					<li><a href="#0">Problem solving <span>(21)</span></a></li>
					<li><a href="#0">Language Proficiency <span>(36)</span></a></li>
					<li><a href="#0">Problem solving <span>(48)</span></a></li>
				</ul>
			</div>

			<div className="widget">
				<div className="widget-title">
					<h4>Popular Tags</h4>
				</div>
				<div className="tags">
					<a href="#0">Database</a>
					<a href="#0">Functional Programming</a>
					<a href="#0">HTML</a>
					<a href="#0">OOP</a>
					<a href="#0">Algorithm</a>
				</div>
			</div>

			</Col>
			
		</Row>
	);
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
