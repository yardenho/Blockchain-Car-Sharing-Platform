import React, { Component } from "react";

class GarageMainPage extends Component {
    render() {
        // const userVehicles = [];
        return (
            <div id="content">
                <h1 style={{ marginLeft: "500px", marginTop: "40px" }}>
                    Vehicles documentations
                </h1>
                <div>
                    <button
                        className="button"
                        onClick={() => {
                            window.location.replace("/vehicleDoc");
                        }}
                    >
                        Add a vehicle document
                    </button>
                </div>
                {this.props.documentations.length === 0 ? (
                    <h5>You don`t have any documents</h5>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Vehicle Vin</th>
                                <th scope="col">Garage BN</th>
                                <th scope="col">Date</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody id="documentationList">
                            {this.props.documentations.map((doc, key) => {
                                return (
                                    <tr key={key}>
                                        <th scope="row">{doc.id.toString()}</th>
                                        <td>{doc.vehicleVin}</td>
                                        <td>{doc.garageBnNumber}</td>
                                        <td>{doc.date}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default GarageMainPage;
