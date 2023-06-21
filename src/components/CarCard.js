import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, state } from "react";

const CarCard = (props) => {
  const [data, setData] = useState(props.data);

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
        <div
          className="clean-product-item"
          style={{
            marginLeft: "5px",
          }}
        >
          <Link
            to="/ViewVehicleForRent"
            style={{ textDecoration: "none", color: "black" }}
            state={{
              vehicle: data,
              price: data.vehiclePricePerDay.toString(),
              numberOfSeats: data.numOfSeats.toString(),
            }}
          >
            <div id="image_field" className="image">
              <img
                id="vehicle_image"
                className="img-fluid d-block mx-auto"
                src={require("../assets/vehicle.jpg")}
                // style={{ width: "250px", height: " 300px" }}
              />
            </div>
            <div
              id="vehicle_type"
              className="d-lg-flex justify-content-lg-center product-name"
              style={{ color: "var(--bs-gray-800)" }}
            >
              Vehicle Type:{data.vehicleType}
            </div>

            <div
              id="vehicle_numOfSeats"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Number of seats:{data.numOfSeats.toString()}</span>
            </div>
            <div
              id="product_gearboxType"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Gear box type: {data.gearboxType}</span>
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
                      data.vehiclePricePerDay.toString(),
                      "Ether"
                    )}{" "}
                    Eth
                  </h5>
                </div>
              </div>
            </div>
            {/* {this.props.toEdit === true && (
            <button
              onClick={() => {
                window.location.replace("/EditVehicle");
              }}
              className="button"
            >
              Edit details
            </button>
          )} */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
