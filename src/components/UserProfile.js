import React, { Component, useEffect, useState } from "react";
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curUser: "",
            fullName: "",
            email: "",
            age: "",
            password: "",
            picture: "",
            count1: 0,
        };
    }
    render() {
        const upadeState = () => {
            this.setState({ count1: 1 });
        };

        return (
            <div>
                {/* {count === 0 && getUser()} */}
                <h1>user profile</h1>
                {this.props.users.map((user) => {
                    console.log("users");
                    console.log(this.props.users);
                    if (this.state.count1 !== 0) {
                        return;
                    }
                    console.log(this.state.count1);
                    if (user.userAddress === this.props.account) {
                        upadeState();
                        this.state.curUser = user;
                        this.state.fullName = user.fullName;
                        this.state.email = user.emailAddress;
                        this.state.age = user.age;
                        this.state.password = user.password;
                        this.state.picture = user.picture;
                    }
                }) && (
                    <form
                        onSubmit={async (event) => {
                            event.preventDefault();
                            const fullName = this.state.fullName;
                            const emailAddress = this.state.email;
                            const age = this.state.age;
                            const password = this.state.password;
                            // const age =
                            //     this.age !== undefined
                            //         ? this.age.value
                            //         : this.state.user.age;

                            // const password =
                            //     this.password !== undefined
                            //         ? this.password.value
                            //         : this.state.user.password;

                            const input = document.querySelector("#picture");

                            // console.log(input.files[0]);
                            const picture =
                                input.files[0] !== undefined
                                    ? input.files[0].name
                                    : this.state.picture;

                            // if (this.age.value < 17) {
                            //     alert("A user must by older then 17 yaers old");
                            //     return;
                            // }
                            let position;
                            console.log(
                                "this.props.users.length + " +
                                    this.props.users.length
                            );

                            for (let i = 0; i < this.props.users.length; ++i) {
                                console.log("i + " + i);
                                console.log("this.props.users[i] + ");
                                console.log(this.props.users[i]);

                                if (
                                    this.props.users[i].userAddress ===
                                    this.props.account
                                ) {
                                    position = i + 1;
                                }
                            }
                            //saving the user details
                            this.props.updateUser(
                                position,
                                this.state.curUser.userAddress,
                                this.state.curUser.IDnumber,
                                fullName,
                                emailAddress,
                                age,
                                picture,
                                password
                            );

                            // window.location.href = "/userMainPage";
                        }}
                    >
                        <div className="form-group mr-sm-2">
                            <br></br>
                            <label htmlFor="fullName">full Name:</label>
                            <input
                                id="fullName"
                                type="text"
                                onChange={(e) => {
                                    console.log("onChange");
                                    console.log(e.target.value);
                                    this.setState({
                                        fullName: e.target.value,
                                    });
                                }}
                                className="form-control"
                                value={this.state.fullName}
                            />

                            <label htmlFor="emailAddress">Email Address</label>
                            <input
                                id="emailAddress"
                                type="email"
                                onChange={(event) => {
                                    this.setState({
                                        email: event.target.value,
                                    });
                                }}
                                className="form-control"
                                value={this.state.email}
                            />
                            <label htmlFor="age">Age:</label>
                            <input
                                id="age"
                                type="number"
                                onChange={(event) => {
                                    this.setState({
                                        age: event.target.value,
                                    });
                                }}
                                className="form-control"
                                value={this.state.age}
                            />
                            <label htmlFor="password">Password: </label>
                            <input
                                id="password"
                                type="password"
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value,
                                    });
                                }}
                                className="form-control"
                                value={this.state.password}
                            />
                            <label style={{ marginRight: 5 }}>
                                Edit your driver license:{" "}
                            </label>
                            <input
                                type="file"
                                id="picture"
                                accept=".jpg, .jpeg, .png"
                                // value={String(this.state.user.picture) || ""}
                            ></input>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Edit details
                        </button>
                    </form>
                )}
            </div>
        );
    }
}

export default UserProfile;
