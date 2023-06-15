import React, { Component } from "react";
import VehicleList from "./VehiclesList";

class UserMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.vehiclesList,
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
                    this.props.vehiclesList[i].vehicleType.toLowerCase() ===
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
                <div
                    className="nav-link mx-auto"
                    style={{
                        paddingLeft: "70px",
                    }}
                >
                    <input
                        id="search_input"
                        className="mx-auto"
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
                            borderStyle: "hidden",
                            marginLeft: "10px",
                        }}
                        onClick={searchClicked}
                    ></img>
                </div>

                <VehicleList data={this.state.data} toEdit={false} />
            </div>
        );
    }
}

export default UserMainPage;
