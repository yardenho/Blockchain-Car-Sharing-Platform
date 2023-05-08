import React, { Component } from "react";

class MainPage extends Component {
    // showKey = false;

    render() {
        return (
            <div id="content">
                <h1>Welcome to EthCarRent!</h1>
                <button
                    className="btn btn-primary"
                    style={{
                        marginTop: 5,
                        alignSelf: "center",
                    }}
                >
                    <a href="/GarageRegistration" style={{ color: "white" }}>
                        Register as garage
                    </a>
                </button>
                <button
                    className="btn btn-primary"
                    style={{ marginTop: 5, display: "block" }}
                >
                    <a href="/Register" style={{ color: "white" }}>
                        Register as individual or as renting company
                    </a>
                </button>
                <button
                    className="btn btn-primary"
                    style={{ marginTop: 5, display: "block" }}
                >
                    <a href="/Login" style={{ color: "white" }}>
                        Login
                    </a>
                </button>
            </div>
        );
    }
}
// window.href("/login");
export default MainPage;
