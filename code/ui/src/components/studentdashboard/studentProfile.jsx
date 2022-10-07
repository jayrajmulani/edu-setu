import React from "react";
import { Component } from 'react'
import NavBar from "./navbar";
import './studentProfile.css'


export class StudentProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 1007,
            current_user: {},
            changed_details:{}
        }
    }
    async componentWillMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "user_id": this.state.user_id })
        };
        await fetch('http://140.238.250.0:5000/get_user_profile', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ current_user: data.data, changed_details: data.data}));


    }
    async updateProfile() {
        var changedDetails = {};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "user_id": this.state.user_id })
        };
        await fetch('http://140.238.250.0:5000/edit_profile', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ current_user: data.data }, () => { console.log(this.state.current_user); }));

    }
    render() {
        return (
            <>
                <NavBar />
                <div class="container rounded bg-white mt-5 mb-5">
                    <div class="row">
                        <div class="col-md-3 border-right">
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Clipart.png" />
                                <span class="font-weight-bold">{this.state.current_user.display_name}</span><span class="text-black-50">{this.state.current_user.email}</span><span> </span></div>
                        </div>
                        <div class="col-md-9 border-right">
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h4 class="text-right">Profile Settings</h4>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder={this.state.current_user.display_name} id="profileName" /></div>
                                    <div class="col-md-6"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder={this.state.current_user.phone} /></div>

                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"><label class="labels">Degree</label><input type="text" class="form-control" placeholder={this.state.current_user.degree} /></div>
                                    <div class="col-md-6"><label class="labels">Major</label><input type="text" class="form-control" placeholder={this.state.current_user.major} /></div>
                                    <div class="col-md-6"><label class="labels">Minor</label><input type="text" class="form-control" placeholder={this.state.current_user.minor} /></div>
                                    <div class="col-md-3"><label class="labels">GPA</label><input type="text" class="form-control" placeholder={this.state.current_user.gpa} /></div>
                                    <div class="col-md-3"><label class="labels">Year</label><input type="text" class="form-control" placeholder={this.state.current_user.year} /></div>
                                </div>
                                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={this.updateProfile}>Save Profile</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}