import React, { Component, useState } from "react";
import VehicleList from "./VehiclesList";

class UserMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.vehiclesList, //no one loggin
        };
    }

    render() {
        const searchClicked = () => {
            console.log(this.searchInput.value);
            if (this.searchInput.value === "") {
                console.log("in");
                console.log(this.props.vehiclesList);
                this.setState({ data: this.props.vehiclesList });
                return;
            }
            let filterList = [];
            for (let i = 0; i < this.props.vehiclesList.length; ++i) {
                if (
                    this.props.vehiclesList[i].vehicleType.toLowerCase() ==
                    this.searchInput.value.toLowerCase()
                ) {
                    filterList.push(this.props.vehiclesList[i]);
                }
            }
            this.setState({ data: filterList });
        };

        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                // 👇 Get input value
                searchClicked();
            }
        };

        return (
            <div id="content" style={{ flex: 1 }}>
                <h1 style={{ marginTop: "20px", marginLeft: "500px" }}>
                    Choose your vehicle
                </h1>
                <a
                    class="nav-link mx-auto"
                    href="#"
                    style={{
                        paddingLeft: "70px",
                    }}
                >
                    <input
                        id="search_input"
                        class="mx-auto"
                        type="search"
                        placeholder="Search by vehicle type"
                        ref={(input) => {
                            this.searchInput = input;
                        }}
                        onKeyUp={handleKeyDown}
                    />
                    <img
                        src={require("../assets/search.png")}
                        style={{
                            width: "2vw",
                            height: "2vw",
                            "border-style": "hidden",
                            "margin-left": "10px",
                        }}
                        onClick={searchClicked}
                    ></img>
                </a>
                <VehicleList data={this.state.data} />
            </div>
        );
    }
}

export default UserMainPage;
