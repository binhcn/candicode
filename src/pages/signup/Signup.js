import React from 'react';
import { Form, Input, Button, notification, Icon, Row, Col } from 'antd';

import './Signup.css';
import { signup } from '../../services/api.services';
import {
	USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';

const FormItem = Form.Item;

class Signup extends React.Component {
	render() {
		const AntWrappedSignupForm = Form.create()(SignupForm)
		return (
			<AntWrappedSignupForm showLogin={this.props.convertModal} handleCancel={this.props.handleCancel} />
		);
	}
}

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.convertLogin = this.convertLogin.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				const signupRequest = Object.assign({}, values);
				signup(signupRequest)
					.then(response => {
						console.log(response)
						if (response.status === 201) {
							notification.success({
								message: "Success",
								description: "Thank you! You're successfully registered. Please Login to continue!",
							});
							this.convertLogin();
						} else {
							const msg = response.subErrors
								? response.subErrors[0].message + ': ' + response.subErrors[0].reason
								: response.message + ': ' + response.reason;
							notification.error({
								message: "Failure",
								description: msg || 'Sorry! Something went wrong. Please try again!',
							});
						}
					}).catch(error => {
						console.log(error)
						notification.error({
							message: 'Candicode',
							description: error.message || 'Sorry! Something went wrong. Please try again!'
						});
					});
			}
		})
	}

	convertLogin() {
		this.props.handleCancel();
		this.props.showLogin();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<Row gutter={15}>
					<Col span={12}>
						<FormItem>
							{getFieldDecorator('firstName', {
								validateTrigger: ['onBlur'],
								rules: [{
									required: true,
									message: 'Please input your first name!',
								},
								{
									min: USERNAME_MIN_LENGTH,
									max: USERNAME_MAX_LENGTH,
									message: `Your first name must be longer than or equal to ${USERNAME_MIN_LENGTH}, shorter than equal to ${USERNAME_MAX_LENGTH}!`,
								},
								{
									whitespace: true,
									message: 'Your first name only has whitespaces!',
								},
								],
							})(
								<Input
									prefix={<Icon type="user" />}
									size="large"
									name="firstname"
									placeholder="First name" />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem>
							{getFieldDecorator('lastName', {
								validateTrigger: ['onBlur'],
								rules: [{
									required: true,
									message: 'Please input your last name!',
								},
								{
									min: USERNAME_MIN_LENGTH,
									max: USERNAME_MAX_LENGTH,
									message: `Your last name must be longer than or equal to ${USERNAME_MIN_LENGTH}, shorter than equal to ${USERNAME_MAX_LENGTH}!`,
								},
								{
									whitespace: true,
									message: 'Your last name only has whitespaces!',
								},
								],
							})(
								<Input
									prefix={<Icon type="user" />}
									size="large"
									name="lastname"
									placeholder="Last name" />
							)}
						</FormItem>
					</Col>
				</Row>
				<FormItem>
					{getFieldDecorator('email', {
						validateTrigger: ['onBlur'],
						rules: [{
							required: true,
							message: 'Please input your email!',
						},
						{
							pattern: '[^@ ]+@[^@ ]+\\.[^@ ]+',
							message: "Your email's format might be incorrect!",
						},
						{
							max: EMAIL_MAX_LENGTH,
							message: `Your email must be shorter than equal to ${EMAIL_MAX_LENGTH}!`,
						},
						{
							whitespace: true,
							message: 'Your email only has whitespaces!',
						},
						],
					})(
						<Input
							prefix={<i className="far fa-envelope"></i>}
							size="large"
							name="email"
							placeholder="Email" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						validateTrigger: ['onBlur'],
						rules: [{
							required: true,
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
					{getFieldDecorator('confirmPassword', {
						validateTrigger: ['onBlur'],
						rules: [{
							required: true,
							message: 'Please input again your Password!',
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
							prefix={<i className="fas fa-lock"></i>}
							size="large"
							name="confirmPassword"
							type="password"
							placeholder="Comfirm password" />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" size="large" block>Signup</Button>
					Have your account already! <Button type="link" onClick={this.convertLogin}>Login now</Button>
				</FormItem>
			</Form>
		);
	}
}

export default Signup;