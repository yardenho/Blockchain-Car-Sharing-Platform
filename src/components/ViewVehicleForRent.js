import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import BigNumber from "bignumber.js";
import DatePicker from "react-datepicker";

const ViewVehicleForRent = (props) => {
  const location = useLocation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unavailableDates, setUnavailableDates] = useState(
    location.state.vehicle.unavailableDates
  );
  console.log("vehicle for rent - dates");
  console.log(unavailableDates);

  // if (unavailableDates === "" && pricePerDay === "") {
  //   props.vehicles.map((v) => {
  //     console.log("v.vin");
  //     console.log(v.vin);

  //     if (v.vin === "1") {
  //       console.log("in");
  //       const price = window.web3.utils.fromWei(
  //         v.vehiclePricePerDay.toString(),
  //         "Ether"
  //       );
  //       setUnavailableDates(v.unavailableDates);
  //       setPricePerDay(price);
  //       setVehicle(v);
  //       console.log(pricePerDay);
  //       console.log(unavailableDates);
  //     }
  //   });
  // }
  // const splitDates = () => {
  //   if (unavailableDates !== "") {
  //     console.log("un");
  //     console.log(unavailableDates);
  //     let dates = unavailableDates.split("#");
  //     for (let i = 0; i < dates.length - 1; ++i) {
  //       dates[i] = dates[i].split("-");
  //       dates[i][0] = new Date(dates[i][0]);
  //       dates[i][1] = new Date(dates[i][1]);
  //       dates[i][0] =
  //         dates[i][0].getDate() +
  //         "/" +
  //         (dates[i][0].getMonth() + 1) +
  //         "/" +
  //         dates[i][0].getFullYear();
  //       dates[i][1] =
  //         dates[i][1].getDate() +
  //         "/" +
  //         (dates[i][1].getMonth() + 1) +
  //         "/" +
  //         dates[i][1].getFullYear();

  //       dates[i] = dates[i][0] + "-" + dates[i][1];
  //     }
  //     return dates;
  //   } else {
  //     return [];
  //   }
  // };

  // const check_date_overlap = (start, end) => {
  //   // Convert date strings to datetime objects
  //   var start2 = new Date(start).getTime();
  //   var end2 = new Date(end).getTime();
  //   const dates = unavailableDates;
  //   let datesList = [];
  //   if (dates !== "") {
  //     datesList = dates.split("#");
  //   }

  //   for (let i = 0; i < datesList.length; ++i) {
  //     const range = datesList[i].split("-");
  //     const start1 = new Date(range[0]).getTime();
  //     const end1 = new Date(range[1]).getTime();
  //     // Check for overlapping dates
  //     if (
  //       (start1 <= end2 && end2 <= end1) ||
  //       (start1 <= start2 && start2 <= end1)
  //     ) {
  //       console.log("true");
  //       return true;
  //     } else {
  //       console.log("false");

  //       return false;
  //     }
  //   }
  //   return false;
  // };

  return (
    <div>
      <div style={{ marginLeft: "500px", marginTop: "50px" }}>
        <h1>View Vehicle For Rent</h1>
      </div>
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
              Number of seats:{location.state.numberOfSeats.toString()}
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
            <DatePicker
              selected={startDate}
              onChange={(range) => {
                const [start, end] = range;
                console.log(start);
                console.log(end);

                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              minDate={new Date()}
            />
          </div>
        </div>
        <div id="image_field" className="image" style={{ marginLeft: "50px" }}>
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
    </div>
  );
};

export default ViewVehicleForRent;
