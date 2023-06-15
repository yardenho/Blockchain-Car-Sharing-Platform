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
                            const fn = document.getElementById("fullName");
                            console.log(fn);
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

                            //saving the user details
                            this.props.updateUser(
                                this.state.curUser.userAddress,
                                fullName,
                                emailAddress,
                                age,
                                picture,
                                password
                            );
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

//         const checkUser = () => {
//             console.log(this.props.users);
//             for (let i = 0; i < this.props.users.length; ++i) {
//                 if (this.props.users[i].IDnumber === this.IDnumber.value) {
//                     alert("There is already a user with this ID number");
//                     return true;
//                 }
//             }
//             return false;
//         };
//         return (
//             <div id="content">
//                 <h1>Welcome !</h1>
//                 <p>
//                     After filling in your details press 'register', we will
//                     provide you a private key and a public kay. For your
//                     security, it will appears to you for only 10 seconds. Please
//                     save it in a secure manner.
//                 </p>
//                 <h5>please fill your details </h5>
//                 <form
//                     onSubmit={async (event) => {
//                         event.preventDefault();
//                         const fullName = this.fullName.value;
//                         const emailAddress = this.emailAddress.value;
//                         const age = parseInt(this.age.value);
//                         const input = document.querySelector("#picture");
//                         console.log(input.files[0].name);
//                         const picture = input.files[0].name;
//                         const IDnumber = this.IDnumber.value;
//                         const password = this.password.value;

//                         /// check the details corectness
//                         if (checkDetails() === true) return;
//                         //**** check if user isnt already exist ****
//                         if (checkUser() === true) return;

//                         //get private key from the keys file
//                         const res = await getKeys();
//                         if (res === true) return;
//                         //saving the user details
//                         console.log("user address " + this.userAddress);
//                         this.props.createUser(
//                             this.userAddress,
//                             fullName,
//                             emailAddress,
//                             age,
//                             picture,
//                             IDnumber,
//                             password
//                         );
//                         //TODO - need to forward to login
//                         // window.href("/login");
//                     }}
//                 >
//                     <div className="form-group mr-sm-2">
//                         <br></br>
//                         <input
//                             id="fullName"
//                             type="text"
//                             ref={(input) => {
//                                 this.fullName = input;
//                             }}
//                             className="form-control"
//                             placeholder="Full name"
//                             required
//                         />
//                         <input
//                             id="emailAddress"
//                             type="email"
//                             ref={(input) => {
//                                 this.emailAddress = input;
//                             }}
//                             className="form-control"
//                             placeholder="Email address"
//                             required
//                         />
//                         <input
//                             id="age"
//                             type="number"
//                             ref={(input) => {
//                                 this.age = input;
//                             }}
//                             className="form-control"
//                             placeholder="Age"
//                             required
//                         />

//                         <input
//                             id="IDnumber"
//                             type="text"
//                             ref={(input) => {
//                                 this.IDnumber = input;
//                             }}
//                             className="form-control"
//                             placeholder="ID number"
//                             required
//                         />
//                         <input
//                             id="password"
//                             type="password"
//                             ref={(input) => {
//                                 this.password = input;
//                             }}
//                             className="form-control"
//                             placeholder="Password"
//                             required
//                         />
//                         <input
//                             id="confirmPassword"
//                             type="password"
//                             ref={(input) => {
//                                 this.confirmPassword = input;
//                             }}
//                             className="form-control"
//                             placeholder="Confirm password"
//                             required
//                         />
//                         <label style={{ marginRight: 5 }}>
//                             upload your driver license:{" "}
//                         </label>

//                         <input
//                             type="file"
//                             id="picture"
//                             accept=".jpg, .jpeg, .png"
//                             required
//                         ></input>
//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         Register
//                     </button>
//                 </form>

//                 <button className="btn btn-primary" style={{ marginTop: 5 }}>
//                     <a href="/Login" style={{ color: "white" }}>
//                         Move to login page
//                     </a>
//                 </button>
//                 {this.state.showKey === true && (
//                     <>
//                         <p>Your private key is: {this.userPrivateKey}</p>
//                         <p>Your node is number: {this.userNodeNumber}.</p>
//                         <p>
//                             Your node run command apperes in the path node
//                             {this.userNodeNumber}/run_command.txt
//                         </p>
//                     </>
//                 )}
//                 <p>&nbsp;</p>
//             </div>
//         );
//     }
// }
