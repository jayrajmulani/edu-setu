import React from "react";
import { Component } from "react";
import { Button, Card, Form, Input, Typography } from "antd";

import config from "../../config";
import "./StudentProfile.css";

export default class StudentProfile extends Component {
	state = {
		user_id: localStorage.getItem("user_id"),
		user_name: "",
		current_user: {},
		loading: true,
	};

	componentDidMount() {
		this.getUserProfile();
	}

	getUserProfile = () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_id: this.state.user_id }),
		};
		fetch(config.baseUrl + "/get_user_profile", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				var changed_details = data.data;
				changed_details["user_id"] = this.state.user_id;
				this.setState({
					current_user: changed_details,
					user_name: data.data.display_name,
					loading: false,
				});
			});
	};

	updateValues(e) {
		var changed_details = this.state.current_user;
		var detail = document.getElementById(e.target.id).value;
		changed_details[e.target.id] = detail;
		this.setState({ current_user: changed_details });
	}

	async updateProfile() {
		var current_user = this.state.current_user;
		current_user["password"] = "jane.doe@gmail.com";
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(current_user),
		};
		await fetch(config.baseUrl + "/edit_profile", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.status === true) alert("Profile updated succesfully!");
			});

		this.getUserProfile();
	}

	render() {
		return (
			<div className='StudentProfile'>
				<Card title='Profile Settings' loading={this.state.loading}>
					<div style={{ display: "flex" }}>
						<div
							style={{
								padding: "16px 48px",
								textAlign: "center",
								alignItems: "center",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								width: 300,
							}}
						>
							<img
								width='150px'
								src='https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Clipart.png'
								alt='user'
							/>
							<Typography.Text strong>{this.state.user_name}</Typography.Text>
							<Typography.Text type='secondary'>
								{this.state.current_user.email}
							</Typography.Text>
						</div>
						<div style={{ padding: "16px 48px", flex: 1 }}>
							<Form
								name='profile'
								labelCol={{ span: 3 }}
								wrapperCol={{ span: 12 }}
								onFinish={this.updateProfile}
								initialValues={{
									display_name: this.state.current_user.display_name,
									phone: this.state.current_user.phone,
									degree: this.state.current_user.degree,
									major: this.state.current_user.major,
									minor: this.state.current_user.minor,
									gpa: this.state.current_user.gpa,
									year: this.state.current_user.year,
								}}
							>
								<Form.Item label='Name' name='display_name'>
									<Input />
								</Form.Item>
								<Form.Item label='Mobile Number' name='phone'>
									<Input />
								</Form.Item>
								<Form.Item label='Degree' name='degree'>
									<Input />
								</Form.Item>
								<Form.Item label='Major' name='major'>
									<Input />
								</Form.Item>
								<Form.Item label='Minor' name='minor'>
									<Input />
								</Form.Item>
								<Form.Item label='GPA' name='gpa'>
									<Input />
								</Form.Item>
								<Form.Item label='Year' name='year'>
									<Input />
								</Form.Item>
								<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
									<Button type='primary' htmlType='submit'>
										Submit
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}
