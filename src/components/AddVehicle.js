import React, { Component, useState } from "react";

class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gearboxType: "Manual transmission",
    };
  }

  render() {
    return (
      <div id="content">
        <h1>Add Vehicle</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const vin = this.vin.value;
            const vehicleType = this.vehicleType.value;
            const numOfSeats = this.numberOfSeats.value;

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

            this.props.createVehicle(
              vin,
              vehicleType,
              pricePerDay,
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
                onChange={(e) => this.setState({ gearboxType: e.target.value })} // ... and update the state variable on any change!
              >
                <option value="Manual transmission">Manual transmission</option>
                <option value="Automatic transmission">
                  Automatic transmission
                </option>
              </select>
            </label>
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
