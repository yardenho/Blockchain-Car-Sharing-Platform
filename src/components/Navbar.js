import React, { Component } from "react";
import { privateKeys } from "../privateKeys";

class Navbar extends Component {
    render() {
        const accountname = () => {
            if (privateKeys[0][0] === this.props.account) {
                return "Hello";
            }
            for (var i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].userAddress === this.props.account) {
                    return this.props.users[i].fullName;
                } else {
                    return "Hello";
                }
            }
        };

        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    EthCarRent
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-white">
                            <span id="account">{accountname()}</span>
                        </small>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
