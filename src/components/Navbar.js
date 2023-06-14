import React, { Component, useEffect } from "react";
import { privateKeys } from "../privateKeys";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: -1, //no one loggin
        };
    }

    render() {
        const checkUserConnected = () => {
            console.log("this.props.userLog");
            console.log(this.props.userLog);
            // if (this.props.userLog == false) {
            //     return -1;
            // }
            for (var i = 0; i < this.props.users.length; ++i) {
                if (this.props.users[i].userAddress === this.props.account) {
                    return 0;
                }
            }
            for (var i = 0; i < this.props.garages.length; ++i) {
                if (
                    this.props.garages[i].garageAddress === this.props.account
                ) {
                    return 1;
                }
            }
            return -1;
        };

        const accountname = () => {
            if (
                privateKeys[0][0] === this.props.account ||
                this.props.account === ""
            ) {
                return "Hello";
            }
            for (var i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].userAddress === this.props.account) {
                    return "Hello " + this.props.users[i].fullName;
                } else {
                    return "Hello";
                }
            }
        };

        /* When the user clicks on the button,
        toggle between hiding and showing the dropdown content */
        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches(".dropbtn")) {
                var dropdowns = document.getElementsByClassName(
                    "dropdown-content"
                );
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains("show")) {
                        openDropdown.classList.remove("show");
                    }
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
                    <li className="nav-item " style={{ marginLeft: "5px" }}>
                        <small className="text-white">
                            <span id="account">{accountname()}</span>
                        </small>
                    </li>
                </ul>
                {checkUserConnected() === 0 && (
                    <div className="dropdown">
                        <button onClick={myFunction} className="dropbtn">
                            &#9776; Menu actions
                        </button>
                        <div id="myDropdown" className="dropdown-content">
                            <a href="#">My Profile</a>
                            <a href="#">My cars</a>
                            <a href="#">My Rents</a>
                            <a href="#">My cars documentations</a>
                            <a href="#">Log out</a>
                        </div>
                    </div>
                )}
            </nav>
        );
    }
}

export default Navbar;
