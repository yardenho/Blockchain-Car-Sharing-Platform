import React, { Component } from "react";
// "truffle": "^6.0.0",

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
    }

    render() {
        const checkUsers = (account) => {
            console.log("in checkUsers");
            for (var i = 0; i < this.props.users.length; ++i) {
                console.log(i);
                if (this.props.users[i].userAddress === account.address) {
                    //check if the private key similar to the running node

                    console.log(this.props.user === account.address);
                    if (this.props.user !== account.address) {
                        this.setState({
                            error:
                                "The private key dose not match to the connected user in the wallet",
                        });
                        return false;
                    }
                    if (this.props.users[i].password === this.password.value) {
                        this.setState({ error: "" });
                        //TODO - forwards to web
                        console.log("true");
                        window.location.href = "/userMainPage";
                        // replace("/userMainPage");
                        return true;
                    } else {
                        this.setState({
                            error: "The password incorrect",
                        });
                        return true;
                    }
                }
            }
            return false;
        };

        const checkGarages = (account) => {
            console.log("in checkGarages");

            for (var i = 0; i < this.props.garages.length; ++i) {
                console.log(i);
                if (this.props.garages[i].garageAddress === account.address) {
                    //check if the private key similar to the running node

                    console.log(this.props.user === account.address);
                    if (
                        this.props.garages[i].password === this.password.value
                    ) {
                        this.setState({ error: "" });
                        window.location.href = "/GarageMainPage";
                        return true;
                    } else {
                        this.setState({
                            error: "The password incorrect",
                        });
                        return false;
                    }
                }
            }
            return false;
        };

        const checkCompanies = (account) => {
            for (var i = 0; i < this.props.companies.length; ++i) {
                if (
                    this.props.companies[i].companyAddress === account.address
                ) {
                    //check if the private key similar to the running node
                    console.log(this.props.user === account.address);
                    if (
                        this.props.companies[i].password === this.password.value
                    ) {
                        this.setState({ error: "" });
                        window.location.href = "/userMainPage";
                    } else {
                        this.setState({
                            error: "The password incorrect",
                        });
                        return false;
                    }
                }
            }
            this.setState({
                error: "Incorrect private key",
            });
        };

        return (
            <div id="content">
                <h1>Login !</h1>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        console.log(this.privateKey.value.length);
                        if (
                            this.privateKey.value.startsWith("0x") === false ||
                            this.privateKey.value.length !== 66
                        ) {
                            this.setState({
                                error:
                                    "The private key dose not in the correct format or correct length",
                            });
                            return;
                        }
                        const web3 = window.web3;
                        const account = web3.eth.accounts.privateKeyToAccount(
                            this.privateKey.value
                        );
                        console.log("first step");
                        //Check if user exist in the smart contract
                        console.log(this.props.user);
                        console.log(account.address);

                        if (this.props.user !== account.address) {
                            this.setState({
                                error:
                                    "The private key dose not match to the connected user in the wallet",
                            });
                        } else {
                            let res = checkUsers(account);
                            if (res === false) {
                                res = checkGarages(account);
                            }
                            if (res == false) {
                                res = checkCompanies(account);
                            }
                        }
                    }}
                >
                    <div className="form-group mr-sm-2">
                        <p>
                            {" "}
                            Hi, please enter your private key from the
                            registration process and your password so we can
                            identify you :) Please enter the private key in a
                            format : 0x...
                        </p>
                        <input
                            id="privateKey"
                            type="text"
                            ref={(input) => {
                                this.privateKey = input;
                            }}
                            className="form-control"
                            placeholder="Your private Key"
                            required
                        />
                        <input
                            id="password"
                            type="text"
                            ref={(input) => {
                                this.password = input;
                            }}
                            style={{ marginTop: 5 }}
                            className="form-control"
                            placeholder="Your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                <button className="btn btn-primary" style={{ marginTop: 5 }}>
                    <a href="/" style={{ color: "white" }}>
                        Back to register page
                    </a>
                </button>
                {this.state.error !== "" && (
                    <p style={{ color: "red", fontStyle: "bold" }}>
                        {this.state.error}
                    </p>
                )}
                <p>&nbsp;</p>
            </div>
        );
    }
}

export default Login;
