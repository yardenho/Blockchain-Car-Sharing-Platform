import React, { Component, useState } from "react";
import { privateKeys, index, increaceIndex } from "../privateKeysForTests";

class Register extends Component {
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
            this.userPrivateKey = privateKeys[index];
            const res = increaceIndex();
            if (res == null) {
                alert(
                    "cannot register in that moment, the managers will fix the problem as soon as possible"
                );
                return;
            }
            //print the private key for 10 seconds
            this.setState({ showKey: true });
            await wait(5000); //waiting 5 secondes
            this.setState({ showKey: false });
        };

        const checkDetails = () => {
            if (this.age.value < 17) {
                alert("A user must by older then 17 yaers old");
                return true;
            }
            //*** how to chack id number **** - TODO
            if (this.password.value != this.confirmPassword.value) {
                alert("Please provide an equal passwords");
                return true;
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
                    onSubmit={(event) => {
                        event.preventDefault();
                        // const fullName = this.fullName.value;
                        // const emailAddress = this.emailAddress.value;
                        // const age = this.age.value;
                        // const picture = this.picture;
                        // const IDnumber = this.IDnumber.value;
                        // const password = this.password.value;
                        // const confirmPassword = this.confirmPassword.value;

                        if (checkDetails() == true) return;
                        //**** check if user isnt allready exist ****

                        //get private key from the keys file
                        getKeys();

                        //saving the user details

                        //***** Do we need public key too ?? *****
                        //*****move to log in page****
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
                            type="text"
                            ref={(input) => {
                                this.password = input;
                            }}
                            className="form-control"
                            placeholder="Password"
                            required
                        />
                        <input
                            id="confirmPassword"
                            type="text"
                            ref={(input) => {
                                this.confirmPassword = input;
                            }}
                            className="form-control"
                            placeholder="Confirm password"
                            required
                        />
                        <p>Add a picture </p>
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

                    {this.state.showKey == true && (
                        <p>Youe private key is: {this.userPrivateKey}</p>
                    )}
                </form>

                <p>&nbsp;</p>
            </div>
        );
    }
}

export default Register;
