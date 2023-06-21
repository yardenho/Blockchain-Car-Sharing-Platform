import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import BigNumber from "bignumber.js";

const ViewVehicleForRent = (props) => {
  const location = useLocation();

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
            style={{ color: "var(--bs-gray-800)" }}
          >
            Vehicle Type:{location.state.vehicle.vehicleType}
          </a>
          {/* <div
            id="vehicle_owner"
            className="d-lg-flex justify-content-lg-center product-sku"
          >
            <span>Owner: {location.state.vehicle.owner}</span>
          </div> */}
          <div
            id="vehicle_numOfSeats"
            className="d-lg-flex justify-content-lg-center product-sku"
          >
            <span>
              Number of seats:{location.state.numberOfSeats.toString()}
            </span>
          </div>
          <div
            id="product_gearboxType"
            className="d-lg-flex justify-content-lg-center product-sku"
          >
            <span>Gear box type: {location.state.vehicle.gearboxType}</span>
          </div>

          <div className="text-center d-lg-flex justify-content-lg-center about">
            <div className="row" style={{ border: "none" }}>
              <div className="col">
                <h5
                  id="product_price"
                  style={{
                    marginTop: "1vw",
                  }}
                >
                  Vehicle price per day:{" "}
                  {window.web3.utils.fromWei(
                    location.state.price.toString(),
                    "Ether"
                  )}{" "}
                  Eth
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicleForRent;
