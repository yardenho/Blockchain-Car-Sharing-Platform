import React, { Component } from "react";
import { privateKeys, index, increaceIndex } from "../privateKeys";

class Register extends Component {
    // showKey = false;

    constructor(props) {
        super(props);
        this.state = {
            showKey: false,
        };
    }
    render() {
        function wait(milliseconds) {
            return new Promise((resolve) => {
                setTimeout(resolve, milliseconds);
            });
        }

        const getKeys = async () => {
            const res = increaceIndex();
            if (res == null) {
                alert(
                    "cannot register in that moment, the managers will fix the problem as soon as possible"
                );
                return true;
            }
            this.userPrivateKey = privateKeys[index - 1][1];
            this.userAddress = privateKeys[index - 1][0];
            this.userNodeNumber = index;

            //print the private key for 30 seconds
            // this.showKey = true;
            this.setState({ showKey: true });
            await wait(10000); //waiting 10 secondes
            this.setState({ showKey: false });
            // this.showKey = false;
            return false;
        };

        const checkDetails = () => {
            if (this.age.value < 17) {
                alert("A user must by older then 17 yaers old");
                return true;
            }
            console.log("id length" + this.IDnumber.value.length);
            if (this.IDnumber.value.length !== 9) {
                alert("A user Id number must by 9 digits");
                return true;
            }
            //*** how to chack id number **** - TODO
            if (this.password.value !== this.confirmPassword.value) {
                alert("Please provide an equal passwords");
                return true;
            }
            return false;
        };

        const checkUser = () => {
            console.log(this.props.users);
            for (let i = 0; i < this.props.users.length; ++i) {
                if (this.props.users[i].IDnumber === this.IDnumber.value) {
                    alert("There is already a user with this ID number");
                    return true;
                }
            }
            return false;
        };
        return (
            <div id="content">
                <h1>Welcome !</h1>
                <p>
                    After filling in your details press 'register', we will
                    provide you a private key and a public kay. For your
                    security, it will appears to you for only 10 seconds. Please
                    save it in a secure manner.
                </p>
                <h5>please fill your details </h5>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const fullName = this.fullName.value;
                        const emailAddress = this.emailAddress.value;
                        const age = parseInt(this.age.value);
                        const input = document.querySelector("#picture");
                        console.log(input.files[0].name);
                        const picture = input.files[0].name;
                        const IDnumber = this.IDnumber.value;
                        const password = this.password.value;

                        /// check the details corectness
                        if (checkDetails() === true) return;
                        //**** check if user isnt already exist ****
                        if (checkUser() === true) return;

                        //get private key from the keys file
                        const res = await getKeys();
                        if (res === true) return;
                        //saving the user details
                        console.log("user address " + this.userAddress);
                        this.props.createUser(
                            this.userAddress,
                            fullName,
                            emailAddress,
                            age,
                            picture,
                            IDnumber,
                            password
                        );
                        //TODO - need to forward to login
                        // window.href("/login");
                    }}
                >
                    <div className="form-group mr-sm-2">
                        <br></br>
                        <input
                            id="fullName"
                            type="text"
                            ref={(input) => {
                                this.fullName = input;
                            }}
                            className="form-control"
                            placeholder="Full name"
                            required
                        />
                        <input
                            id="emailAddress"
                            type="email"
                            ref={(input) => {
                                this.emailAddress = input;
                            }}
                            className="form-control"
                            placeholder="Email address"
                            required
                        />
                        <input
                            id="age"
                            type="number"
                            ref={(input) => {
                                this.age = input;
                            }}
                            className="form-control"
                            placeholder="Age"
                            required
                        />

                        <input
                            id="IDnumber"
                            type="text"
                            ref={(input) => {
                                this.IDnumber = input;
                            }}
                            className="form-control"
                            placeholder="ID number"
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            ref={(input) => {
                                this.password = input;
                            }}
                            className="form-control"
                            placeholder="Password"
                            required
                        />
                        <input
                            id="confirmPassword"
                            type="password"
                            ref={(input) => {
                                this.confirmPassword = input;
                            }}
                            className="form-control"
                            placeholder="Confirm password"
                            required
                        />
                        <label style={{ marginRight: 5 }}>
                            upload your driver license:{" "}
                        </label>

                        <input
                            type="file"
                            id="picture"
                            accept=".jpg, .jpeg, .png"
                            required
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>

                <button className="btn btn-primary" style={{ marginTop: 5 }}>
                    <a href="/Login" style={{ color: "white" }}>
                        Move to login page
                    </a>
                </button>
                {this.state.showKey === true && (
                    <>
                        <p>Your private key is: {this.userPrivateKey}</p>
                        <p>Your node is number: {this.userNodeNumber}.</p>
                        <p>
                            Your node run command apperes in the path node
                            {this.userNodeNumber}/run_command.txt
                        </p>
                    </>
                )}
                <p>&nbsp;</p>
            </div>
        );
    }
}

export default Register;
