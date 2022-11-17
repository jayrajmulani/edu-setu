import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Home/NotFound";
import StudentProfile from "./Components/StudentProfile/StudentProfile";
import TrackApplication from "./Components/TrackApplication/TrackApplication";
import StudentHomePage from "./Components/StudentDashboard/StudentDashboard";
import NavBar from "./Components/NavBar/NavBar";

export default function App() {
	const authGuard = (Component) => () => {
		return sessionStorage.getItem("loggedIn") === "true" ? (
			<Component />
		) : (
			<Redirect to='/auth' />
		);
	};

	if (!sessionStorage.getItem("user_id")) {
		if (window.location.pathname !== "/auth") {
			window.location.href = "/auth";
		}
	} else if (window.location.pathname === "/auth") {
		if (sessionStorage.getItem("type").toLowerCase() === "professor")
			window.location.replace("/professor");
		else if (sessionStorage.getItem("type").toLowerCase() === "student")
			window.location.replace("/student/home");
	}

	return (
		<Router>
			<Route path='/student'>
				<NavBar />
			</Route>
			<Switch>
				<Route exact path='/student/home'>
					<StudentHomePage />
				</Route>
				<Route exact path='/student/trackApplications'>
					<TrackApplication />
				</Route>
				<Route exact path='/student/myProfile'>
					<StudentProfile />
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
