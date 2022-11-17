import React from "react";
import { Button, PageHeader, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function NavBar() {
	const menu = (
		<Menu
			items={[
				{
					label: (
						<div onClick={() => window.location.replace("/student/myProfile")}>
							Profile
						</div>
					),
					key: "profile",
				},
				{
					label: (
						<div
							onClick={() => {
								localStorage.setItem("user_id", null);
								localStorage.setItem("type", null);
								window.location.replace("/auth");
							}}
						>
							Logout
						</div>
					),
					key: "logout",
				},
			]}
		/>
	);

	return (
		<PageHeader
			title={
				<img
					src={`${process.env.PUBLIC_URL}/assets/images/Edu_Setu_Logo_Transparent.png`}
					alt='Logo'
					id='logo'
					style={{ height: 38, margin: "-6px 0" }}
				/>
			}
			extra={[
				<Button key='1' type='text' href='/student/home'>
					Home
				</Button>,
				<Button key='2' type='text' href='#home'>
					Saved Jobs
				</Button>,
				<Button key='3' type='text' href='/student/trackApplications'>
					Applications
				</Button>,
				<Dropdown key='4' overlay={menu}>
					<Button type='text' icon={<UserOutlined />} />
				</Dropdown>,
			]}
			style={{ backgroundColor: "#fff" }}
		/>
	);
}
