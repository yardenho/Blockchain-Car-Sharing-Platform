import React, { Component, useState } from "react";

class UserRentsList extends Component {
    //TODO - TO DELETE ALL THE FILES
    render() {
        return (
            <div id="content">
                <h1>Garages Documentation that needs aprroval</h1>
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
                        {this.props.rents.length === 0 && (
                            <p>You don`t have any rents </p>
                        )}
                        {this.props.docs.map((doc, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{doc.id.toString()}</th>
                                    <td>{doc.vehicleVin}</td>
                                    <td>{doc.garageBnNumber}</td>
                                    <td>{doc.date}</td>
                                    <td>
                                        {!doc.approved ? (
                                            <button
                                                name={doc.id}
                                                onClick={(event) => {
                                                    this.props.approveDoc(
                                                        event.target.name
                                                    );
                                                }}
                                            >
                                                Approve
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserRentsList;
