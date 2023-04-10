import React, { Component } from "react";
import { privateKeys, index, increaceIndex } from "../privateKeysForTests";

class Register extends Component {
    showKey = false;

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     showKey: false,
    //     // };
    // }
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
            this.showKey = true;
            // this.setState({ showKey: true });
            await wait(5000); //waiting 5 secondes
            // this.setState({ showKey: false });
            this.showKey = false;
        };

        const checkDetails = () => {
            if (this.age.value < 17) {
                alert("A user must by older then 17 yaers old");
                return true;
            }
            console.log("id lengtht" + this.IDnumber.value.length);
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
                        const fullName = this.fullName.value;
                        const emailAddress = this.emailAddress.value;
                        const age = parseInt(this.age.value);
                        console.log("--------------------- " + event.target);
                        const input = document.querySelector("#picture");
                        console.log(input.files[0].name);
                        const picture = input.files[0].name;
                        const IDnumber = this.IDnumber.value;
                        const password = this.password.value;

                        if (checkDetails() === true) return;
                        //**** check if user isnt allready exist ****

                        //get private key from the keys file
                        getKeys();
                        console.log("fullName " + fullName);
                        console.log("emailAddress " + emailAddress);
                        console.log("age" + age);
                        console.log("age" + age);
                        console.log("picture" + picture);
                        console.log("IDnumber" + IDnumber);
                        console.log("password" + password);
                        //saving the user details
                        this.props.createUser(
                            "yarden",
                            "yarden@ffff",
                            21,
                            "hhh",
                            "123456789",
                            "1234567890"
                        );
                        // this.props.createUser(
                        //     fullName,
                        //     emailAddress,
                        //     age,
                        //     picture,
                        //     IDnumber,
                        //     password
                        // );
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
                        <label>Choose a picture: </label>

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
                {this.showKey === true && (
                    <p>Your private key is: {this.userPrivateKey}</p>
                )}
                <p>&nbsp;</p>
            </div>
        );
    }
}

export default Register;
