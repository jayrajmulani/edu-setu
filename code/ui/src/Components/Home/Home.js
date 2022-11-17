import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";
import { Layout, Menu, Button, Popconfirm, message } from "antd";
import {
	GlobalOutlined,
	ProfileOutlined,
	UserOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import Postings from "../ProfessorDashboard/Postings";
import Applications from "../ProfessorDashboard/Applications";
import Profile from "../ProfessorDashboard/Profile";

const { Header, Content } = Layout;

export default class Home extends React.Component {
	state = { selected_tab: "" };

	onTabChange = (e) => this.setState({ selected_tab: e.key });

	onLogOut = () => {
		localStorage.clear();
		message.success("User Logged out successfully.", 1);
		window.location.replace("/");
	};

	renderTab = () => {
		switch (this.state.selected_tab) {
			case "applications":
				return <Applications />;
			case "profile":
				return <Profile />;
			default:
				return <Postings />;
		}
	};

	render() {
		return (
			<Layout style={{ height: "100vh" }}>
				<Header
					style={{
						position: "fixed",
						zIndex: 1,
						width: "100%",
						backgroundColor: "#f7f7f7",
					}}
				>
					<div className='logo'>
						<img src={logo} style={{ width: "100px", height: "50px" }} alt='logo' />
					</div>
					<div style={{ display: "flex" }}>
						<span style={{ flex: 1 }} />
						<Menu
							theme='light'
							mode='horizontal'
							style={{ backgroundColor: "#f7f7f7" }}
							defaultSelectedKeys={["postings"]}
							onClick={this.onTabChange}
						>
							<Menu.Item key='postings' icon={<ProfileOutlined />}>
								Postings
							</Menu.Item>
							<Menu.Item key='applications' icon={<GlobalOutlined />}>
								Applications
							</Menu.Item>
							<Menu.Item key='profile' icon={<UserOutlined />}>
								Profile
							</Menu.Item>
							<Menu.Item>
								<Popconfirm
									title='Are you sure?'
									onConfirm={this.onLogOut}
									okText='Yes'
									cancelText='No'
									icon={<QuestionCircleOutlined />}
								>
									<Button
										style={{ float: "right", marginTop: "15px" }}
										type='primary'
									>
										Logout
									</Button>
								</Popconfirm>
							</Menu.Item>
						</Menu>
					</div>
				</Header>
				<Content style={{ margin: "76px 32px 12px" }}>{this.renderTab()}</Content>
			</Layout>
		);
	}
}
