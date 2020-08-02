import React from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

import './common.css';
import {
	getAllChallenges, getAllTutorials, getAllContests,
} from "../../actions/actions.creator";

class Sidebar extends React.Component {

	constructor(props) {
		super(props);
		this.props.getAllContests();
	}

	filter = url => {
		if (url.startsWith('/challenges')) {
			this.props.getAllChallenges(url.substring(11));
		} else if (url.startsWith('/tutorials')) {
			this.props.getAllTutorials(url.substring(10));
		} else {
			this.props.getAllContests(url.substring(9));
		}
	}

	render() {
		var { tags, categories, data } = this.props;
		var tagHtml = tags.map((item, index) => {
			const {
				location: { pathname: path },
			} = this.props;
			var prefix = '';
			if (path.startsWith('/challenges')) {
				prefix = '/challenges?tag=';
			} else if (path.startsWith('/tutorials')) {
				prefix = '/tutorials?tag=';
			} else {
				prefix = '/contests?tag=';
			}
			return <Link key={index}
				onClick={() => this.filter(prefix + item.toLowerCase())}
				to={prefix + item.toLowerCase()}>
				{item}
			</Link>
		})

		var categoryHtml = categories.map((item, index) => {
			var prefix = '/challenges?category=';
			return (
				<p key={index}>
					<Link onClick={() => this.filter(prefix + item.name.toLowerCase())}
						to={prefix + item.name.toLowerCase()}>{item.name[0].toUpperCase() + item.name.substring(1)}</Link>
					<span style={{ float: 'right' }}>({item.count})</span>
				</p>
			)
		});

		var contestHtml = data.map((contest, index) => {
			return (
				<li key={index}>
					<div className="alignleft">
						<img src={contest.banner} alt="" />
					</div>
					<small>{contest.registrationDeadline.substring(0, contest.registrationDeadline.length - 7)}</small>
					<h3>
						<a href="#0" title="">{contest.title}</a>
					</h3>
				</li>
			)
		});

		return (
			<>
				<div className="widget">
					<div className="widget-title">
						<h4>
							<FormattedMessage id='recent_contests' />
						</h4>
					</div>
					<ul className="comments-list">
						{contestHtml}
					</ul>
				</div>

				<div className="widget">
					<div className="widget-title">
						<h4>
							<FormattedMessage id='categories' />
						</h4>
					</div>
					<ul className="cats">
						{categoryHtml}
					</ul>
				</div>

				<div className="widget">
					<div className="widget-title">
						<h4><FormattedMessage id='popular_tags' /></h4>
					</div>
					<div className="tags">
						{tagHtml}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({
	tags: state.userReducer.tags,
	categories: state.userReducer.categories,
	data: state.contestReducer.data,
});

const mapDispatchToProps = dispatch => ({
	getAllChallenges: params => dispatch(getAllChallenges(params)),
	getAllTutorials: params => dispatch(getAllTutorials(params)),
	getAllContests: params => dispatch(getAllContests(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
