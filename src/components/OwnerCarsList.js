import React, { Component } from "react";
import VehicleList from "./VehiclesList";

class OwnerCarsList extends Component {
    render() {
        const userVehicles = [];
        return (
            <div id="content">
                <h1 style={{ marginLeft: "600px", marginTop: "40px" }}>
                    Vehicles you offes
                </h1>
                <div style={{ marginLeft: "20px" }}>
                    <button
                        className="button"
                        onClick={() => {
                            window.location.replace("/AddVehicle");
                        }}
                    >
                        {" "}
                        Add a new car for renting
                    </button>
                </div>
                {this.props.vehicles.map((data) => {
                    if (data.owner === this.props.account) {
                        userVehicles.push(data);
                    }
                }) && (
                    <VehicleList
                        data={userVehicles}
                        toEdit={true}
                    ></VehicleList>
                )}

                {this.props.vehicles.length === 0 && (
                    <h2>You don`t have any cars for rent</h2>
                )}
            </div>
        );
    }
}

export default OwnerCarsList;
