import React, { Component } from "react";

class ViewVehicleForRental extends Component {
  render() {
    return (
      <div id="content">
        <div
          id="vehicle"
          className=" "
          style={{
            border: "1px solid ",
            borderColor: "gray",
            width: "300px",
            margin: "3px",
            borderRadius: "5",
          }}
        >
          <div className="clean-product-item">
            <div id="image_field" className="image">
              <a>
                <img
                  id="vehicle_image"
                  className="img-fluid d-block mx-auto"
                  src={require("../assets/vehicle.jpg")}
                  // style={{ width: "250px", height: " 300px" }}
                />
              </a>
            </div>
            <a
              id="vehicle_type"
              className="d-lg-flex justify-content-lg-center product-name"
              href="#"
              style={{ color: "var(--bs-gray-800)" }}
            >
              Vehicle Type:{this.props.data.vehicleType}
            </a>
            <div
              id="vehicle_owner"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Owner: {this.props.data.owner}</span>
            </div>
            <div
              id="vehicle_numOfSeats"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Number of seats:{this.props.data.numOfSeats}</span>
            </div>
            <div
              id="product_gearboxType"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Gear box type: {this.props.data.gearboxType}</span>
            </div>

            <div className="text-center d-lg-flex justify-content-lg-center about">
              <div className="row" style={{ border: "none" }}>
                <div className="col">
                  <h5
                    id="product_price"
                    style={{
                      "margin-top": "1vw",
                    }}
                  >
                    Vehicle price per day: {this.props.data.vehiclePricePerDay}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewVehicleForRental;
