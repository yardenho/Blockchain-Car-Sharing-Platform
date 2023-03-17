import React, { Component } from "react";

class Main extends Component {
    render() {
        return (
            <div id="content">
                <h1>Add vehicle</h1>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const name = this.vehicleType.value;
                        const price = window.web3.utils.toWei(
                            this.vehiclePrice.value.toString(),
                            "Ether"
                        );
                        this.props.createVehicle(name, price);
                    }}
                >
                    <div className="form-group mr-sm-2">
                        <input
                            id="productName"
                            type="text"
                            ref={(input) => {
                                this.vehicleType = input;
                            }}
                            className="form-control"
                            placeholder="Vehicle Name"
                            required
                        />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="vehiclePrice"
                            type="text"
                            ref={(input) => {
                                this.vehiclePrice = input;
                            }}
                            className="form-control"
                            placeholder="Product Price"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add vehicle
                    </button>
                </form>
                <p>&nbsp;</p>
                <h2>Buy vehicle</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Owner</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                        {this.props.vehicles.map((vehicle, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">
                                        {vehicle.vin.toString()}
                                    </th>
                                    <td>{vehicle.vehicleType}</td>
                                    <td>
                                        {window.web3.utils.fromWei(
                                            vehicle.vehiclePrice.toString(),
                                            "Ether"
                                        )}{" "}
                                        Eth
                                    </td>
                                    <td>{vehicle.owner}</td>
                                    <td>
                                        {true ? (
                                            <button
                                                name={vehicle.vin}
                                                value={vehicle.vehiclePrice}
                                                onClick={(event) => {
                                                    this.props.purchaseVehicle(
                                                        event.target.name,
                                                        event.target.value
                                                    );
                                                }}
                                            >
                                                Buy
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

export default Main;
