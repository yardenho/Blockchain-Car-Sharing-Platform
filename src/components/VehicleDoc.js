import React, { Component } from "react";
import { APPROVED, DECLINED, WAITING } from "../variables.js";

class VehicalDoc extends Component {
    render() {
        const checkDetails = (garageBnNumber) => {
            if (garageBnNumber.startsWith("51") === false) {
                alert("A BN number invalid");
                return true;
            }
            if (this.vehicleVin.length > 0) {
                alert("Please provide an valid vehicle vin");
                return true;
            }
            return false;
        };
        const getGarageBNnumber = () => {
            console.log("this.props.garages");

            console.log(this.props.garages);
            for (let i = 0; i < this.props.garages.length; ++i) {
                if (
                    this.props.garages[i].garageAddress === this.props.account
                ) {
                    return this.props.garages[i].BnNumber;
                }
            }
            alert("There is not that garge BN in the system");
            return ""; // not exist
        };
        const checkVehicle = () => {
            console.log("this.props.vehicles");

            console.log(this.props.vehicles);
            for (let i = 0; i < this.props.vehicles.length; ++i) {
                if (this.props.vehicles[i].vin === this.vehicleVin.value) {
                    return false; //exist
                }
            }
            alert("There is not that vehicle vin in the system");
            return true; // not exist
        };

        const currentDate = () => {
            // Date object
            const date = new Date();

            let currentDay = String(date.getDate()).padStart(2, "0");

            let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

            let currentYear = date.getFullYear();

            // we will display the date as DD/MM/YYYY

            let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;

            console.log("The current date is " + currentDate);
            return currentDate;
        };
        return (
            <div
                id="content"
                style={{ width: "70%", marginTop: "60px", marginLeft: "200px" }}
            >
                <center>
                    <h5 style={{ fontSize: "40px" }}>Add document</h5>
                    <form
                        style={{ marginLeft: "200px", marginRight: "200px" }}
                        onSubmit={async (event) => {
                            event.preventDefault();
                            const vehicleVin = this.vehicleVin.value;
                            const description = this.description.value;

                            const date = document.getElementById("date").value;

                            const garageBnNumber = getGarageBNnumber();
                            if (garageBnNumber === "") {
                                alert(
                                    "There is a problem in the documentation upload"
                                );
                                return;
                            }
                            /// check the details corectness
                            if (checkDetails(garageBnNumber) === true) return;

                            //**** check if vehicle doesn't already exist ****
                            if (checkVehicle() === true) return;
                            console.log("WAITING");
                            console.log(WAITING);

                            //saving the document details
                            this.props.createDocument(
                                vehicleVin,
                                garageBnNumber,
                                description,
                                date,
                                WAITING
                            );
                            alert(
                                "The document uploaded, waiting for the owner approval"
                            );
                        }}
                    >
                        <div className="form-group mr-sm-2">
                            <br></br>
                            <input
                                id="vehicleVin"
                                type="text"
                                ref={(input) => {
                                    this.vehicleVin = input;
                                }}
                                className="form-control"
                                placeholder="vehicle Vin"
                                required
                                style={{ margin: "2px" }}
                            />
                            <input
                                id="date"
                                type="date"
                                // ref={(input) => {
                                //     this.date = input;
                                // }}
                                className="form-control"
                                placeholder="date"
                                required
                                style={{ margin: "2px" }}
                                max={new Date().toJSON().split("T")[0]}
                            />
                            <input
                                id="description"
                                type="text"
                                ref={(input) => {
                                    this.description = input;
                                }}
                                className="form-control"
                                placeholder="description"
                                required
                                style={{ height: "100px", margin: "2px" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add document
                        </button>
                    </form>
                </center>

                <p>&nbsp;</p>
            </div>
        );
    }
}

export default VehicalDoc;
