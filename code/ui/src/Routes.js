import React, { Component } from "react";
import styled from "styled-components";

import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { AccountBox } from "./components/accountBox";
import ProfessorDashboard from "./components/ProfessorDashboard/ProfessorDashboard";
import Tables from "./components/ProfessorDashboard/Table";
import ProfProfile from "./components/ProfessorDashboard/ProfProfile";
import ApplicantTable from "./components/ProfessorDashboard/ApplicantTable";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display_name: ""
        }
    }

    authGuard = (Component) => () => {
        return sessionStorage.getItem("logged_in") ? (
            <Component />
        ) : (
            <Redirect to="/auth" />
        );
    };

    render() {
        console.log(this.state);
        return (
            < Router >
                <Switch>
                    <Route path="/auth">
                        {/* <AppContainer>
                            <AccountBox />
                        </AppContainer> */}
                        <ApplicantTable />
                    </Route>
                    
                    <Route path="/professordashboard" render={this.authGuard(<ProfessorDashboard/>)} >
                    </Route>
                    {/* <Route path="/resetPassword">
                        <ResetPassword></ResetPassword>
                    </Route>
                    <Route path="/home" render={this.authGuard(Home)}></Route>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="*"><NotFound /></Route> */}
                    <Route path="/profprofile">
                        <ProfProfile/>
                    </Route>
                    <Route path="/">
                        <Redirect to="/auth"/>
                    </Route>
                </Switch>
            </Router >
        )
    }
}