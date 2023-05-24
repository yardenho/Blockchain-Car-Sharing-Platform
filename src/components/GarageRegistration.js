import React, { Component } from "react";
import { privateKeys, index, increaceIndex } from "../privateKeys";

class GarageRegistration extends Component {
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
            this.garagePrivateKey = privateKeys[index - 1][1];
            this.garageAddress = privateKeys[index - 1][0];
            this.garageNodeNumber = index;

            //print the private key for 30 seconds
            // this.showKey = true;
            this.setState({ showKey: true });
            await wait(10000); //waiting 10 secondes
            this.setState({ showKey: false });
            // this.showKey = false;
            return false;
        };

        const checkDetails = () => {
            if (this.BnNumber.value.startsWith("51") === false) {
                alert("A BN number invalid");
                return true;
            }
            if (this.password.value !== this.confirmPassword.value) {
                alert("Please provide an equal passwords");
                return true;
            }
            return false;
        };

        const checkGarage = () => {
            console.log(this.props.garages);
            for (let i = 0; i < this.props.garages.length; ++i) {
                if (this.props.garages[i].BnNumber === this.BnNumber.value) {
                    alert("There is already a garage with this BN number");
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
                    provide you a private key. For your security, it will
                    appears to you for only 10 seconds. Please save it in a
                    secure manner.
                </p>
                <h5>please fill your details </h5>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        const garageName = this.garageName.value;
                        const BnNumber = this.BnNumber.value;
                        const city = this.city.value;
                        const password = this.password.value;

                        /// check the details corectness
                        if (checkDetails() === true) return;
                        //**** check if garage isn't already exist ****
                        if (checkGarage() === true) return;

                        //get private key from the keys file
                        const res = await getKeys();
                        if (res === true) return;
                        //saving the garage details
                        this.props.createGarage(
                            garageName,
                            BnNumber,
                            city,
                            password
                        );
                        //TODO - need to make a automatice file for the run command
                        window.href("/login");
                    }}
                >
                    <div className="form-group mr-sm-2">
                        <br></br>
                        <input
                            id="garageName"
                            type="text"
                            ref={(input) => {
                                this.garageName = input;
                            }}
                            className="form-control"
                            placeholder="Garage Name"
                            required
                        />
                        <input
                            id="BnNumber"
                            type="text"
                            ref={(input) => {
                                this.BnNumber = input;
                            }}
                            className="form-control"
                            placeholder="Bn Number"
                            required
                        />
                        <input
                            id="city"
                            type="text"
                            ref={(input) => {
                                this.city = input;
                            }}
                            className="form-control"
                            placeholder="city"
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
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>

                <button className="btn btn-primary" style={{ marginTop: 5 }}>
                    <a href="/login" style={{ color: "white" }}>
                        Move to login page
                    </a>
                </button>
                {this.state.showKey === true && (
                    <>
                        <p>Your private key is: {this.garagePrivateKey}</p>
                        <p>Your node is number: {this.garageNodeNumber}.</p>
                        <p>
                            Your node run command apperes in the path node
                            {this.garageNodeNumber}/run_command.txt
                        </p>
                    </>
                )}
                <p>&nbsp;</p>
            </div>
        );
    }
}

export default GarageRegistration;
