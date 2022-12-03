import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";
import { Layout, Menu, Button, Popconfirm, message } from "antd";
import {
	GlobalOutlined,
	ProfileOutlined,
	UserOutlined,
	QuestionCircleOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import Postings from "../ProfessorDashboard/Postings";
import Applications from "../ProfessorDashboard/Applications";
import Profile from "../ProfessorDashboard/Profile";
import Shortlisted from "../ProfessorDashboard/Shortlisted";

const { Header, Content } = Layout;

export default class Home extends React.Component {
	state = { selected_tab: "" };

	onTabChange = (e) => this.setState({ selected_tab: e.key });

	onLogOut = () => {
		localStorage.clear();
		message.success("User Logged out successfully.", 1);
		this.props.history.push("/auth");
	};

	renderTab = () => {
		switch (this.state.selected_tab) {
			case "applications":
				return <Applications />;
			case "profile":
				return <Profile />;
			case "shortlisted":
				return <Shortlisted />;	
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
						backgroundColor: "#fff",
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
							style={{ backgroundColor: "#fff", width: 520 }}
							defaultSelectedKeys={["postings"]}
							onClick={this.onTabChange}
							items={[
								{ key: "postings", label: "Postings", icon: <ProfileOutlined /> },
								{
									key: "applications",
									label: "All Applicants",
									icon: <GlobalOutlined />,
								},
								{
									key: "shortlisted",
									label: "Shortlisted",
									icon: <GlobalOutlined />,
								},
								{ key: "profile", label: "Profile", icon: <UserOutlined /> },
							]}
						/>
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
								icon={<LogoutOutlined />}
							>
								Logout
							</Button>
						</Popconfirm>
					</div>
				</Header>
				<Content style={{ margin: "76px 32px 12px" }}>{this.renderTab()}</Content>
			</Layout>
		);
	}
}
