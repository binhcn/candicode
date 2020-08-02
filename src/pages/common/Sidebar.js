import React from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

import './common.css';
import {
  getAllChallenges, getAllTutorials, getAllContests,
} from "../../actions/actions.creator";

class Sidebar extends React.Component {

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
		var { tags, categories } = this.props;
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
					<Link onClick={() => this.filter(prefix + item.toLowerCase())}
					to={prefix + item.toLowerCase()}>{item}</Link>
					<span style={{float:'right'}}>({index + 1})</span>
				</p>			
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
						<li>
							<div className="alignleft">
								<a href="#0"><img src="https://techvccloud.mediacdn.vn/zoom/650_406/2018/12/22/1supq92uyknelefyyf7ughw-15454498606631836572894-crop-1545449864895548482406.png" alt="" /></a>
							</div>
							<small>30.5.2020</small>
							<h3><a href="#0" title="">Hackathon</a></h3>
						</li>
						<li>
							<div className="alignleft">
								<a href="#0"><img src="https://railsmama.files.wordpress.com/2014/10/code_brain.jpg" alt="" /></a>
							</div>
							<small>25.5.2020</small>
							<h3><a href="#0" title="">Coding Fighter</a></h3>
						</li>
						<li>
							<div className="alignleft">
								<a href="#0"><img src="https://www.hcmut.edu.vn/upload_hcmut/images/Hinh%202017/bk1.png" alt="" /></a>
							</div>
							<small>20.5.2020</small>
							<h3><a href="#0" title="">BK Innovation</a></h3>
						</li>
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
});

const mapDispatchToProps = dispatch => ({
	getAllChallenges: params => dispatch(getAllChallenges(params)),
  getAllTutorials: params => dispatch(getAllTutorials(params)),
  getAllContests: params => dispatch(getAllContests(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
