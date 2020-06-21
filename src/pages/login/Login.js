import React from 'react';
import { connect } from "react-redux";
import { Form, Input, Button, Icon, notification } from 'antd';

import './Login.css';
import { ACCESS_TOKEN } from '../../constants';
import { login } from '../../services/api.services';
import {
	getCurrentUser,
} from "../../actions/actions.creator";
import {
	USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
	PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';

const FormItem = Form.Item;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.onLogin = this.onLogin.bind(this);
	}

	onLogin() {
		notification.success({
			message: 'Welcome',
			description: "You're successfully logged in.",
		});
		this.props.getCurrentUser();
		// this.props.history.push("/");
		this.props.handleCancel();

	}

	render() {
		const AntWrappedLoginForm = Form.create()(LoginForm)
		return (
			<AntWrappedLoginForm onLogin={this.onLogin} showSignup={this.props.convertModal} handleCancel={this.props.handleCancel} />
		);
	}
}

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.convertSignup = this.convertSignup.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const loginRequest = Object.assign({}, values);
				login(loginRequest)
					.then(response => {
						if (response.status === 200) {
							localStorage.setItem(ACCESS_TOKEN, response.data.result.token);
							this.props.onLogin();
						} else {
							console.log(response)
							if (response.code === 401) {
								notification.error({
									message: 'Candicode',
									description: 'Your Username or Password is incorrect. Please try again!'
								});
							} else {
								const msg = response.subErrors 
								? response.subErrors[0].message + ': ' + response.subErrors[0].reason 
								: response.message + ': ' + response.reason;
								notification.error({
									message: "Failure",
									description: msg || 'Sorry! Something went wrong. Please try again!',
								});
							}
						}
					}).catch(error => {
						console.log(error)
					});
			}
		});
	}

	convertSignup() {
		this.props.handleCancel();
		this.props.showSignup();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('email', {
						validateTrigger: ['onBlur'],
						rules: [{
											required: true,
											message: 'Please input your username!',
										},
										{
											min: USERNAME_MIN_LENGTH,
											max: USERNAME_MAX_LENGTH,
											message: `Username must be longer than or equal to ${USERNAME_MIN_LENGTH}, shorter than equal to ${USERNAME_MAX_LENGTH}!`,
										},
										{
											whitespace: true,
											message: 'Your username only has whitespaces!',
										},
										{
											pattern: '[^@ ]+@[^@ ]+\\.[^@ ]+',
											message: "Email format might be incorrect!",
										},
									],
					})(
						<Input
							prefix={<Icon type="user" />}
							size="large"
							name="username"
							placeholder="Username" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						validateTrigger: ['onBlur'],
						rules: [{ required: true,
											message: 'Please input your Password!',
										},
										{
											min: PASSWORD_MIN_LENGTH,
											max: PASSWORD_MAX_LENGTH,
											message: `Your password must be longer than or equal to ${PASSWORD_MIN_LENGTH}, shorter than equal to ${PASSWORD_MAX_LENGTH}!`,
										},
										{
											whitespace: true,
											message: 'Your password only has whitespaces!',
										},
									],
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
					<Button type="primary" htmlType="submit" size="large" block>Login</Button>
					Not account yet, please <Button type="link" onClick={this.convertSignup}>Register now</Button>
				</FormItem>
			</Form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => dispatch(getCurrentUser()),
});

export default connect(null, mapDispatchToProps)(Login);
