import React, { Component } from "react";

class Main extends Component {
    render() {
        return (
            <div id="content">
                <h1>Add Vehicle</h1>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const name = this.vehicleNumber.value;
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
                                this.vehicleNumber = input;
                            }}
                            className="form-control"
                            placeholder="vehicle Number"
                            required
                        />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="productPrice"
                            type="text"
                            ref={(input) => {
                                this.vehiclePrice = input;
                            }}
                            className="form-control"
                            placeholder="vehicle Price"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Vehicle
                    </button>
                </form>
                <p>&nbsp;</p>
                <h2>Buy Vehicle</h2>
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
                        {this.props.products.map((product, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">
                                        {product.vehicleNumber.toString()}
                                    </th>
                                    <td>{product.vehicleNumber}</td>
                                    <td>
                                        {window.web3.utils.fromWei(
                                            product.vehiclePrice.toString(),
                                            "Ether"
                                        )}{" "}
                                        Eth
                                    </td>
                                    <td>{product.owner}</td>
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
