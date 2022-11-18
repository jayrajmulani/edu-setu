import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Home/NotFound";
import StudentHome from "./Components/StudentHome/StudentHome";

export default function App() {
	const authGuard = (Component) => () => {
		return localStorage.getItem("loggedIn") === "true" ? (
			<Component />
		) : (
			<Redirect to='/auth' />
		);
	};

	if (!localStorage.getItem("user_id")) {
		if (window.location.pathname !== "/auth") {
			window.location.href = "/auth";
		}
	} else if (window.location.pathname === "/auth") {
		if (localStorage.getItem("type").toLowerCase() === "professor")
			window.location.replace("/professor");
		else if (localStorage.getItem("type").toLowerCase() === "student")
			window.location.replace("/student");
	}

	return (
		<Router>
			<Switch>
				<Route path='/student'>
					<StudentHome />
				</Route>
				<Route path='/professor' render={authGuard(Home)}></Route>
				<Route path='/auth'>
					<Login />
				</Route>
				<Route exact path='/'>
					<Redirect to='/auth'></Redirect>
				</Route>
				<Route path='*'>
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
}
