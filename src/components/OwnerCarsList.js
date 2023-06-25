import React, { Component } from "react";
import VehiclesList from "./VehiclesList";

class OwnerCarsList extends Component {
    render() {
        let userVehicles = [];
        return (
            <div id="content">
                <h1 style={{ marginLeft: "600px", marginTop: "40px" }}>
                    Vehicles you offes
                </h1>
                <div style={{ marginLeft: "20px" }}>
                    <button
                        style={{ marginBottom: "9px", padding: "5px" }}
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
                    <VehiclesList
                        data={userVehicles}
                        toEdit={true}
                        flag={"owner"}
                    ></VehiclesList>
                )}

                {userVehicles.length === 0 && (
                    <h2>You don`t have any cars for rent</h2>
                )}
            </div>
        );
    }
}

export default OwnerCarsList;
