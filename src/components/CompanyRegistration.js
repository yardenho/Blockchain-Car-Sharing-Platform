import React, { Component, Checkbox } from "react";
import { privateKeys, index, increaceIndex } from "../privateKeys";

class CompanyRegistration extends Component {
    // showKey = false;

    constructor(props) {
        super(props);
        this.state = {
            showKey: false,
        };
    }
    render() {
        console.log("index " + index);
        function wait(milliseconds) {
            return new Promise((resolve) => {
                setTimeout(resolve, milliseconds);
            });
        }

        const getKeys = async () => {
            const res = this.props.registeredCount + 1;
            console.log(this.props.registeredCount);
            console.log(res);
            console.log(privateKeys.length);
            console.log(res >= privateKeys.length);

            if (res >= privateKeys.length) {
                alert(
                    "cannot register in that moment, the managers will fix the problem as soon as possible"
                );
                return true;
            }

            this.PrivateKey = privateKeys[res][1];
            this.Address = privateKeys[res][0];
            this.NodeNumber = res;
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

        const checkCompany = () => {
            console.log(this.props.companies);
            for (let i = 0; i < this.props.companies.length; ++i) {
                if (this.props.companies[i].BnNumber === this.BnNumber.value) {
                    alert("There is already a company with this BN number");
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
                        const Name = this.garageName.value;
                        const BnNumber = this.BnNumber.value;
                        const city = this.city.value;
                        const password = this.password.value;

                        /// check the details corectness
                        if (checkDetails() === true) return;

                        const GarageCheckBox = document.getElementById(
                            "garageCheckBox"
                        );
                        //**** check if garage isn't already exist ****
                        if (checkGarage() === true) return;

                        //**** check if garage isn't already exist ****
                        if (checkCompany() === true) return;

                        //get private key from the keys file
                        const res = await getKeys();
                        if (res === true) return;

                        console.log(GarageCheckBox.checked);
                        if (GarageCheckBox.checked) {
                            //saving the garage details
                            this.props.createGarage(
                                this.Address,
                                Name,
                                BnNumber,
                                city,
                                password
                            );
                        } else {
                            //saving the garage details
                            this.props.createCompany(
                                this.Address,
                                Name,
                                BnNumber,
                                city,
                                password
                            );
                        }
                        window.location.href = "/";
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
                            placeholder="Company Name"
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
                        <input
                            id="garageCheckBox"
                            value="tehbjbbhbhst"
                            type="checkbox"
                        ></input>
                        <span> If you are a garage, please mark here </span>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
                {/* 
                <button className="btn btn-primary" style={{ marginTop: 5 }}>
                    <a href="/Login" style={{ color: "white" }}>
                        Move to login page
                    </a>
                </button> */}
                {this.state.showKey === true && (
                    <>
                        <p>Your private key is: {this.PrivateKey}</p>
                        <p>Your node is number: {this.NodeNumber}.</p>
                        <p>
                            Your node run command apperes in the path node
                            {this.NodeNumber}/run_command.txt
                        </p>
                    </>
                )}
            </div>
        );
    }
}

export default CompanyRegistration;
