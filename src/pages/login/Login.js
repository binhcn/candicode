import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Form, Input, Button, Icon, notification } from 'antd';

import './Login.css';
import { ACCESS_TOKEN } from '../../constants';
import { login } from '../../services/project.services';
import {
  getCurrentUser,
} from "../../actions/actions.creator";

const FormItem = Form.Item;

class Login extends Component {
	constructor(props) {
		super(props);
		this.onLogin = this.onLogin.bind(this);
	}

	onLogin() {
		notification.success({
			message: 'Polling App',
			description: "You're successfully logged in.",
		});
		this.props.getCurrentUser();
		this.props.history.push("/");
	}

	render() {
		const AntWrappedLoginForm = Form.create()(LoginForm)
		return (
			<div className="login-container">
				<h1 className="page-title">Login</h1>
				<div className="login-content">
					<AntWrappedLoginForm onLogin={this.onLogin} />
				</div>
			</div>
		);
	}
}

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const loginRequest = Object.assign({}, values);
				login(loginRequest)
					.then(response => {
						localStorage.setItem(ACCESS_TOKEN, response.accessToken);
						this.props.onLogin();
					}).catch(error => {
						if (error.status === 401) {
							notification.error({
								message: 'Polling App',
								description: 'Your Username or Password is incorrect. Please try again!'
							});
						} else {
							notification.error({
								message: 'Polling App',
								description: error.message || 'Sorry! Something went wrong. Please try again!'
							});
						}
					});
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('usernameOrEmail', {
						rules: [{ required: true, message: 'Please input your username or email!' }],
					})(
						<Input
							prefix={<Icon type="user" />}
							size="large"
							name="usernameOrEmail"
							placeholder="Username or Email" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input
							prefix={<Icon type="lock" />}
							size="large"
							name="password"
							type="password"
							placeholder="Password" />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
					Or <Link to="/signup">register now!</Link>
				</FormItem>
			</Form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(null, mapDispatchToProps)(Login);