import React from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

import './common.css';

class Sidebar extends React.Component {

	render() {
		var { tags } = this.props;
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
			return <Link key={index} to={prefix + item}>{item}</Link>
		})
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
						<li><a href="#0">Language Proficiency <span>(12)</span></a></li>
						<li><a href="#0">Problem solving <span>(21)</span></a></li>
						<li><a href="#0">Language Proficiency <span>(36)</span></a></li>
						<li><a href="#0">Problem solving <span>(48)</span></a></li>
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
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
