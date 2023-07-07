import React, { Component } from "react";
import VehiclesList from "./VehiclesList";
import RentersVehiclesList from "./RentersVehiclesList";

class UserMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.vehiclesList, //no one loggin
            flag: 0,
            sortOption: "Sort BY",
            filterOption: "Filter BY",
            option: "0",
            searchOrSelectFlag: 0, // 0 - search box, 1 - select for gear type, 2 - select for gas type
            gearBoxOption: "gearbox",
            gasTypeOption: "gasType",
        };
    }

    render() {
        const check_date_overlap = (start, end, unavailableDates) => {
            // Convert date strings to datetime objects
            var start2 = new Date(start).getTime();
            var end2 = new Date(end).getTime();
            const dates = unavailableDates;
            let datesList = [];
            if (dates !== "") {
                datesList = dates.split("#");
            }

            for (let i = 0; i < datesList.length; ++i) {
                const range = datesList[i].split("-");
                const start1 = new Date(range[0]).getTime();
                const end1 = new Date(range[1]).getTime();
                // Check for overlapping dates
                if (
                    (start1 <= end2 && end2 <= end1) ||
                    (start1 <= start2 && start2 <= end1)
                ) {
                    console.log("true");
                    return true;
                }
            }
            return false;
        };

        const searchClicked = () => {
            console.log(this.SearchInput.value);
            if (
                this.SearchInput === undefined ||
                this.SearchInput.value === ""
            ) {
                alert("You must enter value to search box");
                // console.log("in");
                // console.log(this.props.vehiclesList);
                // this.setState({ data: this.props.vehiclesList });
                // this.setState({ flag: 0 });
                return;
            }
            let filterList = [];

            switch (this.state.option) {
                case "1":
                    for (let i = 0; i < this.props.vehiclesList.length; ++i) {
                        if (
                            this.props.vehiclesList[
                                i
                            ].vehicleType.toLowerCase() ===
                            this.SearchInput.value.toLowerCase()
                        ) {
                            filterList.push(this.props.vehiclesList[i]);
                        }
                    }
                    break;
                case "2":
                    for (let i = 0; i < this.props.vehiclesList.length; ++i) {
                        if (
                            this.props.vehiclesList[i].numOfSeats.toString() ===
                            this.SearchInput.value
                        ) {
                            filterList.push(this.props.vehiclesList[i]);
                        }
                    }
                    break;
                case "4":
                    for (let i = 0; i < this.props.vehiclesList.length; ++i) {
                        console.log(
                            window.web3.utils.fromWei(
                                this.props.vehiclesList[
                                    i
                                ].vehiclePricePerDay.toString(),
                                "Ether"
                            )
                        );
                        console.log(this.SearchInput.value);
                        if (
                            window.web3.utils.fromWei(
                                this.props.vehiclesList[
                                    i
                                ].vehiclePricePerDay.toString(),
                                "Ether"
                            ) === this.SearchInput.value
                        ) {
                            filterList.push(this.props.vehiclesList[i]);
                        }
                    }
                    break;
                default:
                    return "foo";
            }

            this.setState({ data: filterList });
            this.setState({ flag: 1 });
        };

        const filterByGearbox = (type) => {
            let filterList = [];
            if (type === "Gear box") {
                this.setState({ data: this.props.vehiclesList });
                this.setState({ flag: 0 });
                return;
            }
            for (let i = 0; i < this.props.vehiclesList.length; ++i) {
                if (this.props.vehiclesList[i].gearboxType === type) {
                    filterList.push(this.props.vehiclesList[i]);
                }
            }
            this.setState({ data: filterList });
            this.setState({ flag: 1 });
        };

        const filterByGasType = (type) => {
            let filterList = [];
            if (type === "Gas type") {
                this.setState({ data: this.props.vehiclesList });
                this.setState({ flag: 0 });
                return;
            }
            for (let i = 0; i < this.props.vehiclesList.length; ++i) {
                if (this.props.vehiclesList[i].gasType === type) {
                    filterList.push(this.props.vehiclesList[i]);
                }
            }
            this.setState({ data: filterList });
            this.setState({ flag: 1 });
        };
        const searchClickedForRange = () => {
            console.log(this.startInput.value);
            if (this.startInput.value == "" || this.endInput.value == "") {
                alert("Please enter start and end dates");
                return;
            }
            let filterList = [];
            this.props.vehiclesList.map((vehicle) => {
                if (
                    check_date_overlap(
                        this.startInput.value,
                        this.endInput.value,
                        vehicle.unavailableDates
                    ) === false
                ) {
                    filterList.push(vehicle);
                }
            });
            this.setState({ data: filterList });
            this.setState({ flag: 1 });
        };

        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                // 👇 Get input value
                searchClicked();
            }
        };

        const handleKeyDownInRangeInput = (event) => {
            if (event.key === "Enter") {
                // 👇 Get input value
                searchClickedForRange();
            }
        };

        const sortt = (value) => {
            let newList = [...this.state.data].slice();
            console.log("value");

            console.log(value);
            if (value === "1") {
                this.setState({ data: [...newList.sort(asc)] });
                console.log("if");

                console.log(newList);
            } else {
                this.setState({ data: [...newList.sort(desc)] });

                // const re = [...newList].sort(desc);
                console.log("else");
                // this.setState({ sortList: re });

                console.log(newList);
            }
            this.setState({ flag: 1 });
        };

        const desc = (a, b) => {
            return window.web3.utils.fromWei(
                a.vehiclePricePerDay.toString(),
                "Ether"
            ) >
                window.web3.utils.fromWei(
                    b.vehiclePricePerDay.toString(),
                    "Ether"
                )
                ? 1
                : -1;
        };

        const asc = (a, b) => {
            return window.web3.utils.fromWei(
                a.vehiclePricePerDay.toString(),
                "Ether"
            ) >
                window.web3.utils.fromWei(
                    b.vehiclePricePerDay.toString(),
                    "Ether"
                )
                ? -1
                : 1;
        };

        return (
            <div id="content">
                <h1 style={{ marginTop: "20px", marginLeft: "500px" }}>
                    Choose your vehicle
                </h1>
                <div style={{ flexDirection: "row", display: "flex" }}>
                    <a className="nav-link mx-auto" href="#">
                        <select
                            style={{
                                marginBottom: "6px",
                                marginRight: "6px",
                                blockSize: "30px",
                            }}
                            name={"this.state.filterOption"}
                            value={this.state.filterOption} // ...force the select's value to match the state variable...
                            onChange={(event) => {
                                event.preventDefault();
                                console.log(event.target.name);
                                console.log(event.target.value);

                                this.setState({
                                    filterOption: event.target.value,
                                });
                                if (event.target.value === "0") {
                                    this.setState({
                                        data: this.props.vehiclesList,
                                    });
                                    this.setState({ flag: 0 });
                                    return;
                                } else if (event.target.value === "3") {
                                    this.setState({ searchOrSelectFlag: 1 });
                                } else if (event.target.value === "5") {
                                    this.setState({ searchOrSelectFlag: 2 });
                                } else {
                                    console.log(this.props.vehiclesList);
                                    this.setState({
                                        option: event.target.value,
                                    });
                                }
                            }} // ... and update the state variable on any change!
                        >
                            <option name="Sort By" value="0">
                                Sort By
                            </option>
                            <option name="Vehicle type" value="1">
                                Vehicle type
                            </option>
                            <option name="Number of seats" value="2">
                                Number of seats
                            </option>
                            <option name="Type of gearbox" value="3">
                                Type of gearbox
                            </option>
                            <option name="Range of prices" value="4">
                                Price
                            </option>
                            <option name="Gas type" value="5">
                                Gas type
                            </option>
                        </select>
                        {this.state.searchOrSelectFlag == 0 && (
                            <input
                                id="search_input"
                                className="mx-auto"
                                type="search"
                                placeholder="Search"
                                ref={(input) => {
                                    this.SearchInput = input;
                                }}
                                onKeyUp={handleKeyDown}
                            />
                        )}
                        {this.state.searchOrSelectFlag == 0 && (
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
                        )}
                        {this.state.searchOrSelectFlag == 1 && (
                            <select
                                style={{
                                    marginBottom: "6px",
                                    boxSizing: "20px",
                                }}
                                name={"this.state.gearBoxOption"}
                                value={this.state.gearBoxOption} // ...force the select's value to match the state variable...
                                onChange={(event) => {
                                    event.preventDefault();
                                    console.log(event.target.name);
                                    console.log(event.target.value);

                                    this.setState({
                                        gearBoxOption: event.target.value,
                                    });
                                    if (event.target.value === "0") {
                                        this.setState({
                                            data: this.props.vehiclesList,
                                        });
                                        this.setState({ flag: 0 });
                                        return;
                                    } else {
                                        console.log(this.props.vehiclesList);
                                        filterByGearbox(event.target.value);
                                    }
                                }} // ... and update the state variable on any change!
                            >
                                <option value="Gear box">Gear box</option>
                                <option value="Manual transmission">
                                    Manual transmission
                                </option>
                                <option value="Automatic transmission">
                                    Automatic transmission
                                </option>
                            </select>
                        )}
                        {this.state.searchOrSelectFlag == 2 && (
                            <select
                                style={{
                                    marginBottom: "6px",
                                    boxSizing: "20px",
                                }}
                                name={"this.state.gasTypeOption"}
                                value={this.state.gasTypeOption} // ...force the select's value to match the state variable...
                                onChange={(event) => {
                                    event.preventDefault();
                                    console.log(event.target.name);
                                    console.log(event.target.value);

                                    this.setState({
                                        gasTypeOption: event.target.value,
                                    });
                                    if (event.target.value === "0") {
                                        this.setState({
                                            data: this.props.vehiclesList,
                                        });
                                        this.setState({ flag: 0 });
                                        return;
                                    } else {
                                        console.log(this.props.vehiclesList);
                                        filterByGasType(event.target.value);
                                    }
                                }} // ... and update the state variable on any change!
                            >
                                <option value="Gas type">Gas type</option>
                                <option value="Regular - 87">
                                    Regular - 87
                                </option>
                                <option value="Mid-Grade - 89">
                                    Mid-Grade - 89
                                </option>
                                <option value="Premium - 91">
                                    Premium - 91
                                </option>
                                <option value="Electric car">
                                    Electric car
                                </option>
                            </select>
                        )}
                    </a>
                    <select
                        style={{ marginBottom: "6px", boxSizing: "20px" }}
                        name={"this.state.sortOption"}
                        value={this.state.sortOption} // ...force the select's value to match the state variable...
                        onChange={(event) => {
                            event.preventDefault();
                            console.log(event.target.name);
                            console.log(event.target.value);

                            this.setState({ sortOption: event.target.value });
                            if (event.target.value === "0") {
                                this.setState({
                                    data: this.props.vehiclesList,
                                });
                                this.setState({ flag: 0 });
                                return;
                            } else {
                                this.setState({ data: [] });
                                console.log(this.props.vehiclesList);
                                sortt(event.target.value);
                            }
                        }} // ... and update the state variable on any change!
                    >
                        <option name="Sort By" value="0">
                            Sort By
                        </option>
                        <option name="Highest to lowest" value="1">
                            Highest to lowest
                        </option>
                        <option name="Lowest to highest" value="2">
                            Lowest to highest
                        </option>
                    </select>
                    <a className="nav-link mx-auto" href="#">
                        <span style={{ marginRight: "3px", color: "black" }}>
                            {" "}
                            Start date:{" "}
                        </span>

                        <input
                            id="start_date_input"
                            className="mx-auto"
                            type="date"
                            placeholder="Enter start date"
                            ref={(input) => {
                                this.startInput = input;
                            }}
                            onKeyUp={handleKeyDownInRangeInput}
                        />
                        <span
                            style={{
                                marginLeft: "10px",
                                marginRight: "3px",
                                color: "black",
                            }}
                        >
                            End date:
                        </span>

                        <input
                            id="end_date_input"
                            className="mx-auto"
                            type="date"
                            placeholder="Enter end date"
                            ref={(input) => {
                                this.endInput = input;
                            }}
                            onKeyUp={handleKeyDownInRangeInput}
                        />
                        <img
                            src={require("../assets/search.png")}
                            style={{
                                width: "2vw",
                                height: "2vw",
                                borderStyle: "hidden",
                                marginLeft: "10px",
                            }}
                            onClick={searchClickedForRange}
                        ></img>
                    </a>
                </div>
                {this.props.vehiclesList.length === 0 && (
                    <h5>Don`t have vehicles yet</h5>
                )}

                {this.state.flag == 0 ? (
                    <VehiclesList
                        data={this.props.vehiclesList}
                        flag={"renter"}
                    />
                ) : (
                    <VehiclesList data={this.state.data} flag={"renter"} />
                )}
            </div>
        );
    }
}

export default UserMainPage;
