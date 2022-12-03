import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";
import "../Login/Login.css";
const { Option } = Select;

export default class AddNewPosting extends Component {
	onSubmitAddPosting = () => {
		this.props.formRef.current.validateFields().then((values) => {
			values.professor = localStorage.getItem("user_id");
			this.props.submitAddPosting(values);
		});
	};

	render() {
		return (
			<Form
				ref={this.props.formRef}
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 30 }}
				onFinish={this.onSubmitAddPosting}
			>
				<Form.Item
					label='Title'
					name='title'
					rules={[
						{
							required: true,
							message: "Please input your Title!",
						},
					]}
				>
					<Input placeholder='Title' />
				</Form.Item>
				<Form.Item
					label='Description'
					name='description'
					rules={[
						{
							required: true,
							message: "Please describe this posting.",
						},
					]}
				>
					<Input.TextArea
						placeholder='Describe this posting, like a job description!'
						rows={8}
					/>
				</Form.Item>
				<Form.Item
					label='Prerequisites'
					name='prerequisites'
					rules={[
						{
							required: true,
							message:
								"Please specify the pre-requisite skills/qualifications for this role.",
						},
					]}
				>
					<Input.TextArea
						rows={8}
						placeholder='Describe what all skills/quilifications students need to have to be eligible to apply for this posting'
					/>
				</Form.Item>
				<Form.Item
					name='location'
					label='Location'
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please select a location",
						},
					]}
				>
					<Select placeholder='Where would the student work?'>
						<Option key='in_person' value='In Person'>
							In Person
						</Option>
						<Option key='remote' value='Remote'>
							Remote
						</Option>
						<Option key='hybrid' value='Hybrid'>
							Hybrid
						</Option>
					</Select>
				</Form.Item>
				<Button
					style={{ float: "right" }}
					type='primary'
					htmlType='submit'
					loading={this.props.loadingAddPosting}
				>
					Submit
				</Button>
				<Button type='link' onClick={() => this.props.formRef.current?.resetFields()}>
					Reset Form
				</Button>
			</Form>
		);
	}
}
