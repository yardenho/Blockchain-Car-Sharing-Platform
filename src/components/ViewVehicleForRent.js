import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import BigNumber from "bignumber.js";
import DatePicker from "react-datepicker";
import { APPROVED, DECLINED, WAITING } from "../variables.js";

const ViewVehicleForRent = (props) => {
  const location = useLocation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unavailableDates, setUnavailableDates] = useState(
    location.state.vehicle.unavailableDates
  );
  const [price, setPrice] = useState(0);

  const updateRentPrice = (start, end) => {
    // calc the number of rent days

    var difference_in_time =
      new Date(end).getTime() - new Date(start).getTime();

    // To calculate the no. of days between two dates
    var rentDays = difference_in_time / (1000 * 3600 * 24) + 1;

    var price =
      window.web3.utils.fromWei(location.state.price.toString(), "Ether") *
      rentDays;

    if (price < 0) {
      setPrice(0);
    } else {
      setPrice(price);
    }
  };

  const check_date_overlap = (start, end) => {
    var start2 = new Date(start).getTime();
    var end2 = new Date(end).getTime();

    const dates = unavailableDates;
    let datesList = [];
    if (dates !== "") {
      datesList = dates.split("#");
    }

    for (let i = 0; i < datesList.length; ++i) {
      const range = datesList[i].split("-");
      const start1 = new Date(range[0]).getTime();
      const end1 = new Date(range[1]).getTime();
      // Check for overlapping dates
      if (
        (start1 <= end2 && end2 <= end1) ||
        (start1 <= start2 && start2 <= end1)
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div>
      <div style={{ marginLeft: "500px", marginTop: "50px" }}>
        <h1>View Vehicle For Rent</h1>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("holaaa");
          const vin = location.state.vehicle.vin;
          const owner = location.state.vehicle.owner;
          const rentDates = startDate + "-" + endDate;
          const status = WAITING;

          const rentPrice = window.web3.utils.toWei(price.toString(), "Ether");

          props.createRental(vin, owner, rentDates, rentPrice, status);
        }}
      >
        <div
          id="content"
          style={{
            width: "100%",
            margin: "3px",
            flexDirection: "row",
            display: "flex",
            marginTop: "75px",
          }}
        >
          <div
            className="clean-product-item"
            style={{ fontSize: 25, marginLeft: "200px", marginTop: "50px" }}
          >
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
                Number of seats: {location.state.numberOfSeats.toString()}
              </span>
            </div>
            <div
              id="product_gearboxType"
              className="d-lg-flex justify-content-lg-center product-sku"
            >
              <span>Gear box type: {location.state.vehicle.gearboxType}</span>
            </div>
            <div className="d-lg-flex justify-content-lg-center product-price">
              <span id="product_price">
                Vehicle price per day:{" "}
                {window.web3.utils.fromWei(
                  location.state.price.toString(),
                  "Ether"
                )}{" "}
                Eth
              </span>
            </div>
            <div className="d-lg-flex justify-content-lg-center product-rentDates">
              <label style={{ marginRight: "5px" }}>Choose rent dates: </label>
              <DatePicker
                selected={startDate}
                onChange={(range) => {
                  const [start, end] = range;

                  setStartDate(start);
                  setEndDate(end);

                  if (check_date_overlap(startDate, endDate) === false) {
                    console.log("the date is available");
                    console.log(endDate);
                    updateRentPrice(start, end);
                  } else {
                    console.log("the date is unavailable");
                    setPrice(0);
                  }
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={new Date()}
              />
            </div>
            <div
              id="rent_price"
              className="d-lg-flex justify-content-lg-center product-price"
            >
              <label>Price: {price.toString()}</label>
            </div>
            <button
              type="submit"
              disabled={price <= 0}
              className="button"
              style={{ marginLeft: "200px", fontSize: "30", padding: "5px" }}
            >
              Rent
            </button>
          </div>
          <div
            id="image_field"
            className="image"
            style={{ marginLeft: "50px" }}
          >
            <a>
              <img
                id="vehicle_image"
                className="img-fluid d-block mx-auto"
                src={require("../assets/vehicle.jpg")}
                style={{ width: "500px", height: " 300px" }}
              />
            </a>
          </div>
        </div>
      </form>
      <p>&nbsp;</p>
    </div>
  );
};

export default ViewVehicleForRent;
