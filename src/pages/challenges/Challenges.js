import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Row } from 'antd';
import Challenge from './Challenge';

const challengeList = [
	{
		banner: "https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		title: "Functional programming",
		description: "Very hard",
	},
	{
		banner: "https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		title: "Functional programming",
		description: "Very hard",
	},
	{
		banner: "https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		title: "Functional programming",
		description: "Very hard",
	},
	{
		banner: "https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		title: "Functional programming",
		description: "Very hard",
	},
	{
		banner: "https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		title: "Functional programming",
		description: "Very hard",
	},
	{
		banner: "https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		title: "Functional programming",
		description: "Very hard",
	},
	{
		banner: "https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		title: "Functional programming",
		description: "Very hard",
	},
]

function Challenges() {
	const challengeHtml = challengeList.map((item, index) => ( 
		<Link to="/code-editor" key="index">
			<Challenge banner={item.banner} avatar={item.avatar} title={item.title} description={item.description} />
		</Link>
	)); 
	return (
		<Row className="container-fluid">
			{challengeHtml}
		</Row>
	);
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
