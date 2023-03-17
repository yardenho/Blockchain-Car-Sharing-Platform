import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

class AddVehicle extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Vehicle</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
            // car number, car type, pricePerDay, owner, unAvavilabe, gas Type, number of seats, gearbox - manaul or automat
            //   const name = this.productName.value
            //   const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
            //   this.props.createProduct(name, price)

        }}>
          <div className="form-group mr-sm-2">
            <br></br>
            <input
              id="vin"
              type="text"
            //   ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="VIN"
              required />
              <input
              id="vehicleType"
              type="text"
            //   ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Vehicle type"
              required />
              <input
              id="pricePerDay"
              type="text"
            //   ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Price per day"
              required />
              <input
              id="seatsNum"
              type="text"
            //   ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
              <select id="gearboxType" class="form-select" aria-label="Default select example">
                <option selected value="1">Manual transmission</option>
                <option value="2">Automatic transmission</option>
              </select>
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Vehicle</button>
        </form>
        <p>&nbsp;</p>
      </div>
    );
  }
}

export default AddVehicle;