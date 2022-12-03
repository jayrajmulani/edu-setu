import React from "react";
import { Table, message, Modal, Button, Space, Tooltip, Input, Popconfirm, Card } from "antd";
import config from "../../config";
import Column from "antd/lib/table/Column";
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	ReloadOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import AddNewPosting from "./AddNewPosting";
import { UpdatePosting } from "./UpdatePosting";

export default class Postings extends React.Component {
	formRef = React.createRef();
	updateFormRef = React.createRef();

	state = {
		data: [],
		filteredData: [],
		loading: false,
		loadingAddPosting: false,
		visible: false,
		updateVisible: false,
		updateData: {},
		loadingDeletePosting: false,
	};

	onSearch = (value) => {
		const { data } = this.state;
		let searchLower = value.toLowerCase();
		let filtered = data.filter((item) => {
			return item.title.toLowerCase().includes(searchLower) ? true : false;
		});
		this.setState({ filteredData: filtered });
	};

	onSearchChange = (e) => (e.target.value.length === 0 ? this.onSearch("") : null);

	onClose = () => this.setState({ visible: false, updateVisible: false });

	onAddPosting = () => this.setState({ visible: true });

	populateUpdateData = () => this.updateFormRef.current?.setFieldsValue(this.state.updateData);

	fetchPostings = () => {
		this.setState({ loading: true });
		let url = `${config.baseUrl}/get_all_postings_by_professor`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				professor: localStorage.getItem("user_id"),
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					this.setState({ data: response.data, filteredData: response.data });
				} else {
					message.error(response.data, 1);
				}
				this.setState({ loading: false });
			})
			.catch((err) => console.log(err));
	};

	componentDidMount() {
		this.fetchPostings();
	}

	submitAddPosting = (data) => {
		this.setState({ loadingAddPosting: true });
		let url = `${config.baseUrl}/add_posting`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					this.setState({ visible: false });
					message.success(response.data);
					this.fetchPostings();
				} else {
					message.error(response.data, 3);
					this.registerFormRef.current?.resetFields();
				}
				this.setState({ loadingAddPosting: false });
			})
			.catch((err) => console.log(err));
	};

	submitUpdatePosting = (data) => {
		this.setState({ loadingAddPosting: true });
		let url = `${config.baseUrl}/update_posting`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					this.setState({ updateVisible: false });
					message.success(response.data);
					this.fetchPostings();
				} else {
					message.error(response.data, 3);
					this.registerFormRef.current?.resetFields();
				}
				this.setState({ loadingAddPosting: false });
			})
			.catch((err) => console.log(err));
	};

	onUpdate = (record) => this.setState({ updateVisible: true, updateData: record });

	onDeletePosting = (data) => {
		this.setState({ loadingDeletePosting: true });
		let url = `${config.baseUrl}/delete_posting`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					message.success(response.data);
					this.fetchPostings();
				} else {
					message.error(response.data, 3);
				}
				this.setState({ loadingDeletePosting: false });
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Card
				title='Postings'
				extra={[
					<Input.Search
						onChange={this.onSearchChange}
						placeholder='Search...'
						allowClear
						style={{ width: 400, marginRight: 16 }}
						onSearch={this.onSearch}
						name='postingSearch'
					/>,
					<Button icon={<PlusOutlined />} type='primary' onClick={this.onAddPosting}>
						Add posting
					</Button>,
					<Button type='link' icon={<ReloadOutlined />} onClick={this.fetchPostings}>
						Refresh
					</Button>,
				]}
			>
				<Modal
					title='Add Posting'
					open={this.state.visible}
					onCancel={this.onClose}
					footer={null}
					maskClosable={false}
					centered={true}
				>
					<AddNewPosting {...this} {...this.state} {...this.props} />
				</Modal>
				<Modal
					title='Update Posting'
					open={this.state.updateVisible}
					onCancel={this.onClose}
					footer={null}
					maskClosable={false}
					centered={true}
				>
					<UpdatePosting {...this} {...this.state} {...this.props} />
				</Modal>
				<Table
					loading={this.state.loading}
					size='small'
					dataSource={this.state.filteredData}
				>
					<Column title='Title' dataIndex='title' key='title' />
					<Column title='Description' dataIndex='description' key='description' />
					<Column title='Prerequisites' dataIndex='prerequisites' key='prerequisites' />
					<Column title='Created' dataIndex='created_at' key='created_at' />
					<Column title='Updated' dataIndex='updated_at' key='updated_at' />
					<Column
						title='Actions'
						key='action'
						render={(record) => (
							<Space size='small'>
								<Tooltip title='Update Posting'>
									<Button
										disabled={this.state.readOnly}
										type='link'
										icon={<EditOutlined />}
										onClick={() => this.onUpdate(record)}
									/>
								</Tooltip>
								<Popconfirm
									placement='bottom'
									title='Are you sure? This would also delete all the corresponding applications and linked data!'
									onConfirm={() => this.onDeletePosting(record)}
									okText='Yes'
									cancelText='No'
									icon={<QuestionCircleOutlined />}
								>
									<Tooltip title='Delete Posting'>
										<Button type='link' icon={<DeleteOutlined />} />
									</Tooltip>
								</Popconfirm>
							</Space>
						)}
					></Column>
				</Table>
			</Card>
		);
	}
}
