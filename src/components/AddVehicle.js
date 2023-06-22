import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker.css");

class AddVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gearboxType: "Manual transmission",
            startDate: "",
            endDate: "",
            unavailableDates: "",
        };
    }

    render() {
        const splitDates = () => {
            if (this.state.unavailableDates !== "") {
                let dates = this.state.unavailableDates.split("#");
                for (let i = 0; i < dates.length - 1; ++i) {
                    dates[i] = dates[i].split("-");
                    dates[i][0] = new Date(dates[i][0]);
                    dates[i][1] = new Date(dates[i][1]);
                    dates[i][0] =
                        dates[i][0].getDate() +
                        "/" +
                        (dates[i][0].getMonth() + 1) +
                        "/" +
                        dates[i][0].getFullYear();
                    dates[i][1] =
                        dates[i][1].getDate() +
                        "/" +
                        (dates[i][1].getMonth() + 1) +
                        "/" +
                        dates[i][1].getFullYear();

                    dates[i] = dates[i][0] + "-" + dates[i][1];
                }
                return dates;
            } else {
                return [];
            }
        };
        const check_date_overlap = (start, end) => {
            // Convert date strings to datetime objects
            var start2 = new Date(start).getTime();
            var end2 = new Date(end).getTime();
            const dates = this.state.unavailableDates;
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
                } else {
                    console.log("false");

                    return false;
                }
            }
            return false;
        };
        const check_if_vin_exist = () => {
            for (let i = 0; i < this.props.vehicles.length; ++i) {
                if (this.props.vehicles[i].vin === this.vin.value) {
                    alert("The vin that entered is already in the system");
                    console.log("npooooooooooooo");
                    return true;
                }
            }
        };

        return (
            <div id="content">
                <h1>Add Vehicle</h1>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const vin = this.vin.value;
                        const vehicleType = this.vehicleType.value;
                        const numOfSeats = this.numberOfSeats.value;
                        const res = check_if_vin_exist();
                        console.log(res);
                        if (res === true) {
                            return;
                        }
                        if (isNaN(this.pricePerDay.value.toString())) {
                            // price per day is not a number - need to show an error message
                            return;
                        }

                        const pricePerDay = window.web3.utils.toWei(
                            this.pricePerDay.value.toString(),
                            "Ether"
                        );

                        const gearboxType = this.state.gearboxType;
                        console.log("vin + ", vin);
                        console.log("vehicle type + ", vehicleType);
                        console.log("numOfSeats + ", numOfSeats);
                        console.log("price per day + ", pricePerDay);
                        console.log("gearbox type + ", gearboxType);
                        let st = this.state.startDate;
                        let en = this.state.endDate;
                        let li = this.state.unavailableDates;

                        if (check_date_overlap(st, en) == false) {
                            if (
                                this.state.startDate !== "" &&
                                this.state.endDate !== ""
                            ) {
                                console.log(" st + ", st);
                                console.log("en + ", en);
                                li += st + "-" + en + "#";
                                console.log("li + ", li);
                            }
                        }
                        console.log("li+ " + li);

                        this.props.createVehicle(
                            vin,
                            vehicleType,
                            pricePerDay,
                            li,
                            numOfSeats,
                            gearboxType
                        );
                    }}
                >
                    <div className="form-group mr-sm-2">
                        <br></br>
                        <input
                            id="vin"
                            type="text"
                            ref={(input) => {
                                this.vin = input;
                            }}
                            className="form-control"
                            placeholder="VIN"
                            required
                        />
                        <input
                            id="vehicleType"
                            type="text"
                            ref={(input) => {
                                this.vehicleType = input;
                            }}
                            className="form-control"
                            placeholder="Vehicle type"
                            required
                        />
                        <input
                            id="pricePerDay"
                            type="number"
                            ref={(input) => {
                                this.pricePerDay = input;
                            }}
                            className="form-control"
                            placeholder="Price per day"
                            required
                        />
                        <input
                            id="seatsNum"
                            type="number"
                            ref={(input) => {
                                this.numberOfSeats = input;
                            }}
                            className="form-control"
                            placeholder="Number of seats"
                            required
                        />
                        <label>
                            Pick the vehicle's gearbox type:{" "}
                            <select
                                name="gearboxType"
                                value={this.state.gearboxType} // ...force the select's value to match the state variable...
                                onChange={(e) =>
                                    this.setState({
                                        gearboxType: e.target.value,
                                    })
                                } // ... and update the state variable on any change!
                            >
                                <option value="Manual transmission">
                                    Manual transmission
                                </option>
                                <option value="Automatic transmission">
                                    Automatic transmission
                                </option>
                            </select>
                        </label>
                        <div>
                            <label style={{ marginRight: "5px" }}>
                                Add unavailable dates:{" "}
                            </label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={(range) => {
                                    const [start, end] = range;
                                    this.setState({
                                        startDate: start,
                                        endDate: end,
                                    });
                                }}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                selectsRange
                                minDate={new Date()}
                            />
                            <button
                                type="button"
                                className="button"
                                style={{ margin: "5px", marginLeft: "20px" }}
                                onClick={() => {
                                    console.log("pressed");
                                    let st = this.state.startDate;
                                    let en = this.state.endDate;
                                    let li = this.state.unavailableDates;
                                    console.log(this.state.endDate);
                                    if (check_date_overlap(st, en) == false) {
                                        if (
                                            st !== "" &&
                                            en !== "" &&
                                            st !== null &&
                                            en !== null
                                        ) {
                                            li += st + "-" + en + "#";
                                        }
                                    }

                                    this.setState({
                                        unavailableDates: li,
                                        startDate: "",
                                        endDate: "",
                                    });
                                    console.log(this.state.unavailableDates);
                                }}
                            >
                                {" "}
                                Add another range
                            </button>
                        </div>
                    </div>
                    <div>
                        {splitDates().map((date) => {
                            return <p key={date}>{date}</p>;
                        })}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Vehicle
                    </button>
                </form>
                <p>&nbsp;</p>
            </div>
        );
    }
}

export default AddVehicle;
