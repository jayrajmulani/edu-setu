import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import StudentHome from "./Components/StudentHome/StudentHome";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path='/student' component={StudentHome} />
				<Route path='/professor' component={Home} />
				<Route path='/auth' component={Login} />
				<Route path='*'>
					{localStorage.getItem("type") ? (
						localStorage.getItem("type").toLowerCase() === "professor" ? (
							<Redirect to='professor' />
						) : (
							<Redirect to='student' />
						)
					) : (
						<Redirect to='/auth' />
					)}
				</Route>
			</Switch>
		</Router>
	);
}
